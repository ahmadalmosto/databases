const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "",
  database: "userdb",
  multipleStatements: true,
});
const execQuery = util.promisify(connection.query.bind(connection));

async function seedData() {
  const commit = `SET AUTOCOMMIT = 0;`;
  const transaction = `START TRANSACTION;`;
  const updateAccount1 = `UPDATE account SET balance = balance - 1000 WHERE account_number = 103;`;
  const rollBack = `ROLLBACK`;
  const updateAccount2 = `UPDATE account SET balance = balance + 1000 WHERE account_number = 101;`;
  const insertData = `INSERT INTO accountChanges VALUES (13 , 103 , 2000 , '2009-12-11' , 'Jack'),
  (11 , 101 , 1000 ,'2017-05-03', 'Tom');`;
  const commitEnd = `COMMIT;`;

  try {
    await Promise.all(
      execQuery(commit),
      execQuery(transaction),
      execQuery(updateAccount1),
      execQuery(updateAccount2),
      execQuery(insertData),
      execQuery(commitEnd)
    );
  } catch (error) {
    console.log(error)
    await execQuery(rollBack);
    connection.end();
  }
  connection.end();
}
seedData();
