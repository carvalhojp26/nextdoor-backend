const { Endereco } = require("../models/association/associations");
  
  const getAddress = async () => {
    try {
      const address = await Endereco.findAll();
      return address;
    } catch (error) {
      console.error("Error getting address in database:", error);
      throw error;
    }
  };
  
  const createAddress = async (body) => {
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
      return updatedRows;
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
  
  module.exports = { getAddress, createAddress, updateAddress, deleteAddress};
  