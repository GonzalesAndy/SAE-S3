from . import db
from flask_login import UserMixin
from sqlalchemy.sql import func
from sqlalchemy import CheckConstraint


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(150), unique=True)
    username = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    score = db.Column(db.Integer)
    sudo = db.Column(db.Integer, default=0)

    def __repr__(self):
        return '<User {}>'.format(self.username)
    
class Question(db.Model):
    questionId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question = db.Column(db.String(150), unique = True)
    type = db.Column(db.String(150))
    answer1 = db.Column(db.String(250))
    answer2 = db.Column(db.String(250))
    answer3 = db.Column(db.String(250))
    answer4 = db.Column(db.String(250))

    def __repr__(self):
        return '<Question {}>'.format(self.question)

'''class Score(db.Model):
    scoreId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    userId = db.Column(db.Integer,db.ForeignKey('user.id'), nullable=False)
    lastScore = db.Column(db.Integer)
    highScore = db.Column(db.Integer)

    def __repr__(self):
        return '<Score {}>'.format(self.highScore)'''