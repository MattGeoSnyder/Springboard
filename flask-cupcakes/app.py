"""Flask app for Cupcakes"""
from flask import Flask, jsonify, request
from models import db, connect_db, Cupcake
from flask_debugtoolbar import DebugToolbar
import requests

app = Flask(__name__)

app.debug = True
app.config['SECRET_KEY'] = '$Boy0703'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)

@app.route('/api/cupcakes')
def get_all_cupcakes():
    cupcakes = Cupcake.query.all()
    serialized_cupcakes = [cupcake.serialize() for cupcake in cupcakes]
    return jsonify(cupcakes=serialized_cupcakes)

@app.route('/api/cupcakes/<int:cupcake_id>')
def get_cupcake(cupcake_id):
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    serialized_cupcake = cupcake.serialize()
    return jsonify(cupcake=serialized_cupcake)

@app.route('/api/cupcakes', methods=["POST"])
def create_cupcake():
    cupcake = Cupcake()
    cupcake.flavor = request.json.get('flavor')
    cupcake.size = request.json.get('size')
    cupcake.rating = request.json.get('rating')
    cupcake.image = request.json.get('image')
    db.session.add(cupcake)
    db.session.commit()
    return jsonify(cupcake=cupcake.serialize())