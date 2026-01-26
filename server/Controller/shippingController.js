import { ShippingAddress } from "../Model/ShippingAddress.js";

export const getShippingAddresses = async (req, res) => {
  try {
    const userId = req.user.id;
    const addresses = await ShippingAddress.findAll({ where: { userId } });
    res.json({ data: addresses }); // Changed to return data wrapper
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getShippingAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const address = await ShippingAddress.findOne({ where: { id, userId } });
    if (!address) return res.status(404).json({ message: "Address not found" });
    res.json({ data: address }); // Changed to return data wrapper
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createShippingAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullname, address, phonenumber } = req.body;
    const newAddress = await ShippingAddress.create({ userId, fullname, address, phonenumber });
    res.status(201).json({ data: newAddress }); // Changed to return data wrapper
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateShippingAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const address = await ShippingAddress.findOne({ where: { id, userId } });
    if (!address) return res.status(404).json({ message: "Address not found" });

    await address.update({
      fullname: req.body.fullname || address.fullname,
      address: req.body.address || address.address,
      phonenumber: req.body.phonenumber || address.phonenumber,
    });

    res.json({ data: address }); // Changed to return data wrapper
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteShippingAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const address = await ShippingAddress.findOne({ where: { id, userId } });
    if (!address) return res.status(404).json({ message: "Address not found" });

    await address.destroy();
    res.json({ message: "Address deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};