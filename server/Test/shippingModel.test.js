import SequelizeMock from "sequelize-mock";

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
  it("should create a shipping address", async () => {
    const address = await ShippingAddressMock.create({
      userId: 1,
      fullname: "Bibek Dhami",
      address: "Kathmandu, Nepal",
      phonenumber: "9812345678",
    });

    // Check if fields are correct
    expect(address.userId).toBe(1);
    expect(address.fullname).toBe("Bibek Dhami");
    expect(address.address).toBe("Kathmandu, Nepal");
    expect(address.phonenumber).toBe("9812345678");
  });
});
