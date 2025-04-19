const { poolPromise } = require("../config/db");

const getUsers = async () => {
<<<<<<< HEAD
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
=======
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM [dbo].[Utilizador];');
        return result.recordset;
    } catch (error) {
        console.error("Error getting users in database: ", error);
    }
}
>>>>>>> 5ea9dc4f99fe89a835af0f68bd18b50be48f0a07

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

<<<<<<< HEAD
    return result;
  } catch (error) {
    console.error("Error inserting user in database:", error);
    throw error;
  }
};

module.exports = { getUsers, insertUser };
=======
        return result.recordset;
    } catch (error) {
        console.error("Error adding user in database:", error);
    }
}

const deleteUser = async (idUtilizador) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().input('idUtilizador', idUtilizador).query('DELETE [dbo].[Utilizador] WHERE idUtilizador = @idUtilizador');
        return result.recordset;
    } catch (error) {
        console.error("Error deleting user in database: ", error);
    }
}
module.exports = { getUsers, insertUser, deleteUser };
>>>>>>> 5ea9dc4f99fe89a835af0f68bd18b50be48f0a07
