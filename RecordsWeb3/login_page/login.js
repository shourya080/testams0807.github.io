const http = require('http');
const url = require('url');
const qs = require('querystring');
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'shourya080',
  user: 'admin',
  password: 'admin',
  database: 'table.sql'
});

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/login') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const data = qs.parse(body);
      const username = data.username;
      const password = data.password;
      const role = data.role;
      const sql = `SELECT * FROM users WHERE username = ? AND password = ? AND role = ?`;
      db.query(sql, [username, password, role], (err, results) => {
        if (err) {
          console.error(err);
          res.statusCode = 500;
          res.end('Server error');
        } else if (results.length === 1) {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(JSON.stringify({ success: true, role: results[0].role }));
        } else {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 401;
          res.end(JSON.stringify({ success: false }));
        }
      });
    });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database');
  server.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
});

const sql = `INSERT INTO users (username, password, role)
VALUES
  (?, ?, ?),
  (?, ?, ?),
  (?, ?, ?),
  (?, ?, ?)`;

db.query(sql, [
  'john_doe', 'password123', 'teacher',
  'jane_smith', 'password456', 'teacher',
  'bob_jones', 'password789', 'student',
  'susan_brown', 'password321', 'student'
], (err, result) => {
  if (err) throw err;
  console.log('New users added:', result);
});
