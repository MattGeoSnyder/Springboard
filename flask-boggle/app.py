from boggle import Boggle
from flask import Flask, request, render_template, redirect, session
from flask import flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension
import pdb



boggle_game = Boggle()

app = Flask(__name__)
app.config['SECRET_KEY'] = "$Boy07032018"

toolbar = DebugToolbarExtension()
toolbar.__init__(app)

@app.route('/')
def display_board():
    board = boggle_game.make_board()
    session['board'] = board
    return render_template('root.html', board=board)

@app.route("/answer", methods=["POST"])
def check_answer():
    guess = request.json['answer']
    board = session['board']
    result = boggle_game.check_valid_word(board, guess)
    flash(result)
    return jsonify({"result": result})