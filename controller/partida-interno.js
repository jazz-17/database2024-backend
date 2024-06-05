import oracle from "oracledb";
import dbConfig from "../config.json" assert { type: "json" };

class PartidasInterno {
  static async index() {
    let connection;
    try {
      connection = await oracle.getConnection(dbConfig);
      const result = await connection.execute(
        `
        SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
            'CODPYTO' VALUE CODPYTO,
            'NOMBPYTO' VALUE NOMBPYTO,
            'COSTOTOTAL' VALUE COSTOTOTAL
          )
        ) 
        FROM PROYECTO
        `
      );
      return result.rows[0][0] || "[]";
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
  static async delete(CODPYTO) {
    let connection;
    try {
      connection = await oracle.getConnection(dbConfig);
      await connection.execute(
        `BEGIN
          DELETE FROM PROYECTO WHERE CODPYTO = :CODPYTO;
        END;`,
        { CODPYTO }
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
export default PartidasInterno;
