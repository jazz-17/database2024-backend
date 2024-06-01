import oracle from "oracledb";
import dbConfig from '../config.json' assert { type: 'json' };
class Proyecto {
  static async index() {
    let connection;
    try {
      connection = await oracle.getConnection(dbConfig);
      let result = await connection.execute(
        `SELECT CodCIA, NombPyto, EmplJefeProy, CodCliente, CodCia1, FecReg, CodFase, CodNivel, CodFuncion FROM Proyecto`
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
export default Proyecto;
