import oracle from "oracledb";
import dbConfig from '../config.json' assert { type: 'json' };

class Proveedor {
  static async index() {
    let connection;
    try {
      connection = await oracle.getConnection(dbConfig);
      let result = await connection.execute(
        
        `SELECT CODPROVEEDOR,DESPERSONA, NRORUC FROM PROVEEDOR INNER JOIN PERSONA ON PROVEEDOR.CODPROVEEDOR = PERSONA.CODPERSONA`
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
export default Proveedor;
