// const { Client } = require('pg');
// const { DB_URI } = require('.config');

import pg from 'pg';
import { DATABASE_URL, DB_URI } from './config.js';

const { Client } = pg;

const client = new Client({
    connectionString: DATABASE_URL
});

client.connect();

export default client;