import oracle from "oracledb";
import Product from "./Tables/Product.js";
import Brand from "./Tables/Brand.js";
import Proyecto from "./Tables/Proyecto.js";
// import Cliente from "./Tables/Cliente.js";
import Presupuesto from "./Tables/Presupuesto.js";

class DatabaseManager {
  constructor(dbConfig) {
    this.dbConfig = dbConfig;
    let Cliente = {};
    Cliente.tableName = "CLIENTE";
    this.tables = [Cliente];
    // this.tables = [Brand, Product];
  }

  async migrate() {
    console.log("Starting migration...");
    let connection;
    try {
      connection = await oracle.getConnection(this.dbConfig);
      console.log("Connection was successful");

      // Drop all tables
      for (let i = this.tables.length - 1; i >= 0; i--) {
        console.log(`Dropping table ${this.tables[i].tableName}...`);
        try {
          await connection.execute(`
              BEGIN
                  EXECUTE IMMEDIATE 'DROP TABLE ${this.tables[i].tableName}';
              EXCEPTION
                  WHEN OTHERS THEN
                      IF SQLCODE != -942 THEN
                          RAISE;
                      END IF;
              END;
          `);
          console.log(
            `Table ${this.tables[i].tableName} dropped successfully.`
          );
        } catch (err) {
          console.error(`Error dropping table ${this.tables[i].tableName}`);
          throw err;
        }
      }

      for (const table of this.tables) {
        console.log(`Performing migrations for ${table.tableName}...`);

        try {
          for (const statement of table.migrateStatements) {
            await connection.execute(statement);
          }
        } catch (err) {
          console.error(`Error executing migration for ${table.tableName}`);
          throw err;
        }
      }

      console.log("Please wait while we commit the changes.");
      await connection.commit();
      console.log("Changes committed successfully.");
    } catch (err) {
      console.error("Error during migration:", err);
      await connection.rollback();
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
    console.log("Starting seeding...");
    let connection;
    try {
      connection = await oracle.getConnection(this.dbConfig);
      console.log("Connection was successful");

      for (const table of this.tables) {
        console.log(`Performing seeding for ${table.tableName}...`);

        try {
          for (const statement of table.seedStatements) {
            await connection.execute(statement);
          }
        } catch (err) {
          console.error(`Error executing seeding for ${table.tableName}`);
          throw err;
        }
      }

      console.log("Please wait while we commit the changes.");
      await connection.commit();
      console.log("Changes committed successfully.");
    } catch (err) {
      console.error("Error during seeding:", err);
      await connection.rollback();
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

      // what command to drop ALL tables?
      let dropCommand = `BEGIN
    FOR i IN (SELECT table_name FROM user_tables) LOOP
      EXECUTE IMMEDIATE 'DROP TABLE ' || i.table_name || ' CASCADE CONSTRAINTS';
    END LOOP;
  END;`;

      await connection.execute(dropCommand);

      //   // Drop all tables
      //   for (let i = this.tables.length - 1; i >= 0; i--) {
      //     console.log(`Dropping table ${this.tables[i].tableName}...`);
      //     try {
      //       await connection.execute(`
      //           BEGIN
      //               EXECUTE IMMEDIATE 'DROP TABLE ${this.tables[i].tableName}';
      //           EXCEPTION
      //               WHEN OTHERS THEN
      //                   IF SQLCODE != -942 THEN
      //                       RAISE;
      //                   END IF;
      //           END;
      //       `);
      //       console.log(`Table ${this.tables[i].tableName} dropped successfully.`);
      //     } catch (err) {
      //       console.error(`Error dropping table ${this.tables[i].tableName}`);
      //       throw err;
      //     }
      //   }

      //   console.log("Please wait while we commit the changes.");
      //   await connection.commit();
      //   console.log("Changes committed successfully.");
    } catch (err) {
      console.error("Error during purge:", err);
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

  async migrateAndSeed() {
    console.log("Starting transaction...");
    let connection;
    try {
      connection = await oracle.getConnection(this.dbConfig);
      console.log("Connection was successful");

      for (const table of this.tables) {
        console.log(`Performing migration for ${table.tableName}...`);
        try {
          for (const statement of table.migrateStatements) {
            await connection.execute(statement);
          }
        } catch (err) {
          console.error(`Error executing migration for ${table.tableName}`);
          throw err;
        }

        console.log(`Performing seeding for ${table.tableName}...`);
        try {
          for (const statement of table.seedStatements) {
            await connection.execute(statement);
          }
        } catch (err) {
          console.error(`Error executing seeding for ${table.tableName}`);
          throw err;
        }
      }

      console.log("Please wait while we commit the changes.");
      await connection.commit();
      console.log("Changes committed successfully.");
    } catch (err) {
      console.error("Error during transaction:", err);
      await connection.rollback();
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
      connection.commit()
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

// async function getNotes() {
//   let conn;
//   try {
//     conn = await oracle.getConnection();
//     const result = await conn.execute("SELECT * FROM NOTES");
//     return result.rows;
//   } catch (err) {
//     console.error(err);
//   } finally {
//     if (conn) {
//       try {
//         await conn.close();
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   }
// }
