const { poolPromise } = require("../config/db");

const getAddress = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM [dbo].[Endereco]");
    return result.recordset;
  } catch (error) {
    console.error("Error getting addresses from database:", error);
    throw error;
  }
};

const insertAddress = async (body) => {
  const { numeroPorta, distrito, freguesia, codigoPostal } = body;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("numeroPorta", numeroPorta)
      .input("distrito", distrito)
      .input("freguesia", freguesia)
      .input("codigoPostal", codigoPostal).query(`
        INSERT INTO [dbo].[Endereco] (
            numeroPorta,
            distrito,
            freguesia,
            codigoPostal
        )
        VALUES (
            @numeroPorta,
            @distrito,
            @freguesia,
            @codigoPostal
        )
      `);

    return result;
  } catch (error) {
    console.error("Error adding address to database:", error);
    throw error;
  }
};

const updateAddresses = async (idEndereco, body) => {
  const { numeroPorta, distrito, freguesia, codigoPostal } = body;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("idEndereco", idEndereco)
      .input("numeroPorta", numeroPorta)
      .input("distrito", distrito)
      .input("freguesia", freguesia)
      .input("codigoPostal", codigoPostal).query(`
        UPDATE [dbo].[Endereco]
        SET 
          numeroPorta = @numeroPorta,
          distrito = @distrito,
          freguesia = @freguesia,
          codigoPostal = @codigoPostal
        WHERE idEndereco = @idEndereco
      `);

    return result;
  } catch (error) {
    console.error("Error updating address in database:", error);
    throw error;
  }
};

module.exports = { getAddress, insertAddress, updateAddresses };
