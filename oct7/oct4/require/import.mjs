//1. import from db.js
import { db_connect, db_connection } from './db.js';

if (db_connection) {
    console.log(db_connect('student database'));
}

//2.Import *
import * as db from './db.js';
if(db.db_connection){
    console.log(db_connect('student database'));
}

//3.Import as
import { db_connect as connect,db_connection as connection } from './db.js';
if(connection){
    console.log(connect('student database'));
}
