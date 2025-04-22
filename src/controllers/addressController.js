const addressService = require("../services/addressService");

const listAddress = async (req, res) => {
  try {
    const result = await addressService.getAddress();
    res.status(200).json({ message: "Adressess fetched successfully", address: result  });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const addAddress = async (req, res) => {
  try {
    const result = await addressService.insertAddress(req.body);
    res.status(201).json({ message: "Address added successfully", address: result  });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const editAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const result = await addressService.updateAddress(addressId, req.body);
    res.status(200).json({ message: "Address updated successfully", address: result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteAddressController = async (req, res) => {
  const { addressId } = req.params;
  try {
    const result = await addressService.deleteAddress(addressId);
    res.status(200).json({message: "Address deleted successfully", address: result,});
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { listAddress, addAddress, editAddress, deleteAddressController };
