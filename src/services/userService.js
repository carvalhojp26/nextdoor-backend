const { poolPromise } = require("../config/db");

const getUsers = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT * FROM [dbo].[Utilizador]");
    return result.recordset;
  } catch (error) {
    console.error("Error getting users from database:", error);
    throw error;
  }
};

const insertUser = async (body) => {
  const {
    nomeUtilizador,
    dataNascimento,
    pontosUtilizador,
    comprovativoResidencia,
    emailUtilizador,
    password,
    VizinhançaidVizinhança,
    EnderecoidEndereco,
    estadoUtilizadoridEstadoUtilizador,
    tipoUtilizadoridTipoUtilizador,
  } = body;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("nomeUtilizador", nomeUtilizador)
      .input("dataNascimento", dataNascimento)
      .input("pontosUtilizador", pontosUtilizador)
      .input("comprovativoResidencia", comprovativoResidencia)
      .input("emailUtilizador", emailUtilizador)
      .input("password", password)
      .input("idVizinhanca", VizinhançaidVizinhança)
      .input("idEndereco", EnderecoidEndereco)
      .input("idEstadoUtilizador", estadoUtilizadoridEstadoUtilizador)
      .input("idTipoUtilizador", tipoUtilizadoridTipoUtilizador).query(`
        INSERT INTO [dbo].[Utilizador] (
          nomeUtilizador,
          dataNascimento,
          pontosUtilizador,
          comprovativoResidencia,
          emailUtilizador,
          password,
          VizinhançaidVizinhança,
          EnderecoidEndereco,
          estadoUtilizadoridEstadoUtilizador,
          tipoUtilizadoridTipoUtilizador
        )
        VALUES (
          @nomeUtilizador,
          @dataNascimento,
          @pontosUtilizador,
          @comprovativoResidencia,
          @emailUtilizador,
          @password,
          @idVizinhanca,
          @idEndereco,
          @idEstadoUtilizador,
          @idTipoUtilizador
        )
      `);

    return result;
  } catch (error) {
    console.error("Error inserting user in database:", error);
    throw error;
  }
};

module.exports = { getUsers, insertUser };
