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
    """Generates gameboard and stores in session before sending
    it to root.html to be generated.
    """
    board = boggle_game.make_board()
    session['board'] = board
    return render_template('root.html', board=board)


@app.route("/answer", methods=["POST"])
def check_answer():
    """Receives post request when user enters guess. Loads board from
    session and check that guess is valid.

    Returns:
        json_object: dictionary containing validity of result
    """
    guess = request.json['answer']
    board = session['board']
    result = boggle_game.check_valid_word(board, guess)
    return jsonify({"result": result})


@app.route('/stats', methods=['POST'])
def update_stats():
    """Receives post request with most recent score. Returns number
    of games played in session and session high score.

    Returns:
        json_obj: Dictionary containing games_played and high_score
    """
    games_played = handle_games_played()
    high_score = handle_high_score()
    stats = {'games_played': games_played, 'high_score': high_score}
    return jsonify(stats)


def handle_games_played():
    """Gets games_played from session. Increments by 1

    Returns:
        int: number of games played this session.
    """
    games_played = session.get('games_played', 0)
    games_played += 1
    session['games_played'] = games_played
    return games_played


def handle_high_score():
    """Gets high score from session and recieves most recent score as post request.
    Determines new high score and returns it.
    Returns:

        int: high score for current session.
    """
    high_score = session.get('high_score', 0)
    score = request.json['score']
    if score > high_score:
        high_score = score
        session['high_score'] = high_score
    return high_score
