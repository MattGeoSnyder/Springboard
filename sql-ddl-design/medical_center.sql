DROP DATABASE IF EXISTS medical_centers_db;

CREATE DATABASE medical_centers_db;

\c medical_centers_db

CREATE TABLE diseases (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE patients_diseases (
    patient_id INTEGER REFERENCES patients,
    disease_id INTEGER REFERENCES diseases
);

CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    specialty TEXT
);

CREATE TABLE doctors_patients (
    doctor_id INTEGER REFERENCES doctors,
    patient_id INTEGER REFERENCES patients
);

CREATE TABLE medical_centers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    doctor_id INTEGER REFERENCES doctors
);

INSERT INTO diseases (name) 
VALUES
    ('pneumonia'),
    ('heart disease'),
    ('cancer'),
    ('diabetes'),
    ('strept throat'),
    ('mono'),
    ('psychosis');

INSERT INTO patients (name)
VALUES 
    ('Matt'),
    ('Rachel');

INSERT INTO doctors (name, specialty)
VALUES
    ('Dr. Gottron', 'GP'),
    ('Dr. Bauer', 'Psychiatrist');

INSERT INTO doctors_patients (doctor_id, patient_id)
VALUES
    (1,1),
    (1,2),
    (2,1);

INSERT INTO medical_centers (name, doctor_id) 
VALUES
    ('Irwin Family Care', 1),
    ('Western Psych', 2);