DROP DATABASE IF EXISTS soccer_league;

CREATE DATABASE soccer_league;

\c soccer_league;

CREATE TABLE teams 
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(15) NOT NULL
);

CREATE TABLE players
(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    team_id INTEGER REFERENCES teams
);

CREATE TABLE referees 
(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE seasons 
(
    id SERIAL PRIMARY KEY,
    start_date DATE,
    end_dates DATE
);

CREATE TABLE matches 
(
    id SERIAL PRIMARY KEY,
    home_team_id INTEGER REFERENCES teams,
    away_team_id INTEGER REFERENCES teams,
    referee_id INTEGER REFERENCES referees,
    season INTEGER REFERENCES seasons
);

CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    match_id INTEGER REFERENCES matches,
    team_id INTEGER REFERENCES teams,
    player_id INTEGER REFERENCES players
);

CREATE TABLE results 
(
    id SERIAL PRIMARY KEY,
    team_id INTEGER REFERENCES teams,
    match_id INTEGER REFERENCES matches,
    result TEXT NOT NULL
);






