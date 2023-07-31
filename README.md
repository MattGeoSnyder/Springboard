
# Haters live at: https://haters.onrender.com

## Database Schema: [schema](https://drawsql.app/teams/haters/diagrams/haters)

## Haters API

**Technologies used:** *Node.js, Express.js, PostgreSQL, token based authentication (JWT), bcrypt, Cloudinary API (to authenticate frontend requests), OpenAI API (chat bot messaaging).* 

### API Base URL: https://hatersapi.onrender.com

### Authentication Routes: /auth

#### POST /register

    userInfo = { username, pw, first_name, birthday, user_sex, sex_preference } -->
    
    returns user = { userId, is_admin, token }

    Saves user info to db, creates a token for API, matches with chat bot, sends introduction from chatBot to user.

    Will throw 401 error if username is taken. 

#### POST /login

    userInfo = { username, pw } -->

    returns user = { id, token }

    Verifies username an pw using bcrypt. 

    Throws 401 error if username not found or if password does not match.

### Dislike Routes: /dislikes

#### POST /:dislikerId/:dislikeeId

    returns { disliker_id, dislikee_id }

    Adds dislike to dislike table

### Hates Routes: /hates

#### GET / 

    returns hates = { hateId: { id, category, hate }}

    Gets all hates.

#### GET /:id

    returns hate = { id, category, hate}

    Gets hate by id

### Images Routes: /images

#### GET /:username/:name

    returns photo = { public_id, user_id, image_url }

    public_id is uniquely identified by username/name where name is either photo1, photo2, or photo3.

#### POST /auth

    returns { signature }

    Authentication Route for making Cloudinary API requests on the front end. Returns a signature from cloudinary API. This is used by subsequent Cloudinary API requests on the front end. 

### Likes Routes: /likes

#### GET /:likerId/:likeeId

    returns like = { liker_id, likee_id }

    Gets like from user ids

#### POST /:likerId/:likeeId

    returns like = { liker_id, likee_id }
    or
    match = { user1_id, user2_id }

    Checks first to see if { likee_id, liker_id } is in likes. If the like is reciprocated returns match. Matches are stored user1_id < user2_id for uniqueness.

### Messages Routes: /messages

#### PATCH /match/:matchId

    requires: { userId }

    returns messages = { matchId: { id, from_user, to_user, sent_at, seen_at, content}, ... }

    Updates seen_at to current time for messages with to_user userId and in match matchId. Returns messages with updated time

#### PATCH /:messageId

    returns message = { id, from_user, to_user, sent_at, seen_at, content }

    Updates seen_at for message with id messageId to now.

### Prompts Routes: /prompts

#### GET /

    returns prompts = [ { id, prompt }, ... ]

    Gets all prompts.

#### GET /:promptId

    returns prompt = { id, prompt }

    Gets prompt with id promptId

### User Routes /users




