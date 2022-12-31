from flask import Flask, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbar
from models import db, connect_db
from forms import RegisterForm
import bcyrpt 


app = Flask(__name__)

app.debug = True
app.config['SECRET_KEY'] = '$Boy0703'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

db.connect(app)

toolbar = DebugToolbar()

@app.route('/')
def get_home():
    return redirect('/register')

@app.route('/register', methods=['GET', 'POST'])
def get_login():
    form = RegisterForm()
    if form.validate_on_submit():
        return redirect('/secret')
    else:
        return render_template('register.html', form=form)
        

