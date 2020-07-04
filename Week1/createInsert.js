
const mysql = require('mysql');
var connection = mysql.createConnection({
    host   : 'localhost',
    user: "hyfuser",
    password: "",
    multipleStatements: true,
});
connection.connect(function(error){
if (error) throw error;
    console.log('MySql Connected....')
});
connection.query("DROP DATABASE IF EXISTS meetup; CREATE DATABASE meetup; USE meetup;" ,function(error,result){
if (error) throw error;
    console.log('database created');
});
let createTables =[
"CREATE TABLE Invitee(Invitee_no INT,Invitee_name VARCHAR(255),Invited_by VARCHAR(255))",
"CREATE TABLE Room(room_no INT, room_name text, floor_number INT)",
"CREATE TABLE Meeting(meeting_no INT, meeting_title text, starting_time datetime, end_time datetime, room_no INT)"
];
createTables.forEach(query =>{
connection.query(query,function(error,result,field){
  if (error) throw error;
    console.log('table created')
})
});
let tableQuery=[
"INSERT INTO Invitee VALUES(1,'Natasha','Hawkeye')",
"INSERT INTO Invitee VALUES(2,'John Wick','Clark kent')",
"INSERT INTO Invitee VALUES(3,'Peter Parker','Bruce Willes')",
"INSERT INTO Invitee VALUES(4,'Tony Stark','Steve Rogers')",
"INSERT INTO Room VALUES(1,'Avengers meeting',4)",
"INSERT INTO Room VALUES(2,'Avengers Friends',3)",
"INSERT INTO Room VALUES(3,'Avengers planing room',5)",
"INSERT INTO Room VALUES(4,'Avenges control room',6)",
"INSERT INTO Meeting VALUES(1,'Avenger reunion','2019-12-11','2019-12-11',11)",
"INSERT INTO Meeting VALUES(2,'Avenger help center','2019-12-12','2019-12-12',12)",
"INSERT INTO Meeting VALUES(3,'Avengers','2019-12-13','2019-12-13',13)",
"INSERT INTO Meeting VALUES(4,'Avengers world protector','2019-12-14','2019-12-14',14)"
];
tableQuery.forEach(query=>{
    connection.query(query,function(error,result){
      if (error) throw error;
      console.log(result);
    })
});
connection.end();