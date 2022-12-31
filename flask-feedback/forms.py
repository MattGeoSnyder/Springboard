from flask_wtf import FlaskForm, StringField, EmailField, PasswordField

class RegisterForm(FlaskForm):
    username = StringField("Username")
    password = PasswordField("Password")
    email = EmailField("Email")
    first_name = StringField("First Name")
    last_name = StringField("Last Name")


