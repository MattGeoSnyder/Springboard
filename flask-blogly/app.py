"""Blogly application."""

from flask import Flask, request, render_template, redirect, flash
from models import db, connect_db, Users, default_image_url
from flask_debugtoolbar import DebugToolbarExtension
import pdb

app = Flask(__name__)
# app.debug = True

app.config['SECRET_KEY'] = '$Boy07032018'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

# toolbar = DebugToolbarExtension(app)

connect_db(app)

with app.app_context():
    db.create_all()

@app.route('/')
def go_to_users():
    return redirect('/users')

@app.route('/users')
def get_users():
    users = Users.query.all()
    return render_template('root.html', users=users)

@app.route('/users/new')
def get_add_user_page():
    return render_template('new-user.html')

@app.route('/users/new', methods=['POST'])
def add_new_user():
    first_name = request.form['first-name']
    last_name = request.form['last-name']
    image_url = request.form['image-url']
    image_url = image_url if image_url else default_image_url

    new_user = Users(first_name=first_name, last_name = last_name, image_url=image_url)
    db.session.add(new_user)
    db.session.commit()
    flash("User added!")

    return redirect('/users')

@app.route('/users/<int:user_id>')
def display_user(user_id):
    user = Users.query.get_or_404(user_id)
    return render_template('user.html', user=user)

@app.route('/users/<int:user_id>/edit')
def edit_user(user_id):
    user = Users.query.get_or_404(user_id)
    return render_template('edit.html',user=user)

@app.route('/users/<int:user_id>/edit', methods=['POST'])
def post_edit(user_id):
    first_name = request.form['first-name']
    last_name = request.form['last-name']
    image_url = request.form['image-url']
    image_url = image_url if image_url else default_image_url

    user = Users.query.get_or_404(user_id)
    user.first_name = first_name
    user.last_name = last_name
    user.image_url = image_url
    db.session.commit()
    return redirect('/users')

@app.route('/users/<int:user_id>/delete', methods=['POST'])
def delete_user(user_id):
    user = Users.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return redirect('/users')


