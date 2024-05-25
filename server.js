import Express from "express";
import DatabaseManager from "./database/manager.js";
import RoutesManager from "./routes.js";


class Server {
  constructor() {
    this.dbm = new DatabaseManager();
    this.app = new Express(); 
    this.rm = new RoutesManager(this.app, this.dbm);
  }

  async init() {
    try {
      await this.dbm.startDatabaseConn();
      this.rm.setup();
      await this.app.listen(3000);
      console.log(`Server is running at http://localhost:3000`);
    } catch (error) {
      console.error("Failed to start the server:", error);
    }
  }
}

let server = new Server();
const args = process.argv.slice(2); // Extract command-line arguments
switch (args[0]) {
  case "migrate":
    server.dbm.migrate();
    break;
  case "purge":
    server.dbm.purge();
    break;
  case "seed":
    server.dbm.seed();
    break;
  case "fetch":
    server.dbm.fetch();
    break;
  default:
    server.init();
    break;
}
