import request from "supertest";
import express from "express";
import adminRoutes from "../Routes/adminRoutes.js";

const app = express();
app.use(express.json());
app.use("/admin", adminRoutes);

jest.mock("../Middleware/authMiddleware.js", () => ({
  verifyTokenMiddleware: (req, res, next) => {
    req.user = { id: 1, role: "admin" }; // Mocked admin user
    next();
  },
}));

describe("Admin API Endpoints", () => {
  describe("GET /admin/stats", () => {
    it("should get admin stats for admin user", async () => {
      const res = await request(app).get("/admin/stats"); 
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("totalUsers");
      expect(res.body).toHaveProperty("totalOrders");
      expect(res.body).toHaveProperty("totalRevenue");
    }
    );

    it("should deny access for non-admin user", async () => {
      // Override the mock to simulate a non-admin user
      jest.spyOn(require("../Middleware/authMiddleware.js"), "verifyTokenMiddleware").mockImplementation((req, res, next) => {
        req.user = { id: 2, role: "user" }; // Mocked non-admin user
        next();
      });
      const res = await request(app).get("/admin/stats");
      expect(res.statusCode).toBe(403);
      expect(res.body.message).toBe("Access denied. Admin only.");
    }
    );
  });
});