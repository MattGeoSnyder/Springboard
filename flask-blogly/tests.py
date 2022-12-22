from unittest import TestCase
from app import app
import pdb

from models import db, Users

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://blogly'
app.config['SQLALCHEMY_ECHO'] = False

with app.app_context():
    db.drop_all()
    db.create_all()

# To complete Unit tests makes sure toolbar in app.py is
# commented out.

class BloglyViewsTestCase(TestCase):

    def setUp(self):

        user = Users(first_name='Rachel', last_name='Wakeman', image_url='')

        with app.app_context():
            db.session.add(user)
            db.session.commit()

        # This throws an error and I don't know why
        # self.user_id = user.id

    def tearDown(self):
       
        with app.app_context():
            user = Users.query.get(1)

            # pdb.set_trace()
            db.session.delete(user)
            db.session.commit()

    def test_root_redirect(self):
        with app.test_client() as client:
            res = client.get('/')
            self.assertEqual(res.location, '/users')

    def test_get_users(self):
        with app.test_client() as client:
            res = client.get('/users')
            html = res.get_data(as_text=True)
            self.assertIn('Rachel Wakeman', html)
