import { ShippingAddress } from "../Model/ShippingAddress.js";

// Get all addresses
export const getShippingAddresses = async (req, res) => {
  try {
    const addresses = await ShippingAddress.findAll();
    res.json(addresses.map(addr => addr.toJSON()));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getShippingAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await ShippingAddress.findByPk(id);
    if (!address) return res.status(404).json({ message: "Address not found" });
    res.json(address.toJSON());
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create new address
export const createShippingAddress = async (req, res) => {
  try {
    const { fullname, address, phonenumber } = req.body;
    const newAddress = await ShippingAddress.create({ fullname, address, phonenumber });
    res.status(201).json(newAddress.toJSON());
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update address
export const updateShippingAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await ShippingAddress.findByPk(id);
    if (!address) return res.status(404).json({ message: "Address not found" });

    await address.update({
      fullname: req.body.fullname || address.fullname,
      address: req.body.address || address.address,
      phonenumber: req.body.phonenumber || address.phonenumber,
    });

    res.json(address.toJSON());
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete address
export const deleteShippingAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await ShippingAddress.findByPk(id);
    if (!address) return res.status(404).json({ message: "Address not found" });

    await address.destroy();
    res.json({ message: "Address deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
