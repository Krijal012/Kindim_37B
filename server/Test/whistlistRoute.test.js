import request from "supertest";
import express from "express";
import { wishlistRouter } from "../Routes/wishlistRoutes.js";



// setup express app
const app = express();
app.use(express.json());
app.use("/wishlist", wishlistRouter);

// mock auth middleware
jest.mock("../Middleware/authMiddleware.js", () => ({
  verifyTokenMiddleware: (req, res, next) => {
    req.user = { id: 1 }; // mock logged-in user
    next();
  },
}));

// mock models
import Wishlist from "../Model/wishlistModel.js";
import Product from "../Model/productModel.js";

jest.mock("../Model/wishlistModel.js");
jest.mock("../Model/productModel.js");

describe("Wishlist API Endpoints", () => {
  afterEach(() => jest.clearAllMocks());

  describe("GET /wishlist", () => {
    it("should get wishlist items for user", async () => {
      const wishlistItems = [
        { id: 1, userId: 1, productId: 2 },
      ];

      Wishlist.findAll.mockResolvedValue(wishlistItems);

      const res = await request(app).get("/wishlist");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(wishlistItems);
      expect(Wishlist.findAll).toHaveBeenCalledWith({
        where: { userId: 1 },
        include: [{ model: Product }],
      });
    });

    it("should return 500 on server error", async () => {
      Wishlist.findAll.mockRejectedValue(new Error("DB error"));

      const res = await request(app).get("/wishlist");

      expect(res.statusCode).toBe(500);
      expect(res.body.message).toBe("DB error");
    });
  });

  describe("POST /wishlist", () => {
    it("should add product to wishlist", async () => {
      Wishlist.findOne.mockResolvedValue(null);

      const wishlistItem = { id: 1, userId: 1, productId: 2 };
      Wishlist.create.mockResolvedValue(wishlistItem);

      const res = await request(app)
        .post("/wishlist")
        .send({ productId: 2 });

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("Product added to wishlist");
      expect(res.body.data.wishlistItem).toEqual(wishlistItem);
    });

    it("should return 400 if product already in wishlist", async () => {
      Wishlist.findOne.mockResolvedValue({ id: 1 });

      const res = await request(app)
        .post("/wishlist")
        .send({ productId: 2 });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Product already in wishlist");
    });
  });

  describe("DELETE /wishlist/:id", () => {
    it("should remove item from wishlist", async () => {
      const wishlistItem = {
        destroy: jest.fn().mockResolvedValue(true),
      };

      Wishlist.findOne.mockResolvedValue(wishlistItem);

      const res = await request(app).delete("/wishlist/1");

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Product removed from wishlist");
      expect(wishlistItem.destroy).toHaveBeenCalled();
    });

    it("should return 404 if wishlist item not found", async () => {
      Wishlist.findOne.mockResolvedValue(null);

      const res = await request(app).delete("/wishlist/99");

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe("Wishlist item not found");
    });
  });

  describe("DELETE /wishlist/clear/all", () => {
    it("should clear wishlist for user", async () => {
      Wishlist.destroy.mockResolvedValue(true);

      const res = await request(app).delete("/wishlist/clear/all");

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Wishlist cleared");
      expect(Wishlist.destroy).toHaveBeenCalledWith({
        where: { userId: 1 },
      });
    });
  });
});
