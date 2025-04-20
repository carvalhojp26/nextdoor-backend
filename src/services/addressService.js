const { poolPromise } = require("../config/db");

const getAddress = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM [dbo].[Endereco]");
    return result.recordset;
  } catch (error) {
    console.error("Error getting adresses in database: ", error);
    res.status(500).json("Internal server error.");
  }
};

const insertAddress = async (body) => {
  const { numeroPorta, distrito, freguesia, codigoPostal, rua } = body;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("numeroPorta", numeroPorta)
      .input("distrito", distrito)
      .input("freguesia", freguesia)
      .input("codigoPostal", codigoPostal)
      .input("rua", rua).query(`      
                    INSERT INTO [dbo].[Endereco] (
                        numeroPorta,
                        distrito,
                        freguesia,
                        codigoPostal,
                        rua
                    )
                    VALUES (
                        @numeroPorta,
                        @distrito,
                        @freguesia,
                        @codigoPostal,
                        @rua
                    )
                `);

    return result.recordset;
  } catch (error) {
    console.error("Error adding adress in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateAddress = async (idEndereco, body) => {
  const { numeroPorta, distrito, freguesia, codigoPostal, rua } = body;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("idEndereco", idEndereco)
      .input("numeroPorta", numeroPorta)
      .input("distrito", distrito)
      .input("freguesia", freguesia)
      .input("codigoPostal", codigoPostal)
      .input("rua", rua).query(`
          UPDATE [dbo].[Endereco]
          SET 
            numeroPorta = @numeroPorta,
            distrito = @distrito,
            freguesia = @freguesia,
            codigoPostal = @codigoPostal,
            rua = @rua
          WHERE idEndereco = @idEndereco
        `);

    return result.rowsAffected[0];
  } catch (error) {
    console.error("Error updating address in database:", error);
    throw new Error("Internal server error");
  }
};

module.exports = { getAddress, insertAddress, updateAddress };
