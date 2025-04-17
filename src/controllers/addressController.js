const addressService = require("../services/addressService");

const listAddresses = async (req, res) => {
  try {
    const result = await addressService.getAddress();
    res.json(result);
  } catch (error) {
    console.error("Error getting adresses in database: ", error);
    res.status(500).json("Internal server error.");
  }
};

const addAddresses = async (req, res) => {
  try {
    const result = await addressService.insertAddress(req.body);
    res.status(201).json({ message: "Address added successfully", result });
  } catch (error) {
    console.error("Error adding address in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const changeAddresses = async (req, res) => {
  const { idEndereco } = req.params;
  const body = req.body;

  try {
    const result = await addressService.updateAddresses(idEndereco, body);

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

module.exports = { listAddresses, addAddresses, changeAddresses };
