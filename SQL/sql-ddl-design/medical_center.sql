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
    specialty TEXT,
    medical_center_id REFERENCES medical_centers
);

CREATE TABLE visits 
(
    id SERIAL PRIMARY KEY,
    doctor_id REFERENCES doctors,
    patient_id REFERENCES patients,
    diagnosis REFERENCES diseases
);

CREATE TABLE diagnoses
(
    id SERIAL PRIMARY KEY,
    visit_id REFERENCES visits,
    disease_id REFERENCES diseases
);

CREATE TABLE medical_centers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

