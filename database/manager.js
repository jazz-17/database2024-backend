import oracle from "oracledb";
import Statements from "./statements.js";

class DatabaseManager {
  constructor(dbConfig) {
    this.dbConfig = dbConfig;
  }

  async migrate() {
    console.log("Starting migration...");
    let connection;
    try {
      connection = await oracle.getConnection(this.dbConfig);
      console.log("Connection was successful");

      for (let key in Statements.drop) {
        console.log(`Dropping ${key}...`);
        let statement = "";
        for (let entity in Statements.drop[key]) {
          try {
            if (key === "table") {
              statement = `
              BEGIN
                EXECUTE IMMEDIATE 'drop ${key} ${Statements.drop[key][entity]} cascade constraints';
              EXCEPTION
                WHEN OTHERS THEN
                  IF SQLCODE != -942 THEN
                    RAISE;
                END IF;
              END;`;
              await connection.execute(statement);
            } else if (key === "sequence") {
              statement = `
              BEGIN
                EXECUTE IMMEDIATE 'drop ${key} ${Statements.drop[key][entity]}';
              EXCEPTION
                WHEN OTHERS THEN
                  IF SQLCODE != -2289 THEN
                    RAISE;
                END IF;
              END;`;
              await connection.execute(statement);
            } else if (key === "procedure") {
              statement = `
              BEGIN
                EXECUTE IMMEDIATE 'drop ${key} ${Statements.drop[key][entity]}';
              EXCEPTION
                WHEN OTHERS THEN
                  IF SQLCODE != -4043 THEN
                    RAISE;
                END IF;
              END;`;
              await connection.execute(statement);
            } else if (key === "function") {
              statement = `
              BEGIN
                EXECUTE IMMEDIATE 'drop ${key} ${Statements.drop[key][entity]}';
              EXCEPTION
                WHEN OTHERS THEN
                  IF SQLCODE != -4043 THEN
                    RAISE;
                END IF;
              END;`;
              await connection.execute(statement);
            }
          } catch (err) {
            console.error(`Error in statement: ${statement}`);
            throw err;
          }
        }
      }

      for (let key in Statements.create) {
        console.log(`Creating ${key}...`);
        let statement = "";
        for (let entity in Statements.create[key]) {
          try {
            statement = Statements.create[key][entity];
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
      connection = await oracle.getConnection(this.dbConfig);
      console.log("Connection was successful");
      console.log("Starting seeding...");
      for (let statement of Statements.seed) {
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
    try {
      connection = await oracle.getConnection(this.dbConfig);
      console.log("Connection was successful");

      for (let key in Statements.drop) {
        console.log(`Dropping ${key}...`);
        let statement = "";
        for (let entity in Statements.drop[key]) {
          try {
            if (key === "table") {
              statement = `
              BEGIN
                EXECUTE IMMEDIATE 'drop ${key} ${Statements.drop[key][entity]} cascade constraints';
              EXCEPTION
                WHEN OTHERS THEN
                  IF SQLCODE != -942 THEN
                    RAISE;
                END IF;
              END;`;
              await connection.execute(statement);
            } else if (key === "sequence") {
              statement = `
              BEGIN
                EXECUTE IMMEDIATE 'drop ${key} ${Statements.drop[key][entity]}';
              EXCEPTION
                WHEN OTHERS THEN
                  IF SQLCODE != -2289 THEN
                    RAISE;
                END IF;
              END;`;
              await connection.execute(statement);
            } else if (key === "procedure") {
              statement = `
              BEGIN
                EXECUTE IMMEDIATE 'drop ${key} ${Statements.drop[key][entity]}';
              EXCEPTION
                WHEN OTHERS THEN
                  IF SQLCODE != -4043 THEN
                    RAISE;
                END IF;
              END;`;
              await connection.execute(statement);
            } else if (key === "function") {
              statement = `
              BEGIN
                EXECUTE IMMEDIATE 'drop ${key} ${Statements.drop[key][entity]}';
              EXCEPTION
                WHEN OTHERS THEN
                  IF SQLCODE != -4043 THEN
                    RAISE;
                END IF;
              END;`;
              await connection.execute(statement);
            }
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
      connection = await oracle.getConnection(this.dbConfig);
      console.log("Connection was successful");

      console.log(`Fetching data for...`);
      const result = await connection.execute(`SELECT * FROM CLIENTE`);
      connection.commit();
      console.log(result);
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

  async fetchJsonAndSendToFronted() {
    let connection;
    let result;
    try {
      connection = await oracle.getConnection(this.dbConfig);
      console.log("Connection was successful");

      console.log(`Fetching data for ${this.tables[1].tableName}...`);
      try {
        result = await connection.execute(
          `SELECT * FROM ${this.tables[1].tableName}`
        );
      } catch (err) {
        console.error(`Error fetching data for ${this.tables[1].tableName}`);
        throw err;
      }

      // for (const table of this.tables) {
      //   console.log(`Fetching data for ${table.tableName}...`);
      //   try {
      //     result = await connection.execute(`SELECT * FROM ${table.tableName}`);
      //   } catch (err) {
      //     console.error(`Error fetching data for ${table.tableName}`);
      //     throw err;
      //   }
      // }
    } catch (err) {
      console.error("Error during fetch:", err);
    } finally {
      if (connection) {
        try {
          await connection.close();
          console.log("Connection closed.");
          result = JSON.stringify(result.rows);
          return result;
        } catch (err) {
          console.error("Error closing connection:", err);
        }
      }
    }
  }
}

export default DatabaseManager;
