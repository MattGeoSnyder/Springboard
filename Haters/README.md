# Visit Haters at: https://haters.onrender.com

Haters is a dating app where you meet potential matches from common dislikes, gripes, and pet-peeves.

## Features

- Real time messaging and notifications delivered via websockets
- Chat bot companion powered by Chat GPT 3.5
- Dynamic frontend UI allowing users to swipe for likes/dislikes
- Client side routing for faster user experiences

## User Flow

- First time users will be directed to the homepage where they will be encouraged to signup.
- At signup they will input the required information to create an account.
- After signup users are given a short disclaimer about using the site.
- Users are then directed to their profile where they can add additional information to their profile
- After completing their profile (optional), they can go to their user home to start swiping
  or chat with the chat bot that has sent them a greeting.

## ![image](./mdIcons/database.png) Database: [schema](https://drawsql.app/teams/haters/diagrams/haters)

## Haters API

![image](./mdIcons/rocket.png) **Technologies used:** _Node.js, Express.js, PostgreSQL, JWT, bcrypt, Cloudinary API (to authenticate frontend requests to Cloudinary), OpenAI API (chat bot messaaging)._

### API Base URL: https://hatersapi.onrender.com

### Routes

| Request Type  | Route                    | Description                                     | Authorization         | returns                                                                                                                                              |
| ------------- | ------------------------ | ----------------------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **/auth**     |
| POST          | /register                | Adds new user to database                       | None                  | { userId, token }                                                                                                                                    |
| POST          | /login                   | Verifies username & password                    | None                  | { userId, token }                                                                                                                                    |
| **/dislikes** |
| POST          | /:dislikerId/:dislikeeId | Adds dislke to table                            | userId = dislikerId   |                                                                                                                                                      |
| **/hates**    |
| GET           | /                        | Gets hates from database                        | None                  | hates = [{ hate }, ...] where hate is entire row from hates table                                                                                    |
| GET           | /:id                     | Gets hate by id                                 | None                  | hate                                                                                                                                                 |
| /images       |
| GET           | /:username/:name         | Get image by id                                 | Logged in user        | row from photos table                                                                                                                                |
| POST          | /auth                    | Gets signautre to verify cloudinary API request | Logged in user        | { signature }                                                                                                                                        |
| **/likes**    |
| GET           | /:likerId/:likeeId       | Gets like from likes table                      | userId = likerId      | { liker_id, likee_id }                                                                                                                               |
| POST          | /:likerId/:likeeId       | Adds like to likes table                        | userId = likerId      | either </br> { liker_id, likee_id } </br> or </br> { match_id }                                                                                      |
| **/messages** |
| PATCH         | /match/:matchId          | Updates messages to read before returning them. | User belongs to match | messages = [{ message }, ...]                                                                                                                        |
| PATCH         | /:messageId              | Update message to read                          | Message sent to user  |                                                                                                                                                      |
| **/prompts**  |
| GET           | /                        | Get all prompts from database                   | None                  | prompts = [{ prompt }, ...]                                                                                                                          |
| GET           | /:promptId               | Gets prompt with id promptId                    | None                  | row from prompts table                                                                                                                               |
| **/users**    |
| GET           | /:userId                 | Gets user from database                         | Logged in user        | user = { </br> id, </br> username, </br>first_name, </br>user_sex, </br>sex_preference, </br>hates = [ hate.id, ...], </br>photos = { photo1, ...} } |
| GET           | /:userId/users           | Gets list of potential matches for user         | user.id = userId      | userIds = [ user1.id, ... ]                                                                                                                          |
| POST          | /:userId/photos          | adds photo to photos table                      | user.id = userId      | row from photos table                                                                                                                                |
| DELETE        | /:userId/photo           | deletes photo from photos table                 | user.id = userId      | message confirming deletion                                                                                                                          |
| GET           | /:userId/matches         | Gets users matches                              | user.id = userId      | matches = { matchId: { user }, ... }                                                                                                                 |
| POST          | /:userId/bio             | Posts user's bio                                | user.id = userId      | { bio }                                                                                                                                              |
| POST          | /:userId/hates           | adds hate.id to user table                      | user.id = userId      | hates = [ { hate }, ... ]                                                                                                                            |
| POST          | /:userId/prompt          | adds prompt.id and promt_res to users table     | user.id = userId      | prompts = { { prompt1 }, ... }                                                                                                                       |
| GET           | /:userId/notifications   | gets user notifications from table              | user.id = userId      | notifications = number                                                                                                                               |

## Haters Frontend

![image](./mdIcons/rocket.png) **Technologies used:** _React.js, Redux.js, CSS, React Router_

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

#### Redux Thunks:

```
reigster(userData):
    userData = {
        username,
        pw,
        first_name,
        birthday,
        user_sex,
        sex_preference
    }

returns
    user = {
        id,
        token
        username,
        first_name,
        birthday,
        user_sex,
        sex_preference,
        hates,
        prompts,
        photos
    }

Writes to users table
Modifies user state
```

```
login(userData):
    userData = {
        username,
        pw
    }

returns
    user = {
        id,
        token
        username,
        first_name,
        birthday,
        user_sex,
        sex_preference,
        hates,
        prompts,
        photos
    }

Modifies user state
```

```
getCurrentUserById(userId):

returns
    user = {
        id,
        username,
        first_name,
        birthday,
        hates,
        photos,
        prompts
    }

Modifies currentUserState
```

```
loadUserAssets(userId):

returns
{
    matches = {
        matchId: {
            user
        }
    },
    notifications = {
        matchId: notifications (int)
    }
}

Modifies matches and messages state.
```

```
updateUserProfile({ formData, userId }):

formData = {
    hates: [int],
    prompts: {
        name,
        promptId,
        promptRes,
    },
    bio
}

returns
    { hates, bio, prompts }

Updates users table.

Modifies profileForm state on pending and error. Modifies user state on success.
```

```
uploadPhoto({ image, options, name, userId })

image: ArrayBuffer
options: {
    folder: username
    public_id: photo1, photo2, or photo3,
    overwrite: true
}
name: photo1, photo2, or photo3

returns
    CloudinaryAPI response on success
    We only need the public_id from this response

    Message on API error.

Writes to photos table.
Modifies user state.
```

```
deletePhoto( name, public_id ):

returns
    message on success and failure

Deletes from photos table.
Modifies user state.
```

```
getConversation({ userId, matchId }):

returns
    { matchId: { messages: [] }, ... }

Writes to messages table
Modifies messages state
```

```
addNewMessage({ userId, message }):

message: {
    from_user,
    to_user,
    content
}

Writes to messages table.
Modifies messages state.
```

## ![image](./mdIcons/hourglass.png) Project Status

The project is considered complete, but may still receive some small contributions (in no particular order):

- Styling changes
- Tests for API routes
- Additional edits to profile information: name, sex, sex preference
- Minimum profile requirements to appear in other users queries
- Scroll to query matches
- Ability for users to block other users
