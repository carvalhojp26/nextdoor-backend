const { poolPromise } = require("../config/db");

const getAdresses = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM [dbo].[Endereco]");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error getting adresses in database: ", error);
    res.status(500).json("Internal server error.");
  }
};

const addAdresses = async (req, res) => {
  const { numeroPorta, distrito, freguesia, codigoPostal } = req.body;
  console.log("req.body: ", req.body);

  try {
    const pool = await poolPromise;
    await pool
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

    res.status(201).json({ message: "Adress added successfully" });
  } catch (error) {
    console.error("Error adding adress in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateAdresses = async (req, res) => {
  const { idEndereco } = req.params;
  const { numeroPorta, distrito, freguesia, codigoPostal } = req.body;

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

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({
        message: `Address with id ${idEndereco} updated successfully.`,
      });
    } else {
      res
        .status(404)
        .json({ error: `Address with id ${idEndereco} not found.` });
    }
  } catch (error) {
    console.error("Error updating address in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { getAdresses, addAdresses, updateAdresses };
