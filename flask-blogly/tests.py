from unittest import TestCase
from app import app
import pdb

from models import db, Users

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://blogly'
app.config['SQLALCHEMY_ECHO'] = False


# Why do I need this app.app_context()?
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
       
        # user = Users.query.get(1)
        # db.session.delete(user)
        # throws error. Why?
        # also can't do Users.query.get(1).delete()
        # says Users objects has no delete attribute?

        with app.app_context():
            Users.query.filter_by(last_name='Wakeman').delete()
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

    def test_add_new_user(self):
        with app.test_client() as client:
            res = client.post('/users/new', data={'first-name':"Matthew",
                                                  'last-name': "Snyder",
                                                  'image-url': ""}, follow_redirects=True)
            # pdb.set_trace()
            html = res.get_data(as_text=True)
            user = Users.query.filter_by(last_name='Snyder').first()

            self.assertIn('Matthew Snyder', html)
            self.assertEqual(user.id, 2)

            db.session.delete(user)
            db.session.commit()

    def test_edit_user(self):
        with app.test_client() as client:
            res = client.post('/users/1/edit', data={'first-name': 'Samantha',
                                                 'last-name': 'Wakeman',
                                                 'image-url': ""}, follow_redirects=True)
            html = res.get_data(as_text=True)
            user = Users.query.filter_by(last_name='Wakeman').first()

            self.assertEqual(user.first_name, 'Samantha')
            self.assertIn('Samantha Wakeman', html)

