from flask import Blueprint, redirect, render_template, request, url_for
from .models import Question
from flask_login import current_user
from sqlalchemy import desc
from . import db
from flask_table import Table, Col


tableDelete = Blueprint("delete", __name__)



@tableDelete.route('/delete')
def delete_item():
    data = Question.query.all()
    
    return render_template("delQuestion.html",user=current_user, data=data)

@tableDelete.route('/delete_row', methods=['POST'])
def delete():
    row_id = request.form['row_id']
    deleteData = Question.query.get(row_id)
    print(deleteData)
    db.session.delete(deleteData)
    db.session.commit()
    return redirect(url_for('delete.delete_item'))

