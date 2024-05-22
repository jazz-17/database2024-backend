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
    this.app.listen(3000, () => {
      console.log(`Server is running at http://localhost:3000`);
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
