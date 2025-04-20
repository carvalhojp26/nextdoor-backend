const { poolPromise } = require("../config/db");

const getRates = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT * FROM [dbo].[feedbackAvaliacao]");
    return result.recordset;
  } catch (error) {
    console.error("Error getting rates in database: ", error);
    res.status(500).json("Internal server error.");
  }
};

const insertRate = async (body) => {
  const { comentario, pontuacao, idTarefaCriada } = body;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("comentario", comentario)
      .input("pontuacao", pontuacao)
      .input("idTarefaCriada", idTarefaCriada)
      .input("codigoPostal", codigoPostal).query(`      
                    INSERT INTO [dbo].[feedbackAvaliacao] (
                        comentario,
                        pontuacao,
                        criacaoTarefaidTarefaCriada,
                    )
                    VALUES (
                        @comentario,
                        @pontuacao,
                        @criacaoTarefaidTarefaCriada,
                    )
                `);

    return result.recordset;
  } catch (error) {
    console.error("Error adding rates in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getRates, insertRate };
