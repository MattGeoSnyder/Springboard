from flask import Flask, render_template, redirect, flash, request
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey

app = Flask(__name__)

app.config['SECRET_KEY'] = "$Boy07032018"
debug = DebugToolbarExtension(app)

responses = []


@app.route('/')
def home():
    return render_template('survey.html', survey=satisfaction_survey)


@app.route('/questions/<int:q_num>')
def go_to_question(q_num):
    if q_num > len(responses):
        flash("You must answer the questions in order")
        return redirect(f'/questions/{len(responses)}')

    if len(responses) < len(satisfaction_survey.questions):
        return render_template('question.html', survey=satisfaction_survey, question=q_num)
    else:
        return render_template('thanks.html')


@ app.route('/answer', methods=['POST'])
def add_answer():
    responses.append(request.form[f'{len(responses)}_ans'])
    return redirect(f'/questions/{len(responses)}')
