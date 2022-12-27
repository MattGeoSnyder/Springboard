from flask import Flask, render_template, redirect, flash
from flask_debugtoolbar import DebugToolbarExtension
from models import db, db_connect, Pet
from forms import AddPetForm
import pdb

app = Flask(__name__)
    
app.debug = True
app.config['SECRET_KEY'] = '$Boy0703'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adopt'
app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

toolbar = DebugToolbarExtension(app)

db_connect(app)
with app.app_context():
    db.create_all()


@app.route('/')
def get_home():
    pets = Pet.query.all()
    return render_template('home.html', pets=pets)

@app.route('/add', methods=['GET', 'POST'])
def add_pet():
    form = AddPetForm()
    if form.validate_on_submit():
        new_pet = Pet()
        form.populate_obj(new_pet)
        db.session.add(new_pet)
        db.session.commit()
        return redirect('/')
    else:  
        return render_template('add-pet.html', form=form)
        