from unittest import TestCase
from app import app, handle_high_score, handle_games_played
from flask import session, request
from boggle import Boggle
import pdb
import json


class FlaskTests(TestCase):
    def test_get_root(self):
        with app.test_client() as client:
            res = client.get('/')
            self.assertEqual(res.status_code, 200)

    def test_answer(self):
        with app.test_client() as client:
            res = client.post('/answer', data={'answer': 'mouse'})

            self.assertEqual(res.status_code, 200)

    def test_high_score(self):
        with app.test_client() as client:
            res = client.post('/stats', data={'score': 12})
            high_score = handle_high_score()
            games_played = handle_games_played()

            self.assertEqual(
                request.json, {'games_played': games_played, 'high_score': high_score})
