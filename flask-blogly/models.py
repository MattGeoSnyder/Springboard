"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy

default_image_url = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

db = SQLAlchemy()
def connect_db(app):
    db.app = app
    db.init_app(app)

class Users(db.Model):
    __tablename__ = 'users'

    def __repr__(self):
        return f'<id: {self.id} first_name: {self.first_name} last_name: {self.last_name}>'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String, nullable=False, default=default_image_url)