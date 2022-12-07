from unittest import TestCase
from app import app, boggle_game, handle_high_score, handle_games_played
from flask import session, request, jsonify
from boggle import Boggle
import pdb
import json


class FlaskTests(TestCase):


    def setUp(self):
        # self.app_context = app.app_context()
        # self.app_context.push()

        app.config['TESTING'] = True

        self.client = app.test_client()
        self.board = [
            ['C', 'A', 'T', 'T', 'T'],
            ['C', 'A', 'T', 'T', 'T'],
            ['C', 'A', 'T', 'T', 'T'],
            ['C', 'A', 'T', 'T', 'T'],
            ['C', 'A', 'T', 'T', 'T']
        ]


    def test_get_root(self):
        with self.client as client:
            res = client.get('/')
            # pdb.set_trace()
            self.assertEqual(res.status_code, 200)
            self.assertIn('board', session)

    def test_check_answer_post(self):
        with self.client as client:
            res = client.get('/')
            with self.client.session_transaction() as sess:
                sess['board'] = self.board
            res = client.post('/answer', json={'answer': 'cat'})
            self.assertEqual(res.status_code, 200)
            self.assertEqual(request.json['answer'], 'cat')
            self.assertTrue(boggle_game.check_valid_word(session['board'], "cat"))

    def test_stats(self):
        with self.client as client:
            with client.session_transaction() as sess:
                self.assertIsNone(sess.get('games_played'))
                self.assertIsNone(sess.get('high_score'))
            res = client.post('/stats', json={'score': 12})

            self.assertEqual(session['games_played'], 1)
            self.assertEqual(session['high_score'], 12)
            self.assertEqual(res.json['games_played'],1)
            self.assertEqual(res.json['high_score'], 12)
    