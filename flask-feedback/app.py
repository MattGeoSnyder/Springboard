from flask import Flask, render_template, redirect, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Feedback
from forms import RegisterForm, LoginForm
import bcrypt 
import pdb

app = Flask(__name__)

app.debug = True
app.config['SECRET_KEY'] = '$Boy0703'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///feedback'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)

toolbar = DebugToolbarExtension(app)

with app.app_context():
    db.create_all()

@app.route('/')
def get_home():
    return redirect('/register')

@app.route('/register', methods=['GET', 'POST'])
def get_register():
    form = RegisterForm()
    if form.validate_on_submit():
        user = User.register(username=form.username.data, 
                            pwd=form.password.data,
                            email=form.email.data,
                            first_name=form.first_name.data,
                            last_name=form.last_name.data)
        db.session.add(user)
        db.session.commit()
        session['user_id'] = user.username
        return redirect(f'/user/{user.username}')
    else:
        for error in form.errors:
            flash(error)
        # pdb.set_trace()
        return render_template('register.html', form=form)
        
@app.route('/login', methods=['GET', 'POST'])
def get_login():
    form = LoginForm()
    if form.validate_on_submit():
        name = form.username.data
        pwd = form.password.data
        user = User.authenticate(name, pwd)

        if user:
            session['user_id'] = user.username
            return redirect(f'/user/{user.username}')
        else:
            form.username.errors = ['Bad name/password']
    else:
        return render_template('login.html', form=form)

@app.route('/user/<user_id>')
def get_secret(user_id):
    user = User.query.get_or_404(user_id)
    if user.username == session['user_id']:     
        return render_template('user-info.html', user=user)
    else:
        return redirect('/')

@app.route('/logout')
def logout():
    session.pop("user_id")
    return redirect("/")

@app.route('/users/<user_id>/delete', methods=['POST'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    if session['user_id'] == user.username:
        db.session.delete(user)
        db.session.commit()
    else:
        flash('You do not have access to this page.')
    return redirect('/')

@app.route('/users/<username>/feedback/add', methods=['GET','POST'])
def add_feedback(user_id):
    form = FeedbackForm()
    user = User.query.get_or_404(user_id)
    if form.validate_on_submit() and session['user_id'] == user_id:
        return render_template('add-feedback.html', user=user, session=session, form=form)
    else:
        flash('You do not have access to this page.')
    return render_template('/')
    
@app.route('/feeback/<int:feedback_id>/update', methods=['GET','POST'])
    feedback = Feeback.query.get(feedback_id)
    form = FeedbackForm(obj=feedback)
    if form.validate_on_submit() and session['user_id'] == user_id:
        return render_template('update-feedback.html', form=form)
    else:
        flash('You do not have acces to this page.')
    return render_template('/')





