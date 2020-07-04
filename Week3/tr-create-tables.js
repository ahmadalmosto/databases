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
const execQuery = util.promisify(connection.query.bind(connection));
async function seedData(){
const accountTable = 
`CREATE TABLE IF NOT EXIST account(
   account_number INT,
   balance INT,
   CONSTRAINT PK_account PRIMARY KEY(acccount_number)
  )`;
  const accountChangesTable = 
`CREATE TABLE IF NOT EXIST accountChanges(
    change_number INT,
    account_number INT,
    amount INT,
    changed_date DATETIME,
    remark VARCHAR(50)
  )`;
  const AddforeignKey = `ALTER TABLE accountChangesTable ADD FOREIGN KEY(account_number) REFERENCES account(account_number)`;
try{
    await Promise.all[execQuery(accountTable),execQuery(accountChangesTable),
    execQuery(AddforeignKey)];
} catch(error){
    console.error(error);  
}
connection.end();
}
seedData();
  
  