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
const authorCollaborators = 
`SELECT a.author_no, a.author_name, c.author_name AS Collaborator
FROM authors a
JOIN authors c ON a.collaborator = c.author_no;`
connection.query(authorCollaborators, (error, results) => {
    if (error) throw error;
    console.table(results);
});

const authorPaper = 
`
SELECT a.author_no, a.author_name, a.university, a.h_index, a.gender, a.Collaborator, rp.paper_title
FROM authors a
LEFT JOIN ResearchAuthor ap USING(author_no)
LEFT JOIN Research_paper rp ON rp.paper_id = ap.paper_id;
`
connection.query(authorPaper, (error, results) => {
    if (error) throw error;
    console.table(results);
});
connection.end();