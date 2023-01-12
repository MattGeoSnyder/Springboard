
# run these tests like:
#
#    FLASK_ENV=production python -m unittest test_message_views.py

import pdb
import os
from unittest import TestCase

from models import db, connect_db, Message, User

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app

from app import app, CURR_USER_KEY

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()

# Don't have WTForms use CSRF at all, since it's a pain to test

app.config['WTF_CSRF_ENABLED'] = False


class UserViewsTestCase(TestCase):
    
    def setUp(self):
        
        User.query.delete()
        Message.query.delete()
        
        self.client = app.test_client()
        
        self.testuser = User.signup(username="testuser",
                                    email="test@test.com",
                                    password="testuser",
                                    image_url=None)
        
        self.testmessage = Message(text="""Lorem ipsum dolor sit amet consectetur adipisicing 
                                elit. Quibusdam, sed odio. Laudantium, commodi? Dictare!""")
        
        db.session.add(self.testuser)
        self.testuser.messages.append(self.testmessage)
        
        
    def test_users_search(self):
        with self.client as c:
            res = c.get(f'/users?q={self.testuser.username}')
            html = res.get_data(as_text=True)
            self.assertIn(self.testuser.username, html)
        
    def test_show_user(self):
        with self.client as c:
            db.session.commit()
            user_id = self.testuser.id
            username = self.testuser.username
            res = c.get(f'/users/{user_id}')
            # pdb.set_trace()
            html = res.get_data(as_text=True)
            self.assertIn(username, html)
            self.assertIn(self.testmessage.text, html)
    
    def test_following_routes(self):
        with self.client as c: 
            follower = User.signup('test_follower', 'test_follower@test.com', 'follower', '')
            leader = User.signup('test_leader', 'test_leader@test.com', 'leader','')
            db.session.add_all([leader, follower])
            db.session.commit()
            
            leader_id = leader.id
            
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = follower.id
            
            res = c.post(f'/users/follow/{leader_id}', follow_redirects=True)
            html = res.get_data(as_text=True)
            
            
            self.assertIn(leader.username, html)
            self.assertEqual(len(followers), 1)
            self.assertEqual(len(following), 1)
            
            # try again without session key
            with c.session_transaction() as sess:
                del sess[CURR_USER_KEY]
                
            res = c.post(f'/users/follow/{leader_id}', follow_redirects=True)
            html = res.get_data(as_text=True)
            self.assertIn("Access unauthorized", html)
            
            # while we're here let's test stop_following
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = follower.id
                
            res = c.post(f'/users/stop-following/{leader_id}')
            self.assertEqual(len(leader.followers), 0)
            self.assertEqual(len(follower.following), 0)
            
    def test_edit_profile(self):
        with self.client as c:
            db.session.commit()
            
            # First, let's test without creditials
            res = c.get('/users/profile', follow_redirects=True)
            html = res.get_data(as_text=True)
            self.assertIn("Access unauthorized", html)
                  
            # Now we'll test get method
            with c.session_transaction() as sess:  
                sess[CURR_USER_KEY] = self.testuser.id
                
            res = res.get('/users/profile')
            html = res.get_data(as_text=True)
            self.assertIn('<form method="POST" id="user_form">', html) 
            
            

            
            
             
                                