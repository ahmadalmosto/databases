const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'world'
});

db.connect((err) =>{
    if(err){
        throw err;
    }
    console.log('MySql Connected....');
});

let sqlQuery = "SELECT name FROM country WHERE population > 8000000"
connection.query(sqlQuery, (err, results) => {
    if (err) throw err;
    console.log(`What are the names of countries with population greater than 8 million? ${results}}`);
});

const sqlQuery = "SELECT name FROM country WHERE name LIKE '%land%'";
connection.query(sqlQuery, (err, results) => {
    if (err) throw err;
    console.log(`What are the names of countries that have “land” in their names? ${results}`);
});

const sqlQuery = "SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000";
connection.query(sqlQuery, (err, results) => {
    if (err) throw err;
    console.log(`What are the names of the cities with population in between 500,000 and 1 million? ${results}`);
});

const sqlQuery = "SELECT name FROM country WHERE continent = 'Europe'";
connection.query(sqlQuery, (err, results) => {
    if (err) throw err;
    console.log(`What's the name of all the countries on the continent ‘Europe’? ${results}`);
});

const sqlQuery = "SELECT name, surfacearea FROM country ORDER BY surfacearea DESC";
connection.query(sqlQuery, (err, results) => {
    if (err) throw err;
    console.log(`List all the countries in the descending order of their surface areas : ${results}`);
});

const sqlQuery = "SELECT name FROM city WHERE countrycode = 'NLD'";
connection.query(sqlQuery, (err, results) => {
    if (err) throw err;
    console.log(`What are the names of all the cities in the Netherlands? ${results}`);
});

const sqlQuery = "SELECT population FROM city WHERE name = 'Rotterdam'";
connection.query(sqlQuery, (err, results) => {
    if (err) throw err;
    console.log(`What is the population of Rotterdam? ${results}`);
});

const sqlQuery = "SELECT name FROM country ORDER BY surfacearea DESC LIMIT 10";
connection.query(sqlQuery, (err, results) => {
    if (err) throw err;
    console.log(`What's the top 10 countries by Surface Area? ${results}`);
});

const sqlQuery = "SELECT name FROM city ORDER BY population DESC LIMIT 10";
connection.query(sqlQuery, (err, results) => {
    if (err) throw err;
    console.log(`What's the top 10 most populated cities? ${results}`);
});


const sqlQuery = "SELECT SUM(population) as the_world_total_population FROM country";
connection.query(sqlQuery, (err, results) => {
    if (err) throw err;
    console.log(`What is the population number of the world? ${results}`);
});

connection.end();