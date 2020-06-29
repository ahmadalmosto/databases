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
const researchPaper = 
`SELECT rp.paper_title, count(a.author_no) AS all_Authors 
FROM Research_paper rp
JOIN ResearchAuthor ap USING(paper_id)
JOIN authors a USING(author_no);
`
connection.query(researchPaper, (error, results) => {
    if (error) throw error;
    console.table(results);
});

const sumOfresearchPaper = 
`SELECT count(ap.paper_id) AS all_papers_with_females
FROM authors a
JOIN authors_papers ap USING(author_no) WHERE a.gender = 'f';
`
connection.query(sumOfresearchPaper, (error, results) => {
    if (error) throw error;
    console.table(results);
});
const averageIndex = 
`SELECT university, avg(h_index) as avg_h_index
FROM Authors GROUP BY university;
`
connection.query(averageIndex, (error, results) => {
    if (error) throw error;
    console.table(results);
});
const universityResearch = 
`SELECT a.university, count(ap.paper_id) AS all_papers_with_university
FROM authors a
JOIN ResearchAuthor ap USING(author_no)
JOIN Research_paper rp USING(paper_id)
GROUP BY a.university;
`
connection.query(universityResearch, (error, results) => {
    if (error) throw error;
    console.table(results);
});

const minMaxIndex= 
`
SELECT a. university, min(a.h_index) AS min_h_index, max(a.h_index) AS max_h_index
FROM authors a
JOIN ResearchAuthor ap
    USING(author_no)
JOIN Research_paper rp
	ON rp.paper_id = ap.paper_id
GROUP BY a.university;
`
connection.query(minMaxIndex, (error, results) => {
    if (error) throw error;
    console.table(results);
});
connection.end(); 
