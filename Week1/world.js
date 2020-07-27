var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});
connection.connect(function (error) {
  if (error) throw error;
  console.log("connection succeed");
});

const query = [
  "SELECT name FROM country WHERE population >8000000",
  "SELECT name FROM country WHERE population >8000000",
  "SELECT name FROM country WHERE name LIKE'%land%'",
  "SELECT name FROM city WHERE population BETWEEN 500000 and 1000000",
  "SELECT name FROM country WHERE continent ='Europe'",
  "SELECT name FROM country ORDER by surfacearea DESC",
  "SELECT name FROM city WHERE countrycode = 'NLD'",
  "SELECT population FROM city WHERE name ='Rotterdam'",
  "SELECT name FROM country ORDER by surfacearea DESC LIMIT 10",
  "SELECT name FROM city ORDER by population DESC LIMIT 10",
  "SELECT SUM(population) FROM country",
];
for (let i in query) {
  connection.query(quer[i], (err, result) => {
    if (err) throw err;
    console.log(result);
  });
}
connection.end();
