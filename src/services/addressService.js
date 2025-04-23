const { Endereco } = require("../models/associations");
  
  const getAddress = async () => {
    try {
      const address = await Endereco.findAll();
      return address;
    } catch (error) {
      console.error("Error getting address in database:", error);
      throw error;
    }
  };
  
  const insertAddress = async (body) => {
    try {
      const address = await Endereco.create(body);
      return address;
    } catch (error) {
      console.error("Error adding address in database:", error);
      throw error;
    }
  };
  
  const updateAddress = async (addressId, body) => {
    try {
      const [updatedRows] = await Endereco.update(body, {
        where: { idEndereco: addressId },
      });
  
      if (updatedRows === 0) {
        throw new Error(`User with Id ${addressId} not found.`);
      }
  
      const updatedAddress = await Endereco.findOne({
        where: { idEndereco: addressId },
      });
  
      return updatedAddress;
    } catch (error) {
      console.error("Error updating address in database:", error);
      throw error;
    }
  };
  
  const deleteAddress = async (addressId) => {
    try {
      const deleted = await Endereco.destroy({ where: { idEndereco: addressId } });
      return deleted;
    } catch (error) {
      console.error("Error deleting address in database:", error);
      throw error;
    }
  };
  
  module.exports = { getAddress, insertAddress, updateAddress, deleteAddress};
  