import mysql2 from "mysql2"

export const db = mysql2.createConnection({
    host : "34.123.18.115",
    user : "root",
    password : "206.809.Pass*.#",
    database : "tagmein",
    port: 3306
})