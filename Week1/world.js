var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'world'
});
connection.connect(function(error){
    if(error) throw error;
    console.log('connection succeed');
});
const population = 'SELECT name FROM country WHERE population >8000000';
connection.query(population,(err,result)=>{
if(err) throw err;
console.log(result);
});
const landNames = "SELECT name FROM country WHERE name LIKE'%land%'";
connection.query(landNames,(err,result)=>{
if(err) throw err;
console.log(result);
});
const cityName = "SELECT name FROM city WHERE population BETWEEN 500000 and 1000000";
connection.query(cityName,(err,result)=>{
if(err) throw err;
console.log(result);
});
const europeCountries = "SELECT name FROM country WHERE continent ='Europe'";
connection.query(europeCountries,(err,result)=>{
if(err) throw err;
console.log(result)
});
const orderSurfacearea ="SELECT name FROM country ORDER by surfacearea DESC";
connection.query(orderSurfacearea,(err,result)=>{
if(err) throw err;
console.log(result)
});
const citiesNl = "SELECT name FROM city WHERE countrycode = 'NLD'";
connection.query(citiesNl,(err,result)=>{
if(err) throw err;
console.log(result)
});
const populationRotterdam = "SELECT population FROM city WHERE name ='Rotterdam'";
connection.query(populationRotterdam,(err,result)=>{
    if(err) throw err;
    console.log(result)
});
const surfaceArea_10 = "SELECT name FROM country ORDER by surfacearea DESC LIMIT 10";
connection.query(surfaceArea_10,(err,result)=>{
    if(err) throw err;
    console.log(result)
});
const populationCities_10 = "SELECT name FROM city ORDER by population DESC LIMIT 10";
connection.query(populationCities_10,(err,result)=>{
if(err) throw err;
console.log(result)
});
const worldPopulation = "SELECT SUM(population) FROM country";
connection.query(worldPopulation,(err,result)=>{
if(err) throw err;
console.log(result)
});

connection.end();