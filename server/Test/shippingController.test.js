import { 
  getShippingAddresses,
  getShippingAddressById,
  createShippingAddress,
  updateShippingAddress,
  deleteShippingAddress
} from "../Controller/shippingAddressController.js";

import { ShippingAddress } from "../Model/ShippingAddress.js";

jest.mock("../Model/ShippingAddress.js");

// Helper to mock res object
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn();
  return res;
};

describe("ShippingAddress Controller", () => {
  afterEach(() => jest.clearAllMocks());

  it("should get all shipping addresses for a user", async () => {
    const req = { user: { id: 1 } };
    const res = mockRes();

    const addresses = [{ id: 1, fullname: "Bibek" }];
    ShippingAddress.findAll.mockResolvedValue(addresses);

    await getShippingAddresses(req, res);

    expect(ShippingAddress.findAll).toHaveBeenCalledWith({ where: { userId: 1 } });
    expect(res.json).toHaveBeenCalledWith({ data: addresses });
  });

  it("should get a shipping address by ID", async () => {
    const req = { user: { id: 1 }, params: { id: 1 } };
    const res = mockRes();

    const address = { id: 1, fullname: "Bibek" };
    ShippingAddress.findOne.mockResolvedValue(address);

    await getShippingAddressById(req, res);

    expect(ShippingAddress.findOne).toHaveBeenCalledWith({ where: { id: 1, userId: 1 } });
    expect(res.json).toHaveBeenCalledWith({ data: address });
  });

  it("should return 404 if shipping address not found", async () => {
    const req = { user: { id: 1 }, params: { id: 99 } };
    const res = mockRes();

    ShippingAddress.findOne.mockResolvedValue(null);

    await getShippingAddressById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Address not found" });
  });

  it("should create a shipping address", async () => {
    const req = {
      user: { id: 1 },
      body: { fullname: "Bibek", address: "Kathmandu", phonenumber: "9812345678" },
    };
    const res = mockRes();

    const newAddress = { id: 1, ...req.body };
    ShippingAddress.create.mockResolvedValue(newAddress);

    await createShippingAddress(req, res);

    expect(ShippingAddress.create).toHaveBeenCalledWith({ userId: 1, ...req.body });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ data: newAddress });
  });

  it("should update a shipping address", async () => {
    const req = {
      user: { id: 1 },
      params: { id: 1 },
      body: { fullname: "Bibek Updated" },
    };
    const res = mockRes();

    const address = {
      id: 1,
      fullname: "Bibek",
      address: "Kathmandu",
      phonenumber: "9812345678",
      update: jest.fn().mockResolvedValue(true),
    };

    ShippingAddress.findOne.mockResolvedValue(address);

    await updateShippingAddress(req, res);

    expect(address.update).toHaveBeenCalledWith({
      fullname: "Bibek Updated",
      address: "Kathmandu",
      phonenumber: "9812345678",
    });
    expect(res.json).toHaveBeenCalledWith({ data: address });
  });

  it("should delete a shipping address", async () => {
    const req = { user: { id: 1 }, params: { id: 1 } };
    const res = mockRes();

    const address = { destroy: jest.fn().mockResolvedValue(true) };
    ShippingAddress.findOne.mockResolvedValue(address);

    await deleteShippingAddress(req, res);

    expect(address.destroy).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ message: "Address deleted successfully" });
  });

  it("should return 404 when deleting non-existent address", async () => {
    const req = { user: { id: 1 }, params: { id: 99 } };
    const res = mockRes();

    ShippingAddress.findOne.mockResolvedValue(null);

    await deleteShippingAddress(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Address not found" });
  });
});
