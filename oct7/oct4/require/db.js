console.log("module db.js");
const db_connection = true;
function db_connect(dbname) {

    console.log("Connecting to DB " + dbname);
    console.log("*** db connected ***");
}
module.exports = {
    db_connect,
    db_connection
}
/*
1.Export before declarations

// to export function
module.exports.db_connect = db_connect;

//to export a variable
module.exports.db_connection = db_connection;

2.Export apart from declarations
module.exports = {
    db_connect:db_connect,
    db_connection:db_connection
    }
*/
