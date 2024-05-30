from flask import Flask

app = Flask(__name__)


@app.route('/welcome')
def welcome():
    return 'Welcome!'


@app.route('/welcome/home')
def welcome_home():
    return 'Welcome Home!'


@app.route('/welcome/back')
def welcom_back():
    return 'Welcome Back!'
