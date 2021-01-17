const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world",
  multipleStatements: true,
});
connection.connect(function (error) {
  if (error) throw error;
  console.log("connection SUCCEED");
});
//Give an example of a value that can be passed as name
//and code that would take advantage of SQL-injection and (fetch all the records in the database)
function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as connection
  connection.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = ${code}`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].Name);
    }
  );
}
// an example of how a user code use advantage of the multipleStatements as true and hack to the all information in the database
getPopulation(
  "Country",
  "Syria",
  "'SYR'; SELECT * from Country;",
  (error, result) => {
    if (error) throw error;
    console.log(result);
  }
);
//Rewrite the function so that it is no longer vulnerable to SQL injection
// https://github.com/mysqljs/mysql#preparing-queries
function getPopulation2(Country, name, code, cb) {
  connection.query(
    //Multiple placeholders are mapped to values in the same order as passed
    `SELECT Population FROM ${Country} WHERE Name = ?  and code = ? `,
    [name, code],
    function (error, result) {
      if (error) cb(error);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].Population);
    }
  );
}
getPopulation2("country", "Syria", "SYR", (error, result) => {
  if (error) throw error;
  console.log(result);
});

connection.end();
