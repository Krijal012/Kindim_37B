import request from "supertest";
import express from "express";
import shippingRoutes from "../Routes/shippingRoutes.js";

// Setup express app
const app = express();
app.use(express.json());
app.use("/shipping", shippingRoutes);

// Mock auth middleware
jest.mock("../Middleware/authMiddleware.js", () => ({
  verifyTokenMiddleware: (req, res, next) => {
    req.user = { id: 1 }; // Mock logged-in user
    next();
  },
}));

// Mock ShippingAddress model
import { ShippingAddress } from "../Model/ShippingAddress.js";
jest.mock("../Model/ShippingAddress.js");

describe("ShippingAddress API Endpoints", () => {
  afterEach(() => jest.clearAllMocks());

  describe("GET /shipping", () => {
    it("should get all shipping addresses for the user", async () => {
      const mockAddresses = [{ id: 1, fullname: "Bibek", userId: 1 }];
      ShippingAddress.findAll.mockResolvedValue(mockAddresses);

      const res = await request(app).get("/shipping");

      expect(res.statusCode).toBe(200);
      expect(res.body.data).toEqual(mockAddresses);
      expect(ShippingAddress.findAll).toHaveBeenCalledWith({ where: { userId: 1 } });
    });

    it("should return 500 if there is a server error", async () => {
      ShippingAddress.findAll.mockRejectedValue(new Error("Database error"));

      const res = await request(app).get("/shipping");

      expect(res.statusCode).toBe(500);
      expect(res.body.message).toBe("Failed to fetch addresses");
    });
  });

  describe("GET /shipping/:id", () => {
    it("should get a shipping address by ID", async () => {
      const mockAddress = { id: 1, fullname: "Bibek", userId: 1 };
      ShippingAddress.findOne.mockResolvedValue(mockAddress);

      const res = await request(app).get("/shipping/1");

      expect(res.statusCode).toBe(200);
      expect(res.body.data).toEqual(mockAddress);
      expect(ShippingAddress.findOne).toHaveBeenCalledWith({ where: { id: "1", userId: 1 } });
    });

    it("should return 404 for a non-existent shipping address", async () => {
      ShippingAddress.findOne.mockResolvedValue(null);

      const res = await request(app).get("/shipping/99");

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe("Address not found");
    });
  });

  describe("POST /shipping", () => {
    it("should create a new shipping address", async () => {
      const newAddressPayload = { fullname: "Bibek", address: "Kathmandu", phonenumber: "9812345678" };
      const createdAddress = { id: 1, userId: 1, ...newAddressPayload };
      ShippingAddress.create.mockResolvedValue(createdAddress);

      const res = await request(app)
        .post("/shipping")
        .send(newAddressPayload);

      expect(res.statusCode).toBe(201);
      expect(res.body.data).toEqual(createdAddress);
      expect(ShippingAddress.create).toHaveBeenCalledWith({ userId: 1, ...newAddressPayload });
    });

    it("should return 400 if required fields are missing", async () => {
      const res = await request(app)
        .post("/shipping")
        .send({ fullname: "Bibek" }); // Missing address and phonenumber

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe("Fullname, address, and phonenumber are required");
    });
  });

  describe("PUT /shipping/:id", () => {
    it("should update an existing shipping address", async () => {
      const updatePayload = { fullname: "Bibek Updated" };
      const mockAddressInstance = {
        id: 1,
        fullname: "Bibek",
        address: "Kathmandu",
        phonenumber: "9812345678",
        update: jest.fn(),
      };
      mockAddressInstance.update.mockImplementation(function (payload) {
        Object.assign(this, payload);
        return Promise.resolve(this);
      });
      ShippingAddress.findOne.mockResolvedValue(mockAddressInstance);

      const res = await request(app)
        .put("/shipping/1")
        .send(updatePayload);

      expect(res.statusCode).toBe(200);
      expect(mockAddressInstance.update).toHaveBeenCalledWith(updatePayload);
      expect(res.body.data).toEqual({
        id: 1,
        fullname: "Bibek Updated",
        address: "Kathmandu",
        phonenumber: "9812345678",
      });
    });

    it("should return 404 when trying to update a non-existent address", async () => {
      ShippingAddress.findOne.mockResolvedValue(null);

      const res = await request(app)
        .put("/shipping/99")
        .send({ fullname: "Does not matter" });

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe("Address not found");
    });
  });

  describe("DELETE /shipping/:id", () => {
    it("should delete a shipping address", async () => {
      const mockAddressInstance = { destroy: jest.fn().mockResolvedValue(true) };
      ShippingAddress.findOne.mockResolvedValue(mockAddressInstance);

      const res = await request(app).delete("/shipping/1");

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Address deleted successfully");
      expect(mockAddressInstance.destroy).toHaveBeenCalled();
    });
  });
});
