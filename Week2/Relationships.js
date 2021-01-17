const mysql = require("mysql");
const util = require("util");
const researchPaper = require("./values/research_paper");
const authorResearch = require("./values/authorResearch");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
  multipleStatements: true,
});
const execQuery = util.promisify(connection.query.bind(connection));
async function seedDataResearch() {
  const createPapersTable = `CREATE TABLE IF NOT EXISTS Research_paper(
        paper_id INT,
        paper_title VARCHAR(50),
        conference VARCHAR(50),
        publish_date DATE
      )
      `;
  const AuthorPaper = `
      CREATE TABLE IF NOT EXISTS ResearchAuthor(
        paper_id INT,
        author_no INT,
        FOREIGN KEY(author_no) REFERENCES authors(author_no),
        FOREIGN KEY(paper_id) REFERENCES Research_paper(paper_id)
      )
      `;
  connection.connect();
  try {
    await execQuery(createPapersTable);
    await execQuery(AuthorPaper);
    await Promise.all(
      researchPaper.map((paper) =>
        execQuery("INSERT INTO authors SET ?",paper)
      )
    );
    await Promise.all(
      authorResearch.map((research) =>
        execQuery("INSERT INTO authors SET ?", research)
      )
    );
  } catch (error) {
    console.error(error);
    connection.end();
  }
}
seedDataResearch();
