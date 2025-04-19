const { poolPromise } = require("../config/db");

const getTasks = async () => {
<<<<<<< HEAD
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

module.exports = { getTasks };
=======
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM [dbo].[criacaoTarefa]');
        return result.recordset;
    } catch (error) {
        console.error("Error getting tasks in database: ", error);
    }
}

const addTask = async (body) => {
    const {nomeTarefa, dataInicio, dataFim, descricaoTarefa, idUtilizador, categoriaTarefa, estadoTarefa} = body;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
                                .input('nomeTarefa', nomeTarefa)
                                .input('dataInicio', dataInicio)
                                .input('dataFim', dataFim)
                                .input('descricaoTarefa', descricaoTarefa)
                                .input('idUtilizador', idUtilizador)
                                .input('categoriaTarefa', categoriaTarefa)
                                .input('estadoTarefa', estadoTarefa)
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
                                        @categoriaTarefa,
                                        @estadoTarefa 
                                    )`)
        return result.recordset;
    } catch (error) {
        console.error("Error adding task in database: ", error)
    }
}

module.exports = { getTasks, addTask };
>>>>>>> 5ea9dc4f99fe89a835af0f68bd18b50be48f0a07
