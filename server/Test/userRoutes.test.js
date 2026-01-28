import request from "supertest";
import express from "express";
import userRoutes from "../Routes/userRoutes.js";
import { register } from "../Controller/authController.js";

// Mock the controller module
jest.mock("../Controller/authController.js", () => ({
  // We only need to mock the functions that are used by the routes we are testing
  register: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes); // Assuming your user routes are prefixed with /api/users

describe("User Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/users/register", () => {
    it("should fail by expecting the wrong status code on successful registration", async () => {
      const userData = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      };

      // Mock the controller to simulate a successful registration (sends a 201)
      register.mockImplementation((req, res) => {
        res.status(201).json({ message: "User created", userId: 1 });
      });

      const response = await request(app).post("/api/users/register").send(userData);

      // This assertion will fail because the mock sends 201, but we expect 500.
      expect(response.statusCode).toBe(500);
    });
  });
});