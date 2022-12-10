from unittest import TestCase
from flask import request
from app import app
import pdb
import json

class FlaskTests(TestCase):

    def setUp(self):

        app.config['TESTING'] = True
        self.client = app.test_client()

    def test_get_root(self):
        with self.client as client:
            res = client.get('/')
            self.assertEqual(res.status_code, 200)

    def test_conversion_okay(self):
        with self.client as client:
            res = client.get('/convert?from-currency=USD&to-currency=GBP&amount=100')
            self.assertEqual(res.status_code, 200)
            
    def test_conversion_invalid_currency(self):
        with self.client as client:
            res = client.get('/convert?from-currency=&to-currency=GBP&amount=100')
            # pdb.set_trace()
            self.assertEqual(res.status_code, 302)
            self.assertEqual(res.location, '/')
            self.assertEqual(request.args['from-currency'],"")
            # self.assertEqual(conversion, 'Invalid currency')
            
    def test_conversion_no_amount_entered(self):
        with self.client as client:
            res = client.get('/convert?from-currency=USD&to-currency=USD&amount=')
            self.assertEqual(res.status_code, 302)
            # pdb.set_trace()
            self.assertEqual(res.location, '/')
            # self.assertEqual(conversion, 'Invalid amount')
