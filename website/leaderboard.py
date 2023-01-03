from flask import Blueprint, render_template
from .models import User
from flask_login import current_user
from sqlalchemy import desc
from flask_table import Table, Col


tableLeaderboard = Blueprint("leaderboard", __name__)


class ItemTable(Table):
    rank = Col('Rank')
    allow_sort=True
    username = Col('Username', column_html_attrs = {'class': 'usernameCol'})
    score = Col('High Score', column_html_attrs = {'class': 'scoreCol'})
    

    def sort_url(self, col_id, reverse=False):
        if reverse:
            order = 'desc'
        else:
            order = 'asc'
        return '?sort={}&order={}'.format(col_id, order)

    

@tableLeaderboard.route("/leaderboard")
def leaderboard():
    items = User.query.order_by(desc(User.score)).all()
    table = ItemTable(items)
    rank = 1
    for score in table.items:
        score.rank = rank
        rank += 1
    
    

    return render_template("leaderboard.html",user=current_user, table=table)
