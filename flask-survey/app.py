from flask import Flask, render_template, redirect, flash, request
from flask import session
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey

app = Flask(__name__)

app.config['SECRET_KEY'] = "$Boy07032018"
debug = DebugToolbarExtension(app)


@app.route('/')
def home():
    return render_template('survey.html', survey=satisfaction_survey)


@app.route('/start-session', methods=['POST'])
def initiate_sesion():
    session['responses'] = []
    return redirect('/questions/0')

@app.route('/questions/<int:q_num>')
def go_to_question(q_num):
    responses = session['responses']
    if q_num > len(responses):
        flash("You must answer the questions in order")
        return redirect(f'/questions/{len(responses)}')

    if len(responses) < len(satisfaction_survey.questions):
        return render_template('question.html', survey=satisfaction_survey, question=q_num)
    else:
        return render_template('thanks.html')


@ app.route('/answer', methods=['POST'])
def add_answer():
    responses = session['responses']
    print(responses)
    responses.append(request.form[f'{len(responses)}_ans'])
    session['responses'] = responses
    return redirect(f'/questions/{len(responses)}')
