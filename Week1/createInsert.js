const mySql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup",
});
connection.connect(function (error) {
  if (error) throw error;
  console.log("connection succeed");
});
connection.query("CREATE DATABASES meetup", function (error, result) {
  if (error) {
    console.log(error);
  }
  console.log("database created");
});
var createTables = [
  "CREATE TABLE Invitee(invitee_no init,invitee_name text,invited_by text)",
  "CREATE TABLE Room(room_no init , room_name text , floor_number init)",
  "CREATE TABLE Meeting(meeting_no init , meeting_title text , starting_time datetime, end_time datetime, room_no init)",
];
createTables.forEach((query) => {
  connection.query(query, function (err, result, field) {
    if (err) throw err;
    console.log("table created");
  });
});
var tableQuery = [
  "INSERT INTO Invitee VALUES(1,'Natasha','Hawkeye')",
  "INSERT INTO Invitee VALUES(2,'John Wick','Clark kent')",
  "INSERT INTO Invitee VALUES(3,'Peter Parker','Bruce Willes')",
  "INSERT INTO Invitee VALUES(4,'Tony Stark','Steve Rogers')",
  "INERT INTO Room VALUES(1,'Avengers meeting',4)",
  "INERT INTO Room VALUES(2,'Avengers Friends',3)",
  "INERT INTO Room VALUES(3,'Avengers planing room',5)",
  "INERT INTO Room VALUES(4,'Avenges control room',6)",
  "INSER INTO Meeting VALUES(1,'Avenger reunion','2019-12-11','2019-12-11',11)",
  "INSER INTO Meeting VALUES(2,'Avenger help center','2019-12-12','2019-12-12',12)",
  "INSER INTO Meeting VALUES(3,'Avengers','2019-12-13','2019-12-13',13)",
  "INSER INTO Meeting VALUES(4,'Avengers world protector','2019-12-14','2019-12-14',14)",
];
tableQuery.forEach((query) => {
  connection.query(query, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});
connection.end();
