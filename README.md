# Visit Haters at: https://haters.onrender.com

## Database: [schema](https://drawsql.app/teams/haters/diagrams/haters)

## Haters API

**Technologies used:** _Node.js, Express.js, PostgreSQL, JWT, bcrypt, Cloudinary API (to authenticate frontend requests to Cloudinary), OpenAI API (chat bot messaaging)._

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

### User Routes: /users

#### GET /:userId

    returns user = {
        id,
        username,
        first_name,
        birthday,
        user_sex,
        sex_preference,
        hates = []
        photos = { photo1: { public_id, user_id, image_url}, ...}
    }

    returns user with id of userId

#### GET /:userId/users

    returns userIds = [ user1.id, ...]

    Returns array of userIds that are not included in likes, dislikes, matches, or not of either parties sex_preference.
    These are the potential matches of user with id userId

#### POST /:userId/photos

    requires req.body = { publicId, imageUrl }

    returns photo = { public_id, user_id, image_url }

    Updates photo with public_id of publicId. If the photo does not exist it will be added.

#### DELETE /:userId/photo

    requires req.body = { public_id }

    Returns { message }

    Deletes photo with public_id public_id

#### GET /:userId/matches

    returns matches = { matchId: user = {
        id,
        username,
        first_name,
        birthday,
        hates,
        photos,
        messages = { notifications,
                    messages: [{ id,
                                from_user,
                                to_user,
                                sent_at,
                                seen_at,
                                content}, ...]
                    }
        }
    }

    returns matches for user with id of userId

#### POST /:userId/bio

    returns { bio }

    posts bio for user with id of userId

#### POST /:userId/hates

    returns hates = [hate = { id, category, hate}, ...]

    posts hates for user with id userId

#### POST /:userId/prompts

    returns prompts = { prompt1: { name, id, promptRes }, ...}

    Posts prompts for user with id userId. Returns users prompts.

#### GET /:userId/notifications

    returns notification = { matchId: { notifications }}

    returns notifications for user with id of userId. Notifications are the count of messages with seen_at = null
    for message with to_user of userId

## Haters Frontend

**Technology used:** _React.js, Redux.js, CSS._

### Routes

    Landing Page: /

    Signup: /signup

    Login: /login

    Disclaimer: /disclaimer

    User Home: /users/:userId

    Update Profile: /users/:userId/profile

    Matches: /users/:userId/matches

    Messages:

    /users/:userId/matches/:matchId
    or
    /users/:userId/profile/matches/:matchId

    This is so that messages persist at whichever page user is on.

### Custom Hooks

    useWindowDimensions: returns { width, height } of current window. Updates to resizing.

    useLocalStorage: returns [ get, set, remove ]. Manages local storage for user.

        - get(): returns token 'user' from local storage

        - set(userObj): sets local storage token 'user' to
            userObj

        - remove(): sets local storage token 'user' to {}

### State Management

#### Slices:

> - user: State for logged in user

> - currentUser: State for user that's currently on screen

> - feed: State for userIds loaded in queue.

> - matches: State for user's matches

> - messages: State for user's messages

> - hatesSidebar: State for sidebar. Also the state for hates are stored here. The sidebar became more than just for hates eventually. This should probably be separated more clearly

> - profileForm: State for form where user updates user profile.

> - overlay: State for overlay
