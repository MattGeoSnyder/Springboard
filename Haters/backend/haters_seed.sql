DROP DATABASE IF EXISTS haters;

CREATE DATABASE haters;

\c haters

CREATE TYPE sex AS ENUM ('male', 'female');

CREATE TABLE prompts(
    id serial PRIMARY KEY,
    prompt varchar NOT NULL
);

CREATE TABLE hates(
    id serial PRIMARY KEY,
    category varchar,
    hate varchar
);

CREATE TABLE users(
    id serial PRIMARY KEY,
    username varchar(40) UNIQUE NOT NULL,
    pw varchar NOT NULL,
    first_name varchar(15) NOT NULL,
    birthday DATE NOT NULL,
    user_sex sex NOT NULL,
    sex_preference sex NOT NULL,
    bio varchar(200) NOT NULL DEFAULT '',
    is_admin boolean NOT NULL DEFAULT 'false',
    prompt1 int REFERENCES prompts,
    prompt2 int REFERENCES prompts,
    prompt3 int REFERENCES prompts,
    prompt1_res varchar(140) DEFAULT '',
    prompt2_res varchar(140) DEFAULT '',
    prompt3_res varchar(140) DEFAULT '',
    hate1 int REFERENCES hates,
    hate2 int REFERENCES hates,
    hate3 int REFERENCES hates,
    hate4 int REFERENCES hates,
    hate5 int REFERENCES hates
);

CREATE TABLE photos(
    public_id varchar PRIMARY KEY,
    user_id int REFERENCES users ON DELETE CASCADE,
    image_url varchar
);

CREATE TABLE matches(
    id serial PRIMARY KEY,
    user1_id int REFERENCES users ON DELETE CASCADE,
    user2_id int REFERENCES users ON DELETE CASCADE,
    last_interaction timestamp with time zone DEFAULT NULL
);

CREATE TABLE messages(
    id serial PRIMARY KEY,
    match_id int REFERENCES matches,
    from_user int REFERENCES users ON DELETE CASCADE,
    to_user int REFERENCES users ON DELETE CASCADE,
    content varchar NOT NULL,
    sent_at timestamp with time zone NOT NULL DEFAULT NOW(),
    seen_at timestamp with time zone DEFAULT NULL
);

CREATE TABLE likes(
    liker_id int REFERENCES users ON DELETE CASCADE,
    likee_id int REFERENCES users ON DELETE CASCADE
);

CREATE TABLE dislikes(
    disliker_id INT REFERENCES users ON DELETE CASCADE,
    dislikee_id INT REFERENCES users ON DELETE CASCADE
);

INSERT INTO prompts
    (prompt)
VALUES
    ('My biggest pet peeve is...'),
    ('It''s a dealbreaker if...'),
    ('One thing I can''t stand doing is...'),
    ('We won''t get along if...'),
    ('My personal hell is...'),
    ('My least favorite quality in a person is...'),
    ('You won''t ever catch me...'),
    ('I would rather ___ than ___');

INSERT INTO hates 
    (category, hate)
VALUES
    ('events', 'weddings 👰'),
    ('events', 'parties 🎊'),
    ('events', 'family gatherings 👪'),
    ('events', 'birthdays 🎂'),
    ('events', 'concerts 🎵'),
    ('events', 'sports events 🏈'),
    ('weather', 'heat ☀️'),
    ('weather', 'cold 🧊'),
    ('weather', 'snow ❄️'),
    ('weather', 'storms 🌩️'),
    ('food', 'fruits 🍑'),
    ('food', 'veggies 🍃'),
    ('food', 'meat 🥓'),
    ('food', 'fish 🐟'),
    ('food', 'sweets 🍫'),
    ('food', 'beer 🍺'),
    ('food', 'cocktails 🍸'),
    ('food', 'carbs 🍞'),
    ('food', 'coffee ☕'),
    ('music', 'country 🎵'),
    ('music', 'rap 🎵'),
    ('music', 'metal 🎵'),
    ('music', 'punk 🎵'),
    ('music', 'pop 🎵'),
    ('music', 'reggae 🎵'),
    ('music', 'rock 🎵'),
    ('music', 'ska 🎵'),
    ('activities', 'baseball ⚾'),
    ('activities', 'basketball 🏀'),
    ('activities', 'biking 🚴'),
    ('activities', 'football 🏈'),
    ('activities', 'soccer ⚽'),
    ('activities', 'rock climbing 🧗'),
    ('activities', 'running 🏃'),
    ('activities', 'skiing ⛷️'),
    ('activities', 'snowboarding 🏂'),
    ('activities', 'surfing 🏄'),
    ('activities', 'tennis 🎾'),
    ('animals', 'cats 🐱'),
    ('animals', 'dogs 🐶'),
    ('animals', 'snakes 🐍'),
    ('animals', 'birds 🐦'),
    ('animals', 'bugs 🐛'),
    ('animals', 'rodents 🐭');


    