const { register } = require("../Controller/authController");
const User = require("../Model/userModel").default;

jest.mock("../Model/userModel");

// Helper to mock Express response object
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn();
  return res;
};

describe("Auth Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("should fail because it expects the wrong status code", async () => {
      const req = {
        body: {
          username: "testuser",
          email: "test@example.com",
          password: "password123",
          role: "customer",
        },
      };
      const res = mockRes();

      // We are mocking a successful user creation.
      // The controller should respond with a 201 status.
      User.create.mockResolvedValue({ id: 1, ...req.body });

      await register(req, res);

      // This test will fail because we expect a 500 status, but the controller will send a 201.
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
    });
  });
});