const addressService = require("../services/addressService");

const getAddressController = async (req, res) => {
  try {
    const result = await addressService.getAddress();
    res.status(200).json({ message: "Adressess fetched successfully", address: result  });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createAddressController = async (req, res) => {
  try {
    const result = await addressService.createAddress(req.body);
    res.status(201).json({ message: "Address added successfully", address: result  });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateAddressController = async (req, res) => {
  try {
    const { addressId } = req.params;
    await addressService.updateAddress(addressId, req.body);
    res.status(200).json({ message: "Address updated successfully"});
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteAddressController = async (req, res) => {
  const { addressId } = req.params;
  try {
    await addressService.deleteAddress(addressId);
    res.status(200).json({message: "Address deleted successfully"});
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getAddressController, createAddressController, updateAddressController, deleteAddressController };
