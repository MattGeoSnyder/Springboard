// const { Client } = require('pg');
// const { DB_URI } = require('.config');

import pg from 'pg';
import { DB_URI } from './config.js';

const { Client } = pg;

const client = new Client({
    connectionString: DB_URI
});

client.connect();

export default client;