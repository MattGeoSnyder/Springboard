from boggle import Boggle
from flask import Flask, request, render_template, session, jsonify
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
    return jsonify({"result": result})


@app.route('/stats', methods=['POST'])
def update_stats():
    games_played = session.get('games_played', 0)
    games_played += 1
    session['games_played'] = games_played
    high_score = session.get('high_score', 0)
    score = request.json['score']
    if score > high_score:
        high_score = score
        session['high_score'] = high_score
    stats = {'games_played': games_played, 'high_score': high_score}
    return jsonify(stats)
