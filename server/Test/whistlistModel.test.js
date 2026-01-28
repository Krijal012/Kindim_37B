import SequelizeMock from "sequelize-mock";
// wishlistController.test.js
import { jest } from '@jest/globals';


const DBMock = new SequelizeMock();

// Define Wishlist mock model
const WishlistMock = DBMock.define("Wishlist", {
  id: 1,
  userId: 10,
  productId: 5,
});

describe("Wishlist Model", () => {
  it("should create a wishlist item", async () => {
    const wishlist = await WishlistMock.create({
      userId: 10,
      productId: 5,
    });

    expect(wishlist).toBeDefined();
    expect(wishlist.userId).toBe(10);
    expect(wishlist.productId).toBe(5);
  });

  it("should allow creating wishlist without fields (mock behavior)", async () => {
    const wishlist = await WishlistMock.create({});

    expect(wishlist).toBeDefined();
  });

  it("should have an auto-generated id", async () => {
    const wishlist = await WishlistMock.create({
      userId: 1,
      productId: 2,
    });

    expect(wishlist.id).toBeDefined();
  });
});
