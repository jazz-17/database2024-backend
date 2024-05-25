import oracle from "oracledb";
import Statements from "./statements.js";

// Connection settings
const dbConfig = {
  user: "Prueba",
  password: "123",
  connectString: "localhost/xepdb1",
};
class DatabaseManager {
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
  async migrate() {
    console.log("Starting migration...");
    let connection;
    try {
      connection = await oracle.getConnection(dbConfig);
      console.log("Connection was successful");

      for (let key in Statements["drop"]) {
        console.log(`Dropping ${key}...`);
        let statement = "";
        let extra = "";
        let code = 0;
        for (let entity of Statements["drop"][key]) {
          try {
            switch (key) {
              case "table":
                extra = "cascade constraints";
                code = -942;
                break;
              case "sequence":
                code = -2289;
                break;
              case "procedure":
              case "function":
                code = -4043;
                break;
              default:
                break;
            }
            statement = `
            BEGIN
              EXECUTE IMMEDIATE 'drop ${key} ${entity} ${extra}';
            EXCEPTION
              WHEN OTHERS THEN
                IF SQLCODE != ${code} THEN
                  RAISE;
              END IF;
            END;`;
            await connection.execute(statement);
          } catch (err) {
            console.error(`Error in statement: ${statement}`);
            throw err;
          }
        }
      }

      for (let key in Statements["create"]) {
        console.log(`Creating ${key}...`);
        let statement = "";
        for (let entity in Statements["create"][key]) {
          try {
            statement = Statements["create"][key][entity];
            await connection.execute(statement);
          } catch (err) {
            console.error(`Error in statement: ${statement}`);
            throw err;
          }
        }
      }

      console.log("Please wait while we commit the changes.");
      await connection.commit();
      console.log("Changes committed successfully.");
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
          console.log("Connection closed.");
        } catch (err) {
          console.error("Error closing connection:", err);
        }
      }
    }
  }
  async seed() {
    let connection;
    try {
      connection = await oracle.getConnection(dbConfig);
      console.log("Connection was successful");
      console.log("Starting seeding...");
      for (let statement of Statements.seed) {
        try {
          await connection.execute(statement);
        } catch (err) {
          console.error(`Error in statement: ${statement}`);
          // console.error("Error in statement: ", statement);
          throw err;
        }
      }

      console.log("Please wait while we commit the changes.");
      await connection.commit();
      console.log("Changes committed successfully.");
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
          console.log("Connection closed.");
        } catch (err) {
          console.error("Error closing connection:", err);
        }
      }
    }
  }
  async purge() {
    console.log("Starting purge...");
    let connection;
    try {
      connection = await oracle.getConnection(dbConfig);
      console.log("Connection was successful");

      for (let key in Statements["drop"]) {
        console.log(`Dropping ${key}...`);
        let statement = "";
        let extra = "";
        let code = 0;
        for (let entity of Statements["drop"][key]) {
          try {
            switch (key) {
              case "table":
                extra = "cascade constraints";
                code = -942;
                break;
              case "sequence":
                code = -2289;
                break;
              case "procedure":
              case "function":
                code = -4043;
                break;
              default:
                break;
            }
            statement = `
            BEGIN
              EXECUTE IMMEDIATE 'drop ${key} ${entity} ${extra}';
            EXCEPTION
              WHEN OTHERS THEN
                IF SQLCODE != ${code} THEN
                  RAISE;
              END IF;
            END;`;
            await connection.execute(statement);
          } catch (err) {
            console.error(`Error in statement: ${statement}`);
            throw err;
          }
        }
      }
      console.log("Please wait while we commit the changes.");
      await connection.commit();
      console.log("Changes committed successfully.");
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
          console.log("Connection closed.");
        } catch (err) {
          console.error("Error closing connection:", err);
        }
      }
    }
  }
  async fetch() {
    let connection;
    try {
      connection = await oracle.getConnection(dbConfig);
      console.log("Connection was successful");

      let counter = 0;
      for (let table of Statements["drop"]["table"]) {
        console.log(`Fetching data for ${table}...`);
        try {
          const result = await connection.execute(`SELECT * FROM ${table}`);
          console.log(result.rows);
          counter++;
          if (counter > 4) {
            break;
          }
        } catch (err) {
          console.error(`Error fetching data for ${table}`);
          throw err;
        }
      }
    } catch (err) {
      console.error("Error during fetch:", err);
    } finally {
      if (connection) {
        try {
          await connection.close();
          console.log("Connection closed.");
        } catch (err) {
          console.error("Error closing connection:", err);
        }
      }
    }
  }

  /**************************/
  /* Api controller methods */
  /**************************/
  async getProyectos() {
    console.log("Fetching projects...");
    let connection;
    try {
      // Get a connection from the default pool
      connection = await oracle.getConnection(dbConfig);
      const result = await connection.execute(`SELECT CodCIA, NombPyto, EmplJefeProy, CodCliente, CodCia1, FecReg, CodFase, CodNivel, CodFuncion FROM Proyecto`);
      
      return result.rows;
    } catch (err) {
      console.error("Error during fetch:", err);
    } finally {
      if (connection) {
        try {
          await connection.close();
          console.log("Connection closed.");
        } catch (err) {
          console.error("Error closing connection:", err);
        }
      }
    }
  }
}

export default DatabaseManager;
