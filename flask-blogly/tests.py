from unittest import TestCase
from app import app
import pdb

from models import db, Users, Post

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://blogly_test'
app.config['SQLALCHEMY_ECHO'] = False
app.debug = False

# Why do I need this app.app_context()?
with app.app_context():
    db.drop_all()
    db.create_all()

# To complete Unit tests makes sure toolbar in app.py is
# commented out.

class BloglyViewsTestCase(TestCase):

    def setUp(self):
        with app.app_context():
            user = Users(first_name='Rachel', last_name='Wakeman', image_url='')
            db.session.add(user)
            db.session.commit()

            self.user_id = user.id
        
        # This throws an error and I don't know why
        # self.user_id = user.id
        # Answer: Works within app.app_context()

    def tearDown(self):
       
        # user = Users.query.get(1)
        # db.session.delete(user)
        # throws error. Why?
        # also can't do Users.query.get(1).delete()
        # says Users objects has no delete attribute?

        with app.app_context():
            user = Users.query.filter_by(last_name='Wakeman').first()
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

    def test_add_new_user(self):
        with app.test_client() as client:
            res = client.post('/users/new', data={'first-name':"Matthew",
                                            'last-name': "Snyder",
                                            'image-url': ""}, 
                                            follow_redirects=True)
            html = res.get_data(as_text=True)
            user = Users.query.filter_by(last_name='Snyder').first()

            self.assertIn('Matthew Snyder', html)

            db.session.delete(user)
            db.session.commit()

    def test_edit_user(self):
        with app.test_client() as client:
            res = client.post(f"/users/{self.user_id}/edit", data={
                                                            'first-name': 'Samantha',
                                                            'last-name': 'Wakeman',
                                                            'image-url': ""}, 
                                                            follow_redirects=True)
            html = res.get_data(as_text=True)
            user = Users.query.filter_by(first_name='Samantha').first()
            # pdb.set_trace()
            self.assertIsNotNone(user)
            self.assertIn('Samantha Wakeman', html)

    def test_delete_user(self):
        with app.test_client() as client:
            res = client.post('/users/new', data={'first-name': "Matthew",
                                            'last-name': 'Snyder',
                                            'image-url': ""},
                                            follow_redirects=True)
            user = Users.query.filter_by(last_name="Snyder").first()
            self.assertEqual(user.last_name, "Snyder")
            res = client.post(f'/users/{user.id}/delete', follow_redirects=True)
            user = Users.query.filter_by(last_name="Snyder").first()
            self.assertIsNone(user)
            
    def test_submit_post(self):
        with app.test_client() as client:
            with app.app_context():
                user = Users.query.filter_by(first_name='Rachel').first()
                
                title = 'Test Post'
                content = "This is a test post."
                
                res = client.post(f'/users/{self.user_id}/posts/new', 
                                data={'title':title,
                                    'content': content},
                                follow_redirects=True)
                html = res.get_data(as_text=True)
                self.assertIn(title, html)
                self.assertIn(user.first_name, html)
                
    def test_edit_post(self):
        with app.test_client() as client:
            with app.app_context():
                user = Users.query.filter_by(first_name='Rachel').first()
                
                title = 'Test Post'
                content = 'This is a test post.'
                
                res = client.post(f'/users/{self.user_id}/posts/new', 
                                data={'title':title,
                                    'content': content},
                                follow_redirects=True)
                
                html = res.get_data(as_text=True)
                self.assertIn(title, html)
                
                user = Users.query.get(self.user_id)
                post = user.posts[0]
                                
                res = client.post(f'/posts/{post.id}/edit',
                                data={'title':'First Post',
                                    'content':'This is my first post.'},
                                follow_redirects=True)
                html = res.get_data(as_text=True)
                edit_post = user.posts[0]
                self.assertEqual(post.id, edit_post.id)
                self.assertIn(edit_post.title, html)
                
    def test_delete_post(self):
        with app.test_client() as client:
            with app.app_context():
                title = 'Test Post'
                content = 'This is a test post.'
                
                res = client.post(f'/users/{self.user_id}/posts/new', 
                                data={'title':title,
                                    'content': content},
                                follow_redirects=True)

                user = Users.query.get(self.user_id)
                html = res.get_data(as_text=True)
                post = user.posts[0]
                post_id = post.id
                
                self.assertIn(title, html)
                self.assertIsNotNone(post)
                
                res = client.post(f'/posts/{post_id}/delete')
                post = Post.query.get(post_id)
                self.assertIsNone(post)
