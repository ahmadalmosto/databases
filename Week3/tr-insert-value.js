const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: '',
  database: 'userdb',
  multipleStatements: true
}); 
connection.connect(function(error){
    if(error) throw error;
    console.log('connection SUCCEED')
    
});
//https://stackoverflow.com/questions/54730641/node-js-how-to-apply-util-promisify-to-mysql-pool-in-its-simplest-way
const execQuery = util.promisify(connection.query.bind(connection));
async function inserData(){
const use_table1 = `USE  account`

const tableQuery1 = [
    "INSERT INTO account VALUES(101 , 2000)",
    "INSERT INTO account VALUES(102 , 1500)",
    "INSERT INTO account VALUES(103 , 4000)",
    "INSERT INTO account VALUES(104 , 3000)",
]
const use_table2 = `USE accountChanges`

const tableQuery2 = [
    "INSERT INTO accountChanges VALUES(11 , 101 , 1000 ,'2017-05-03', 'Tom')",
    "INSERT INTO accountChanges VALUES(12 , 102, 3500 , '2015-11-10' , John)",
    "INSERT INTO accountChanges VALUES(13 , 103 , 2000 , '2009-12-11' , 'Jack')",
    "INSERT INTO accountChanges VALUES(14 , 104 ,4000 , '2001-09-03', 'Lionel')",
];
//https://codeburst.io/node-js-mysql-and-async-await-6fb25b01b628
try{
    for(let i in tableQuery1){
        await execQuery('INSERT INTO account SET ?',tableQuery1[i])
    }
    for(let i in tableQuery2){
        await execQuery('INSERT INTO accountChanges SET ?' ,tableQuery2[i])
    }
} catch (error){
    console.error(error)
}
connection.end()
}