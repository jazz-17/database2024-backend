import oracle from "oracledb";
import dbConfig from '../config.json' assert { type: 'json' };

class EmpresaVenta {
  static async index() {
    let connection;
    try {
      connection = await oracle.getConnection(dbConfig);
      let result = await connection.execute(
        `SELECT CIACONTRATA, DESPERSONA, NRORUC FROM EMPRESA_VTA INNER JOIN PERSONA ON EMPRESA_VTA.CIACONTRATA = PERSONA.CODPERSONA`
      );
      return result.rows;
    } catch (err) {
      console.error("Error during fetch:", err);
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
export default EmpresaVenta;
