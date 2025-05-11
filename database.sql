DROP DATABASE IF EXISTS reaction_game;
CREATE DATABASE reaction_game;
USE reaction_game;

CREATE TABLE scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reaction_time INT NOT NULL,
    clicked_squares INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);