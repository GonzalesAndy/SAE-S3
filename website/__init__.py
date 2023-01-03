from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager
from sqlalchemy import MetaData, create_engine

db = SQLAlchemy()
DB_NAME = "database.db"
engine = create_engine("mysql+mysqlconnector://gramarun:andyLOL123.@mysql-gramarun.alwaysdata.net:3306/gramarun_db?charset=utf8mb4&collation=utf8mb4_general_ci", pool_recycle=3600)


def create_app():
    app = Flask(__name__, template_folder='templates', static_folder='staticFiles')
    app.config['SECRET_KEY'] = "helloworld"
    app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://gramarun:andyLOL123.@mysql-gramarun.alwaysdata.net:3306/gramarun_db?charset=utf8mb4&collation=utf8mb4_general_ci"
    db.init_app(app)
    from .views import views
    from .auth import auth
    from .leaderboard import tableLeaderboard
    app.register_blueprint(views, url_prefix="/")
    app.register_blueprint(auth, url_prefix="/")
    app.register_blueprint(tableLeaderboard, url_prefix="/")
    from .models import User

    with app.app_context():
        db.create_all()
        db.session.commit()
    login_manager = LoginManager()
    login_manager.login_view = "auth.login"
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    return app

