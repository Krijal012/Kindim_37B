import {
  getWishlistItems,
  addToWishlist,
  removeFromWishlist,
  clearWishlist
} from "../Controller/wishlistController.js";

import Wishlist from "../Model/wishlistModel.js";
import Product from "../Model/productModel.js";

jest.mock("../Model/wishlistModel.js");
jest.mock("../Model/productModel.js");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn();
  return res;
};

describe("Wishlist Controller", () => {
  afterEach(() => jest.clearAllMocks());

  it("should get wishlist items for a user", async () => {
    const req = { user: { id: 1 } };
    const res = mockRes();

    const wishlistItems = [{ id: 1, userId: 1, productId: 2 }];
    Wishlist.findAll.mockResolvedValue(wishlistItems);

    await getWishlistItems(req, res);

    expect(Wishlist.findAll).toHaveBeenCalledWith({
      where: { userId: 1 },
      include: [{ model: Product }],
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(wishlistItems);
  });

  it("should add item to wishlist", async () => {
    const req = {
      user: { id: 1 },
      body: { productId: 2 },
    };
    const res = mockRes();

    Wishlist.findOne.mockResolvedValue(null);

    const wishlistItem = { id: 1, userId: 1, productId: 2 };
    Wishlist.create.mockResolvedValue(wishlistItem);

    await addToWishlist(req, res);

    expect(Wishlist.create).toHaveBeenCalledWith({
      userId: 1,
      productId: 2,
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Product added to wishlist",
      data: { wishlistItem },
    });
  });

  it("should not add duplicate wishlist item", async () => {
    const req = {
      user: { id: 1 },
      body: { productId: 2 },
    };
    const res = mockRes();

    Wishlist.findOne.mockResolvedValue({ id: 1 });

    await addToWishlist(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Product already in wishlist",
    });
  });

  it("should remove item from wishlist", async () => {
    const req = {
      user: { id: 1 },
      params: { id: 1 },
    };
    const res = mockRes();

    const item = {
      destroy: jest.fn().mockResolvedValue(true),
    };

    Wishlist.findOne.mockResolvedValue(item);

    await removeFromWishlist(req, res);

    expect(item.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Product removed from wishlist",
    });
  });

  it("should return 404 if wishlist item not found", async () => {
    const req = {
      user: { id: 1 },
      params: { id: 99 },
    };
    const res = mockRes();

    Wishlist.findOne.mockResolvedValue(null);

    await removeFromWishlist(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Wishlist item not found",
    });
  });

  it("should clear wishlist", async () => {
    const req = { user: { id: 1 } };
    const res = mockRes();

    Wishlist.destroy.mockResolvedValue(true);

    await clearWishlist(req, res);

    expect(Wishlist.destroy).toHaveBeenCalledWith({
      where: { userId: 1 },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Wishlist cleared",
    });
  });
});
