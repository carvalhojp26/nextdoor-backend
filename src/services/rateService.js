const { poolPromise } = require("../config/db");

const getAddress = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT * FROM [dbo].[feedbackAvaliacao]");
    return result.recordset;
  } catch (error) {
    console.error("Error getting adresses in database: ", error);
    res.status(500).json("Internal server error.");
  }
};

const insertRate = async (body) => {
  const { comentario, pontuacao, criacaoTarefaidTarefaCriada } = body;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("comentario", comentario)
      .input("pontuacao", pontuacao)
      .input("criacaoTarefaidTarefaCriada", criacaoTarefaidTarefaCriada)
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
                        @codigoPostal
                    )
                `);

    return result.recordset;
  } catch (error) {
    console.error("Error adding adress in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
