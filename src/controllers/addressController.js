const addressService = require("../services/addressService");

const createAddressController = async (req, res) => {
  try {
    const { numeroPorta, distrito, freguesia, codigoPostal, rua } = req.body;
    if (!numeroPorta || !distrito || !freguesia || !codigoPostal || !rua) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const result = await addressService.createAddress(req.body);
    res
      .status(201)
      .json({ message: "Address added successfully", address: result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateAddressController = async (req, res) => {
  const { addressId } = req.params;
  const userType = req.user.idTipoUtilizador;
  try {
    if (userType !== 1) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }
    await addressService.updateAddress(addressId, req.body);
    res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteAddressController = async (req, res) => {
  const { addressId } = req.params;
  const userType = req.user.idTipoUtilizador;
  try {
    if (userType !== 1) {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }
    await addressService.deleteAddress(addressId);
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllAddressesController = async (req, res) => {
  try {
    const addresses = await addressService.findAllAddresses(); // Ou o nome que você deu à sua função no serviço

    if (!addresses || addresses.length === 0) {
      return res.status(200).json([]); // Retorna um array vazio se não houver endereços
    }

    res.status(200).json(addresses);

  } catch (error) {
    console.error("Erro no getAllAddressesController:", error);

    res.status(500).json({ message: "Erro ao buscar endereços no servidor." });
  }
};

module.exports = {
  createAddressController,
  updateAddressController,
  deleteAddressController,
  getAllAddressesController,
};
