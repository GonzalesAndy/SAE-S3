from flask import Blueprint, flash, redirect, render_template, request, url_for
from .models import Question
from flask_login import current_user, login_required
from . import db


question = Blueprint("delete", __name__)

#Ajouter une question
@question.route("/add", methods=['GET', 'POST'])
@login_required
def ajouter():
    if request.method == 'POST':
        #Récupère les données du formulaire
        question = request.form.get("questionForm")
        type = request.form.get("type")
        answer1 = request.form.get("answer1")
        answer2 = request.form.get("answer2")
        answer3 = request.form.get("answer3")
        answer4 = request.form.get("answer4")
        print("idk", question)
        #Vérifie si la question existe déjà
        question_exists = Question.query.filter_by(question=question).first()
        if question_exists:
            flash('Question already exists', category='error')
        #Vérifie si la question est trop courte
        elif len(question) < 5:
            flash('The question is too short, did you type it right ?', category='error')
        #Ajoute la question à la base de données
        else:
            new_question = Question(question=question, type=type, answer1=answer1, answer2=answer2, answer3=answer3, answer4=answer4)
            db.session.add(new_question)
            db.session.commit()
            flash('Question added to the database!', category='success')
    return render_template("add.html", name=current_user.username, user=current_user)

#Récupère les questions de la base de données
@question.route('/delete')
def supprimerObjet():
    donnees = Question.query.all()
    
    return render_template("delQuestion.html",user=current_user, donnees=donnees)

#Supprime une question de la base de données
@question.route('/delete_row', methods=['POST'])
def supprimer():
    #Récupère l'id de la ligne à supprimer
    idLigne = request.form['idLigne']
    suppressionDonnees = Question.query.get(idLigne)
    print(suppressionDonnees)
    #Supprime la ligne
    db.session.delete(suppressionDonnees)
    db.session.commit()
    return redirect(url_for('delete.supprimerObjet'))

