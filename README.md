# School Project: Team Remake of "White Tile, Don't Tap It"

This is a school team project to recreate the game [White Tile, Don't Tap It](https://www.donttap.com/) using JavaScript and SQL.  
This project is for educational purposes only and is not affiliated with the original game.

## Team Collaboration

This project was created by a team of students working together.

## How to Run the Project Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/DPH888/SchoolProject.git
   cd SchoolProject
   ```

2. **Install Node.js dependencies**

   Make sure you have [Node.js](https://nodejs.org/) installed.

   Run:

   ```bash
   npm install
   ```

3. **Set up the SQL database**

   - **Download MySQL and MySQL Workbench**
     - Install [MySQL](https://dev.mysql.com/downloads/) and [MySQL Workbench](https://dev.mysql.com/downloads/workbench/).
     - In MySQL Workbench, create a user with password `12345`. If you use a different password, update `server.js`.

   - **Create a new MySQL connection**
     - Open MySQL Workbench and create a new connection. Keep default settings (port `3306`).

   - **Set up the database**
     - In MySQL Workbench, go to `File` > `Open SQL Script`.
     - Navigate to the `SchoolProject` folder and select `database.sql`.
     - Click the lightning bolt icon (⚡) or press `Ctrl + Enter` (Windows) or `Cmd + Enter` (macOS) to run the script. This creates the `reaction_game` database and `scores` table.

   - **Verify the database**
     - Open a new query tab (`File` > `New Query Tab`).
     - Paste:
       ```sql
       SELECT * FROM reaction_game.scores ORDER BY id DESC;
       ```
     - Press `Ctrl + Enter` (Windows) or `Cmd + Enter` (macOS). An empty table is normal until scores are saved.

   - **Check server.js database settings**
     - Ensure `server.js` uses:
       ```javascript
       host: 'localhost',
       user: 'root',
       password: '12345',
       database: 'reaction_game'
       ```

4. **Start the Node.js server**

   Ensure MySQL is running. Start the server:

   ```bash
   node server.js
   ```

5. **Open the game in your browser**

   Visit:

   ```
   http://localhost:3000/
   ```

## Project Files

- `public/index.html` – Main HTML file
- `public/script.js` – Game logic in JavaScript
- `public/images/black_tile.png` – Black tile image
- `public/images/green_tile.png` – Green tile image
- `server.js` – Node.js server
- `package.json` – Lists dependencies
- `package-lock.json` – Locks dependency versions
- `database.sql` – SQL setup file
- `node_modules` – External packages (created by `npm install`)

All files are included in the repository.