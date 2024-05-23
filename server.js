import express from "express";
import oracle from "oracledb";
import DatabaseManager from "./database/manager.js";
import setupRoutes from "./routes.js";

// Connection settings
const dbConfig = {
  user: "Prueba",
  password: "123",
  connectString: "localhost/xepdb1",
};

class Server {
  constructor() {
    this.app = express();
    this.init();
  }

  async init() {
    try {
      await this.startDatabaseConn();
      this.app.listen(3000, () => {
        console.log(`Server is running at http://localhost:3000`);
      });
      setupRoutes(this.app);
    } catch (error) {
      console.error("Failed to start the server:", error);
    }
  }
  async startDatabaseConn() {
    try {
      await oracle.createPool(dbConfig);
      console.log("Connection pool started");
      process
        .once("SIGTERM", this.closeDatabaseConn.bind(this))
        .once("SIGINT", this.closeDatabaseConn.bind(this));
    } catch (error) {
      console.error("Failed to start the database connection:", error);
      throw error; // Rethrow error to be caught in init()
    }
  }

  async closeDatabaseConn() {
    try {
      await oracle.getPool().close(10);
      console.log("Connection pool closed");
      process.exit(0);
    } catch (err) {
      console.error("Error closing the connection pool:", err);
      process.exit(1);
    }
  }
}

const args = process.argv.slice(2); // Extract command-line arguments
const dbm = new DatabaseManager(dbConfig);
switch (args[0]) {
  case "migrate":
    dbm.migrate();
    break;
  case "purge":
    dbm.purge();
    break;
  case "seed":
    dbm.seed();
    break;
  case "fetch":
    dbm.fetch();
    break;
  default:
    new Server();
    break;
}
