import oracle from "oracledb";
import dbConfig from "../config.json" assert { type: "json" };

class Cliente {
  static async index() {
    let connection;
    try {
      connection = await oracle.getConnection(dbConfig);
      const result = await connection.execute(
        `
        SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
            'CODCLIENTE' VALUE CODCLIENTE,
            'DESPERSONA' VALUE DESPERSONA,
            'NRORUC' VALUE NRORUC
          )
        ) 
        FROM CLIENTE INNER JOIN PERSONA ON CODCLIENTE = CODPERSONA
        `
      );
      let clientes = result.rows[0][0];
      // const headers = result.metaData.map((header) => header.name);
      // const rows = result.rows;
      // const clientes = [];
      // rows.forEach((row) => {
      //   let cliente = {};
      //   row.forEach((column, index) => {
      //     cliente[headers[index]] = column;
      //   });
      //   clientes.push(cliente);
      // });
      // console.log(clientes);
      return clientes;
    } catch (err) {
      console.error("Error during fetch:", err);
      return "[]";
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error("Error closing connection:", err);
        }
      }
    }
  }
  static async create(desPersona, nroRuc, desCorta, desAlterna) {
    desPersona = desPersona || "default xd";
    nroRuc = nroRuc || "12345";
    desCorta = desCorta || "nada";
    desAlterna = desAlterna || "nada";

    let connection;
    try {
      connection = await oracle.getConnection(dbConfig);
      await connection.execute(
        `BEGIN
          INSERT INTO PERSONA (CODCIA, CODPERSONA, DESPERSONA, DESCORTA, DESCALTERNA, TIPPERSONA, DESCORTAALT, VIGENTE) VALUES (1, SEC_PERSONA.NEXTVAL, :desPersona, :desCorta, :desAlterna, 1, 'default', 1);

          INSERT INTO CLIENTE (CODCIA, CODCLIENTE, NRORUC, VIGENTE) VALUES (1, SEC_PERSONA.CURRVAL, :nroRuc, 1);
        END;`,
        { desPersona, nroRuc, desCorta, desAlterna }
      );
      connection.commit();
    } catch (err) {
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error("Error closing connection:", err);
        }
      }
    }
  }
  static async delete(codCliente) {
    let connection;
    try {
      connection = await oracle.getConnection(dbConfig);
      await connection.execute(
        `BEGIN
          DELETE FROM CLIENTE WHERE CODCLIENTE = :codCliente;
          DELETE FROM PERSONA WHERE CODPERSONA = :codCliente;
        END;`,
        { codCliente }
      );
      connection.commit();
    } catch (err) {
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error("Error closing connection:", err);
        }
      }
    }
  }
}
export default Cliente;
