const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: '',
  database: 'world',
  multipleStatements: true
});
connection.connect(function(error){
    if(error) throw error;
    console.log('connection SUCCEED')
    
});
function getPopulation(Country, name, code, cb) {
   
    connection.query(
      `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = ${code}`,
      function(err, result) {
        if (err) cb(err);
        if (result.length == 0) cb(new Error("Not found"));
        cb(null, result[0].name);
      }
    );
  }
  function getPopulation2(Country, name, code, cb) {
   
    connection.query(
      `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = ?`,[name,code],
      function(error, result) {
        if (error) cb(error);
        if (result.length == 0) cb(new Error("Not found"));
        cb(null, result[0].name);
      }
    );
  }
  getPopulation2(country,Syria,SYR,(error,result)=>{
if(error) throw error;
console.log(result)
  })

  connection.end();