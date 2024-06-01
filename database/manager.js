import oracle from "oracledb";
import {
  createUser,
  drop_table,
  drop_sequence,
  drop_procedure,
  drop_function,
  create_table,
  create_foreign_key,
  create_sequence,
  create_trigger,
  create_procedure,
  create_function,
  seed,
} from "./statements.js";
import dbConfig from '../config.json' assert { type: 'json' };
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
      throw error;
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
      for (let table of drop_table) {
        console.log(`Dropping ${table}...`);
        try {
          let statement = `
          BEGIN
            EXECUTE IMMEDIATE 'drop table ${table} cascade constraints';
          EXCEPTION
            WHEN OTHERS THEN
              IF SQLCODE != -942 THEN
                RAISE;
            END IF;
          END;`;
          await connection.execute(statement);
        } catch (err) {
          console.error(`Error in statement: ${statement}`);
          throw err;
        }
      }
      for (let sequence of drop_sequence) {
        try {
          let statement = `
          BEGIN
            EXECUTE IMMEDIATE 'drop sequence ${sequence}';
          EXCEPTION
            WHEN OTHERS THEN
              IF SQLCODE != -2289 THEN
                RAISE;
            END IF;
          END;`;
          await connection.execute(statement);
        } catch (err) {
          console.error(`Error in statement: ${statement}`);
          throw err;
        }
      }
      for (let procedure of drop_procedure) {
        try {
          let statement = `
          BEGIN
            EXECUTE IMMEDIATE 'drop procedure ${procedure}';
          EXCEPTION
            WHEN OTHERS THEN
              IF SQLCODE != -4043 THEN
                RAISE;
            END IF;
          END;`;
          await connection.execute(statement);
        } catch (err) {
          console.error(`Error in statement: ${statement}`);
          throw err;
        }
      }
      for (let func of drop_function) {
        try {
          let statement = `
          BEGIN
            EXECUTE IMMEDIATE 'drop function ${func}';
          EXCEPTION
            WHEN OTHERS THEN
              IF SQLCODE != -4043 THEN
                RAISE;
            END IF;
          END;`;
          await connection.execute(statement);
        } catch (err) {
          console.error(`Error in statement: ${statement}`);
          throw err;
        }
      }
      for (let statement of create_table) {
        let table = statement.split(" ")[2];
        console.log(`Creating ${table}...`);
        try {
          await connection.execute(statement);
        } catch (err) {
          console.error(`Error in statement: ${statement}`);
          throw err;
        }
      }
      console.log();
      for (let statement of create_foreign_key) {
        try {
          await connection.execute(statement);
        } catch (err) {
          console.error(`Error in statement: ${statement}`);
          throw err;
        }
      }
      for (let statement of create_sequence) {
        try {
          await connection.execute(statement);
        } catch (err) {
          console.error(`Error in statement: ${statement}`);
          throw err;
        }
      }
      for (let statement of create_trigger) {
        try {
          await connection.execute(statement);
        } catch (err) {
          console.error(`Error in statement: ${statement}`);
          throw err;
        }
      }
      for (let statement of create_procedure) {
        try {
          await connection.execute(statement);
        } catch (err) {
          console.error(`Error in statement: ${statement}`);
          throw err;
        }
      }
      for (let statement of create_function) {
        try {
          await connection.execute(statement);
        } catch (err) {
          console.error(`Error in statement: ${statement}`);
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
  async seed() {
    let connection;
    try {
      connection = await oracle.getConnection(dbConfig);
      console.log("Connection was successful");
      console.log("Starting seeding...");
      for (let statement of seed) {
        try {
          await connection.execute(statement);
        } catch (err) {
          console.error(`Error in statement: ${statement}`);
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
    let statement = "";
    try {
      connection = await oracle.getConnection(dbConfig);
      console.log("Connection was successful");

      for (let table of drop_table) {
        console.log(`Dropping ${table}...`);
        try {
          statement = `
          BEGIN
            EXECUTE IMMEDIATE 'drop table ${table} cascade constraints';
          EXCEPTION
            WHEN OTHERS THEN
              IF SQLCODE != -942 THEN
                RAISE;
            END IF;
          END;`;
          await connection.execute(statement);
        } catch (err) {
          console.error(`Error in statement: ${statement}`);
          throw err;
        }
      }
      for (let sequence of drop_sequence) {
        try {
          statement = `
          BEGIN
            EXECUTE IMMEDIATE 'drop sequence ${sequence}';
          EXCEPTION
            WHEN OTHERS THEN
              IF SQLCODE != -2289 THEN
                RAISE;
            END IF;
          END;`;
          await connection.execute(statement);
        } catch (err) {
          console.error(`Error in statement: ${statement}`);
          throw err;
        }
      }
      for (let procedure of drop_procedure) {
        try {
          statement = `
          BEGIN
            EXECUTE IMMEDIATE 'drop procedure ${procedure}';
          EXCEPTION
            WHEN OTHERS THEN
              IF SQLCODE != -4043 THEN
                RAISE;
            END IF;
          END;`;
          await connection.execute(statement);
        } catch (err) {
          console.error(`Error in statement: ${statement}`);
          throw err;
        }
      }
      for (let func of drop_function) {
        try {
          statement = `
          BEGIN
            EXECUTE IMMEDIATE 'drop function ${func}';
          EXCEPTION
            WHEN OTHERS THEN
              IF SQLCODE != -4043 THEN
                RAISE;
            END IF;
          END;`;
          await connection.execute(statement);
        } catch (err) {
          console.error(`Error in statement: ${statement}`);
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
  async fetch() {
    let connection;
    try {
      connection = await oracle.getConnection(dbConfig);
      console.log("Connection was successful");

      let counter = 0;
      for (let table of drop_table) {
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
}
export default DatabaseManager;
