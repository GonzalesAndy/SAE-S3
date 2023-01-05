from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from sqlalchemy import create_engine


#initialise la connexion à la base de données
db = SQLAlchemy()
DB_NAME = "database.db"
moteur = create_engine("mysql+mysqlconnector://gramarun:andyLOL123.@mysql-gramarun.alwaysdata.net:3306/gramarun_db?charset=utf8mb4&collation=utf8mb4_general_ci", pool_recycle=3600)


def create_app():
    #initialise l'utilisation de flask
    app = Flask(__name__, template_folder='templates', static_folder='staticFiles')
    app.config['SECRET_KEY'] = "helloworld"
    app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://gramarun:andyLOL123.@mysql-gramarun.alwaysdata.net:3306/gramarun_db?charset=utf8mb4&collation=utf8mb4_general_ci"
    db.init_app(app)

    #importe les fichiers de routes
    from .question import question
    from .views import views
    from .auth import auth
    from .leaderboard import tableLeaderboard

    #enregistre les routes
    app.register_blueprint(views, url_prefix="/")
    app.register_blueprint(auth, url_prefix="/")
    app.register_blueprint(tableLeaderboard, url_prefix="/")
    app.register_blueprint(question, url_prefix="/")
    from .models import User

    #crée la base de données, enregistre les modifications dans la base de données
    with app.app_context():
        db.create_all()
        db.session.commit()

    #initialise le système de connexion
    gestionConnexion = LoginManager()
    gestionConnexion.login_view = "auth.login"
    gestionConnexion.init_app(app)

    @gestionConnexion.user_loader
    def load_user(id):
        return User.query.get(int(id))

    return app

