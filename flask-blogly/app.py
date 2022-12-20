"""Blogly application."""

from flask import Flask, request, render_template, redirect, flash
from models import db, connect_db, Users
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.debug = True

app.config['SECRET_KEY'] = '$Boy07032018'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

toolbar = DebugToolbarExtension(app)

connect_db(app)

with app.app_context():
    db.create_all()

@app.route('/')
def get_root():
    users = Users.query.all()
    return render_template('root.html', users=users)

@app.route('/new-user')
def get_add_user_page():
    return render_template('new-user.html')

@app.route('/new-user', methods=['POST'])
def add_new_user():
    first_name = request.form['first-name']
    last_name = request.form['last-name']
    image_url = request.form['image-url']
    image_url = image_url if image_url else default_image_url

    new_user = Users(first_name=first_name, 
                    last_name=last_name, 
                    image_url=image_url)

    flash("User added!")

    return redirect('new-user')




