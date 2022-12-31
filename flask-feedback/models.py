from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init(app)

class User(db.Model):
    __tablename__ = "users"

    @classmethod
    def register(cls, username, pwd, email, first_name, last_name):
        hased = bcypt.generate_password(pwd)
        hashed_utf8 = hashed.decode("utf8")

        return cls(username=username, password=password, email=email, first_name=first_name, last_name=last_name)

    @classmethod
    def authenticate(cls, username, pwd):
        u = User.query.filter_by(username=username).first()
        if u and bcrypt.check_password_has(u.password, pwd):
            return u
        else:
            return False

    username = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String, nullable=False)
    email = db.Column(db.String(50), nullable=False)
    first_name = db.Column(String(30), nullable=False)
    last_name = db.Column(String(30), nullable=False)

