from flask import Flask, request, render_template
from stories import Story, story

app = Flask(__name__)


@app.route('/')
def home():
    return render_template('home.html', prompts=story.prompts)


@app.route('/story')
def go_to_story():
    return render_template('story.html', s=story, answers=request.args)
