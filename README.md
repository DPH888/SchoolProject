# School Project: Team Remake of "White Tile, Don't Tap It"

This is a school team project. The goal is to recreate the game [White Tile, Don't Tap It](https://www.donttap.com/) using JavaScript and SQL.  
This project is for educational purposes only and is not affiliated with the original game.

## Team Collaboration

This project was created by a team of students working together.

## How to Run the Project Locally

1. **Clone the repository**

git clone https://github.com/DPH888/SchoolProject.git
cd SchoolProject 

Or you can download it directly
2. **Install Node.js dependencies**

Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

Then run the following command to install the required packages:

npm install

3. **Set up the SQL database**

- Make sure you have MySQL installed and running locally.
- Open MySQL Workbench or terminal and run the following SQL:
  ```sql
  CREATE DATABASE reaction_game;
USE reaction_game;

CREATE TABLE scores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reaction_time INT NOT NULL,
  clicked_squares INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

4. **Start the Node.js server**

   Make sure your database is running and properly configured.

   Then start the server using the following command: node server.js

5. **Open the game in your browser**

After starting the server, open your browser and go to:

http://localhost:3000/

## Project Files

The  files required to run the game are:

- `index.html` – the main HTML file
- `script.js` – the main JavaScript logic
- `package.json` – contains the list of dependencies
- `package-lock.json` – locks the versions of dependencies
- `database.sql` – the SQL file to set up the required database
- `server.js` – starts the local server and handles requests (like connecting to the database or serving files)
- `node_modules` – contains all the external packages (like express, mysql) required by the project after running npm install

All of these files are included in the repository and will be downloaded when you clone it and rune npm install.