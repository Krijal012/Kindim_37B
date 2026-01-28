import request from "supertest";
import express from "express";
import productRoutes from "../Routes/productRoutes.js";

const app = express();
app.use(express.json());
app.use("/products", productRoutes);

jest.mock("../Middleware/authMiddleware.js", () => ({
  verifyTokenMiddleware: (req, res, next) => {
    req.userId = 1;
    next();
  },
  optionalVerifyTokenMiddleware: (req, res, next) => next(),
}));

jest.mock("../Middleware/upload.js", () => ({
  single: () => (req, res, next) => next(),
}));

describe("Product API Endpoints", () => {
  it("GET all products", async () => {
    const res = await request(app).get("/products");
    expect(res.statusCode).toBe(200);
  });

  it("GET product by ID", async () => {
    const res = await request(app).get("/products/1");
    expect([200, 404]).toContain(res.statusCode);
  });

  it("POST create product", async () => {
    const res = await request(app)
      .post("/products")
      .send({
        name: "Tablet",
        price: 30000,
        category: "electronics",
      });

    expect([201, 400]).toContain(res.statusCode);
  });

  it("DELETE product", async () => {
    const res = await request(app).delete("/products/1");
    expect([200, 404]).toContain(res.statusCode);
  });
});
