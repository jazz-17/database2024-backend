import oracle from "oracledb";
import dbConfig from '../config.json' assert { type: 'json' };

class Empleado {
  static async index() {
    let connection;
    try {
      connection = await oracle.getConnection(dbConfig);
      let result = await connection.execute(
        `SELECT DESPERSONA, DIRECC, CELULAR, HOBBY FROM EMPLEADO INNER JOIN PERSONA ON EMPLEADO.CODEMPLEADO = PERSONA.CODPERSONA`
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
export default Empleado;
