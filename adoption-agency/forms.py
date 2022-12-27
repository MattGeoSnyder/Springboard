from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class AddPetForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(message='Name is required.')])
    species = StringField('Species', validators=[DataRequired(message='Species is required')])
    photo_url = StringField('Photo URL')
    age = IntegerField('Age')
    notes = StringField('Notes')
