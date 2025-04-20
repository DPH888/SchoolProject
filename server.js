const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

// Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'reaction_game'
});

connection.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL');
});

// Save score endpoint
app.post('/save-score', (req, res) => {
    const { reactionTime, clickedSquares } = req.body;
    const query = 'INSERT INTO scores (reaction_time, clicked_squares) VALUES (?, ?)';
    connection.query(query, [reactionTime, clickedSquares], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'Score saved successfully', id: results.insertId });
    });
});

// Get scores endpoint
app.get('/scores', (req, res) => {
    const query = 'SELECT * FROM scores';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});