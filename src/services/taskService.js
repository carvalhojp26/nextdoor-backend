const { poolPromise } = require("../config/db");

const getTasks = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT * FROM [dbo].[criacaoTarefa]");
    return result.recordset;
  } catch (error) {
    console.error("Error getting tasks from database:", error);
    throw error;
  }
};

const addTask = async (body) => {
  const {
    nomeTarefa,
    dataInicio,
    dataFim,
    descricaoTarefa,
    idUtilizador,
    idCategoriaTarefa,
    idEstadoTarefa,
  } = body;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("nomeTarefa", nomeTarefa)
      .input("dataInicio", dataInicio)
      .input("dataFim", dataFim)
      .input("descricaoTarefa", descricaoTarefa)
      .input("idUtilizador", idUtilizador)
      .input("idCategoriaTarefa", idCategoriaTarefa)
      .input("idEstadoTarefa", idEstadoTarefa)
      .query(`INSERT INTO [dbo].[criacaoTarefa] (
                                        nomeTarefa,
                                        dataInicio,
                                        dataFim,
                                        descricaoTarefa,
                                        UtilizadoridUtilizador,
                                        categoriaTarefaidCategoriaTarefa,
                                        estadoCriacaoTarefaidEstadoCriacaoTarefa   
                                    )
                                    VALUES (
                                        @nomeTarefa,
                                        @dataInicio,
                                        @dataFim,
                                        @descricaoTarefa,
                                        @idUtilizador,
                                        @idCategoriaTarefa,
                                        @idEstadoTarefa 
                                    )`);
    return result.recordset;
  } catch (error) {
    console.error("Error adding task in database: ", error);
  }
};

module.exports = { getTasks, addTask };
