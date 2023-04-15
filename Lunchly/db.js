/** Database for lunchly */

const pg = require("pg");

process.env.PGUSER = 'mattgeosnyder';
process.env.PGPASSWORD = '$Boy07032018';

const db = new pg.Client("postgresql:///lunchly", {
    user: 'mattgeosnyder',
    password: '$Boy07032018'
});

db.connect();

module.exports = db;
