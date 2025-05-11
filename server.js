const express = require("express");
const mysql = require("mysql2");
const app = express();
const PORT = 3000;

// Connect to MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345", // Change to your MySQL password
    database: "reaction_game" // Use reaction_game to match README.md
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL");
});

app.use(express.static("public"));
app.use(express.json()); // To handle JSON data from the game

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Route to save scores
app.post("/save-score", (req, res) => {
    const { reaction_time, clicked_squares } = req.body;
    const query = "INSERT INTO scores (reaction_time, clicked_squares) VALUES (?, ?)";
    db.query(query, [reaction_time, clicked_squares], (err) => {
        if (err) {
            console.log("Error saving score:", err);
            res.status(500).send("Error saving score");
            return;
        }
        res.status(200).send("Score saved");
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});