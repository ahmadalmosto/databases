const mysql = require('mysql');
const util = require('util');
const authors = require('./values/authors');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: '',
  database: 'userdb',
  multipleStatements: true
});
const execQuery = util.promisify(connection.query.bind(connection))
async function seedData() {
  const createTable =
    `CREATE TABLE IF NOT EXIST Authors(
    author_no INT,
    author_name VARCHAR(50),
    university VARCHAR(50),
    date_of_birth DATETIME,
    h_index INT,
    gender EMUM('m','f'),
    CONSTRAINT PK_Author PRIMARY KEY(author_no)
  )`;

  const AddColumn = `ALTER TABLE Authors ADD COLUMN Collaborator INT`;

  const AddforeignKey = `ALTER TABLE Authors ADD FOREIGN KEY(Collaborator) REFERENCES Authors(author_no)`;
  // 
  connection.connect(function (error) {
    if (error) throw error;
    console.log('connection SUCCEED')

  });

  try {
    await Promise.all[execQuery(createTable), execQuery(AddColumn), execQuery(AddforeignKey)];

    await Promise.all(authors.map(author =>
      execQuery('INSERT INTO authors SET ?', author)
    ));

  } catch (error) {
    console.error(error)
  }
  connection.end();
}
seedData();