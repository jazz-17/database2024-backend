import express from "express";
import oracle from "oracledb";

import path from "path";

import dotenv from "dotenv";
dotenv.config();
import DatabaseManager from "./database/manager.js";
import setupRoutes from "./routes.js";
import { fileURLToPath } from "url";

// Connection settings
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.CON_STRING,
};
// Get the __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Server {
  constructor() {
    this.app = express();
    this.port = 3000;
    this.app.listen(this.port, () => {
      console.log(`Server is running at http://localhost:${this.port}`);
    });
    this.app.use(express.static(path.join(__dirname, "public")));

    this.app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "public", "index.html"));
    });
    this.app.get("/api/data", (req, res) => {
      let manager = new DatabaseManager(dbConfig);
      let result = manager.fetchJsonAndSendToFronted();
      result.then((result) => res.json({ message: result }));
    });
    this.startDatabaseConn();
    setupRoutes(this.app);
  }
  async startDatabaseConn() {
    try {
      await oracle.createPool(dbConfig);
      console.log("Connection pool started");
      process
        .once("SIGTERM", this.closeDatabaseConn)
        .once("SIGINT", this.closeDatabaseConn); // Close the connection pool on process termination
    } catch (err) {
      console.error(err);
    }
  }

  async closeDatabaseConn() {
    try {
      await oracle.getPool().close(10);
      console.log("Pool closed");
      process.exit(0);
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  }
}

const args = process.argv.slice(2); // Extract command-line arguments

// If the command-line argument is "migrate", run the migration
if (args[0] === "migrate") {
  const dbm = new DatabaseManager(dbConfig);
  await dbm.migrate();
} else if (args[0] === "seed") {
  const dbm = new DatabaseManager(dbConfig);
  await dbm.seed();
} else if (args[0] === "migrate:seed") {
  const dbm = new DatabaseManager(dbConfig);
  await dbm.migrateAndSeed();
} else if (args[0] === "purge") {
  const dbm = new DatabaseManager(dbConfig);
  await dbm.purge();
} else if (args[0] === "fetch") {
  const dbm = new DatabaseManager(dbConfig);
  await dbm.fetch();
}
// Otherwise, start the server
else {
  const server = new Server();
}
