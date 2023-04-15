\c biztime 

DROP TABLE IF EXISTS industries;

CREATE TABLE industries (
    code TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE companies_industries (
    comp_code TEXT REFERENCES companies,
    ind_code TEXT REFERENCES industries,
    PRIMARY KEY (comp_code, ind_code)
);

INSERT INTO industries 
    (code, name) 
VALUES
    ('tech', 'Technology'),
    ('str', 'Streaming');

INSERT INTO companies_industries
    (comp_code, ind_code)
VALUES
    ('apple', 'tech'),
    ('apple', 'str'),
    ('ibm', 'tech');