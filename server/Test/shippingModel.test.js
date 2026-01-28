const SequelizeMock = require("sequelize-mock");

// Create a new mock database instance
const DBMock = new SequelizeMock();

// Define a mock for the ShippingAddress model
const ShippingAddressMock = DBMock.define("ShippingAddress", {
  userId: 1,
  fullname: "Bibek Dhami",
  address: "Kathmandu, Nepal",
  phonenumber: "9812345678",
});

describe("ShippingAddress Model", () => {
  it("should create a shipping address with specified values", async () => {
    const newAddressData = {
      userId: 2,
      fullname: "Jane Doe",
      address: "Pokhara, Nepal",
      phonenumber: "9887654321",
    };
    const address = await ShippingAddressMock.create(newAddressData);

    // Check if fields are correct
    expect(address.userId).toBe(newAddressData.userId);
    expect(address.fullname).toBe(newAddressData.fullname);
    expect(address.address).toBe(newAddressData.address);
    expect(address.phonenumber).toBe(newAddressData.phonenumber);
  });
});
