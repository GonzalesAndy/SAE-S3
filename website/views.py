from flask import Blueprint, render_template, request, flash
from . import db
from .models import Question, User
from flask_login import login_required, current_user

views = Blueprint("views", __name__)


@views.route("/")
def home():
    return render_template("home.html",user=current_user)

@views.route("/game")
def game():
    return render_template("game.html", user=current_user)

@views.route("/add", methods=['GET', 'POST'])
@login_required
def add():
    if request.method == 'POST':
        question = request.form.get("questionForm")
        type = request.form.get("type")
        answer1 = request.form.get("answer1")
        answer2 = request.form.get("answer2")
        answer3 = request.form.get("answer3")
        answer4 = request.form.get("answer4")
        print("idk", question)
        question_exists = Question.query.filter_by(question=question).first()
        if question_exists:
            flash('Question already exists', category='error')
        elif len(question) < 5:
            flash('The question is too short, did you type it right ?', category='error')
        else:
            new_question = Question(question=question, type=type, answer1=answer1, answer2=answer2, answer3=answer3, answer4=answer4)
            db.session.add(new_question)
            db.session.commit()
            flash('Question added to the database!', category='success')
    return render_template("add.html", name=current_user.username, user=current_user)
