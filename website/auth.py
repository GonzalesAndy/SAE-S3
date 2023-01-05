from flask import Blueprint, render_template, redirect, url_for, request, flash
from . import db
from .models import User
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash

auth = Blueprint("auth", __name__)


#Permet de se connecter
@auth.route("/login", methods=['GET', 'POST'])
def login():
    #Récupère les données du formulaire
    if request.method == 'POST':
        email = request.form.get("email")
        motDePasse = request.form.get("password")

        #Vérifie si l'utilisateur existe
        utilisateur = User.query.filter_by(email=email).first()
        if utilisateur:
            #Vérifie si le mot de passe est correct en le déchiffrant
            if check_password_hash(utilisateur.password, motDePasse):
                flash("Connecté!", category='success')
                login_user(utilisateur, remember=True)
                return redirect(url_for('views.home'))
            else:
                flash('Le mot de passe ne correspond pas. Si perdu contactez l\'administrateur', category='error')
        else:
            flash('Aucun compte possède cette adresse e-mail.', category='error')
    return render_template("login.html", user=current_user)

#Permet la création d'un compte
@auth.route("/sign-up", methods=['GET', 'POST'])
def sign_up():
    #Récupère les données du formulaire
    if request.method == 'POST':
        email = request.form.get("email")
        username = request.form.get("username")
        motDePasse1 = request.form.get("password1")
        emailExiste = User.query.filter_by(email=email).first()
        pseudoExiste = User.query.filter_by(username=username).first()

        #Condition de création d'un compte
        if emailExiste:
            flash('Un compte existe déjà avec cet email', category='error')
        elif pseudoExiste:
            flash('Un utilisateur utilise déjà ce pseudo.', category='error')
        elif len(username) < 2:
            flash('Pseudo trop court.', category='error')
        elif len(username) > 15:
            flash('Pseudo trop long.', category='error')
        elif len(motDePasse1) < 6:
            flash('Mot de passe pas assez sécurisé.', category='error')
        elif len(email) < 4:
            flash("Email trop courte.", category='error')
        #Création du compte
        else:
            nouvelUtilisateur = User(email=email, username=username, password=generate_password_hash(
                motDePasse1, method='sha256'))
            db.session.add(nouvelUtilisateur)
            db.session.commit()
            login_user(nouvelUtilisateur, remember=True)
            flash('Utilisateur Créé!', category='success')
            return redirect(url_for('views.home'))

    return render_template("signup.html", user=current_user)

#Permet de se déconnecter
@auth.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("views.home"))
