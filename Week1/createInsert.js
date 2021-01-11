const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
    multipleStatements: true,
});

db.connect((err) =>{
    if(err){
        throw err;
    }
    console.log('MySql Connected....');
});

//create the database
db.query('DROP DATABASE IF EXISTS meetup; CREATE DATABASE meetup; USE meetup;', (err) => {
    if(err) throw err;
    console.log('meetup database created.');
})

// create tables
function createTables(){
    db.query('CREATE TABLE Invitee(invitee_no INT, invitee_name VARCHAR(255), invited_by VARCHAR(255))', (err) => {
        if(err) throw err;
        console.log('tables created.');
    })
    db.query('CREATE TABLE Room(room_no INT, room_name VARCHAR(255), floor_number INT)', (err) => {
        if(err) throw err;
        console.log('tables created.');
    })
    db.query('CREATE TABLE Meeting(meeting_no INT, meeting_title VARCHAR(255), starting_time TIME, ending_time TIME, room_no INT)', (err) => {
        if(err) throw err;
        console.log('tables created.');
    })
}

const Invitee = [
    [1, "Ahmad al mosto", "osama ahmed"],
    [2, "Ahmad al mosto", "osama ahmed"],
    [3, "Ahmad al mosto", "osama ahmed"],
    [4, "Ahmad al mosto", "osama ahmed"],
    [5, "Ahmad al mosto", "osama ahmed"],
]
const Room = [
    [1, "room abcde", 1],
    [2, "room abcde", 3],
    [3, "room abcde", 6],
    [4, "room abcde", 8],
    [5, "room abcde", 4],
]

const Meeting = [
    [12, "abcdef", "10:00", "01:00", 1],
    [42, "abcdef", "05:40", "00:00", 2],
    [2354, "abcdef", "10:00", "00:00", 3],
    [445, "abcdef", "16:00", "10:00", 4],
    [545, "abcdef", "19:00", "15:00", 5],
]

//insert the data into the tables
function insertData(Invitee, Room, Meeting){
    Invitee.forEach(row => {
        db.query(`INSERT INTO Invitee(invitee_no, invitee_name, invited_by) VALUES (?)`, [row], function(err) {
            if (err) console.log(err);
            else console.log("values inserted.");
        });
    });
    Room.forEach(row => {
        db.query(`INSERT INTO Room(room_no, room_name, floor_number) VALUES (?)`, [row], function(err) {
            if (err) console.log(err);
            else console.log("values inserted.");
        });
    });
    Meeting.forEach(row => {
        db.query(`INSERT INTO Meeting(meeting_no, meeting_title, starting_time, ending_time, room_no) VALUES (?)`, [row], function(err) {
            if (err) console.log(err);
            else console.log("values inserted.");
        });
    });
}

createTables();
insertData(Invitee, Room, Meeting);

db.end();