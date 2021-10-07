//consuming module using require()
const db = require('./db');

if (db.db_connection) {
    db.db_connect('employee');
}


