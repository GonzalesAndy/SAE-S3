from flask import Blueprint, render_template
from .models import User
from flask_login import current_user
from sqlalchemy import desc
from flask_table import Table, Col


tableLeaderboard = Blueprint("leaderboard", __name__)

#Tableau du leaderboard
class ItemTable(Table):
    rank = Col('Rang')
    allow_sort=True
    username = Col('Pseudo', column_html_attrs = {'class': 'usernameCol'})
    score = Col('Meilleur Score', column_html_attrs = {'class': 'scoreCol'})
    
    #Permet de trier les colonnes en fonction d'un critère
    def sort_url(self, col_id, reverse=False):
        if reverse:
            order = 'desc'
        else:
            order = 'asc'
        return '?sort={}&order={}'.format(col_id, order)

    

#Permet d'envoyer les données de la table au template
@tableLeaderboard.route("/leaderboard")
def tableauDesScores():
    objets = User.query.filter(User.score>0).order_by(desc(User.score)).all()
    table = ItemTable(objets)
    rang = 1
    for score in table.items:
        score.rank = rang
        rang += 1
    
    

    return render_template("leaderboard.html",user=current_user, table=table)
