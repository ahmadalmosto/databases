const mysql = require("mysql");
const util = require("util");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "",
  database: "userdb",
  multipleStatements: true,
});
const execQuery = util.promisify(connection.query.bind(connection));

async function seedData() {
  // change the default autocommit to 0 so it will never commit till i tell it to do so
  const commit = `SET AUTOCOMMIT = 0;`;
  // start the transaction
  const transaction = `START TRANSACTION;`;
  // substract from the 101 account balance
  const updateAccount1 = `UPDATE account SET balance = balance - 1000 WHERE account_number = 103;`;
  const rollBack = `ROLLBACK`;
  // add to the 102 account balance
  const updateAccount2 = `UPDATE account SET balance = balance + 1000 WHERE account_number = 101;`;
  // log the changes in the account changes table
  const insertData = `INSERT INTO accountChanges VALUES (13 , 103 , 2000 , '2009-12-11' , 'Jack'),
  (11 , 101 , 1000 ,'2017-05-03', 'Tom');`;
  // stop the transaction
  const commitEnd = `COMMIT;`;

  try {
    // execute the queries
    await Promise.all(
      execQuery(commit),
      execQuery(transaction),
      execQuery(updateAccount1),
      execQuery(updateAccount2),
      execQuery(insertData),
      execQuery(commitEnd)
    );
  } catch (error) {
    console.log(error);
    await execQuery(rollBack);
    connection.end();
  }
  connection.end();
}
seedData();
