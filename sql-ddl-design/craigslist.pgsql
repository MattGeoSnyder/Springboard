DROP DATABASE IF EXISTS craigslist;

CREATE DATABASE craigslist;

\c craigslist

CREATE TABLE regions 
(
    id SERIAL PRIMARY KEY,
    region_name TEXT NOT NULL
);

CREATE TABLE users 
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(15) NOT NULL,
    password VARCHAR(20) NOT NULL,
    preferred_region INTEGER REFERENCES regions
);

CREATE TABLE categories
(
    id SERIAL PRIMARY KEY,
    category_name TEXT NOT NULL
);

CREATE TABLE posts 
(
    id SERIAL PRIMARY KEY,
    poster_id INTEGER REFERENCES users,
    title TEXT NOT NULL,
    content TEXT,
    location TEXT, 
    region_id INTEGER REFERENCES regions,
    category_id INTEGER REFERENCES categories
);