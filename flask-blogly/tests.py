from unittest import TestCase
from app import app
import pdb

from models import db, Users, Post, Tag

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://blogly_test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

with app.app_context():
    db.drop_all()
    db.create_all()

class BloglyViewsTestCase(TestCase):

    def setUp(self):
        with app.app_context():
            user = Users(first_name='Rachel', last_name='Wakeman', image_url='')
            db.session.add(user)
            db.session.commit()

            self.user_id = user.id
            
            post = Post(title='Test Post', content='This is a test post.', user_id=self.user_id)
            db.session.add(post)
            db.session.commit()
            
            self.post_id = post.id

    def tearDown(self):
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
            res = client.post('/users/new', 
                            data={'first-name':"Matthew",
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
            res = client.post(f"/users/{self.user_id}/edit", 
                            data={'first-name': 'Samantha',
                                'last-name': 'Wakeman',
                                'image-url': ""}, 
                            follow_redirects=True)
            html = res.get_data(as_text=True)
            user = Users.query.filter_by(first_name='Samantha').first()
            self.assertIsNotNone(user)
            self.assertIn('Samantha Wakeman', html)

    def test_delete_user(self):
        with app.test_client() as client:
            res = client.post('/users/new', 
                                data={'first-name': "Matthew",
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
                post = user.posts[-1]
                                
                res = client.post(f'/posts/{post.id}/edit',
                                data={'title':'First Post',
                                    'content':'This is my first post.'},
                                follow_redirects=True)
                html = res.get_data(as_text=True)
                edit_post = user.posts[-1]
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
                
    def test_create_tag(self):
        with app.test_client() as client:
            with app.app_context():
                name = "Newbie"
                user = Users.query.get(self.user_id)
                post_ids = [post.id for post in user.posts]
                res = client.post('/tags/new', 
                                data={'tag-name':name,
                                        'posts': post_ids}, 
                                follow_redirects=True)
                post = Post.query.get(self.post_id)
                tag_id = post.tags[0].id
                tag_name = post.tags[0].name
                res = client.get(f'/tags/{tag_id}')
                html = res.get_data(as_text=True)
                self.assertIn(tag_name, html)
                self.assertIn(post.title, html)
                
    def test_edit_tag(self):
        with app.test_client() as client:
            with app.app_context():
                post = Post.query.get(self.post_id)
                name = 'Test'
                tag = Tag(name=name)
                
                db.session.add(tag)
                db.session.commit()
                
                post.tags.append(tag)
                db.session.commit()
                
                post_ids = [post.id]
                tag_id = tag.id
                
                res = client.post(f'/tags/{tag.id}/edit',
                        data={'tag-name': 'First Post',
                            'posts': post_ids},
                        follow_redirects=True)
                
                edit_tag = post.tags[-1]
                edit_tag_id = post.tags[-1].id
                
                self.assertEqual(tag_id, edit_tag_id)
                self.assertNotEqual(name, edit_tag.name)
                
    def test_delete_tag(self):
        with app.test_client() as client:
            with app.app_context():
                post = Post.query.get(self.post_id)
                name = 'Test'
                tag = Tag(name=name)
                
                db.session.add(tag)
                post.tags.append(tag)
                db.session.commit()
                
                tag_id = post.tags[-1].id
                res = client.post(f'/tags/{tag_id}/delete',
                                follow_redirects=True)
                self.assertEqual(post.tags, [])
                
                
                
                
                
                
        
            
            
            
            
