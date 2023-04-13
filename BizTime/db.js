/** Database setup for BizTime. */
const { Client } = require('pg');

let DB_URI;

process.env.PGUSER = 'postgres';
process.env.PGPASSWORD = '$Boy07032018';

if (process.env.NODE_ENV === 'test') {
    DB_URI = 'postgresql:///biztime_test';
} else {
    DB_URI = 'postgresql:///biztime';
}

const db = new Client({
    connectionString: DB_URI
});

db.connect((err) =>{
    if (err) {
        console.log('Connection Error:', err.stack);
    }
    else {
        console.log('connected');
    }
});

module.exports = db;