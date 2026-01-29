import { getAdminStats } from "../Controller/adminController";
import Users from "../Model/userModel.js";
import { Order } from "../Model/Order.js";
jest.mock("../Model/userModel.js");
jest.mock("../Model/Order.js");
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn();
  return res;
};

describe("Admin Controller", () => {
  afterEach(() => jest.clearAllMocks());
    it("should retrieve admin stats", async () => {
        const req = {};
        const res = mockRes();
        Users.count
        .mockResolvedValueOnce(100) // totalUsers
        .mockResolvedValueOnce(20); // totalSellers
        Order.count.mockResolvedValue(150);
        Order.sum.mockResolvedValue(500000);
        await getAdminStats(req, res);
        expect(Users.count).toHaveBeenCalledTimes(2);
        expect(Order.count).toHaveBeenCalled();
        expect(Order.sum).toHaveBeenCalledWith("totalPrice");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Stats retrieved successfully",
            data: {
                totalUsers: 100,
                totalOrders: 150,
                revenue: 500000,
                totalSellers: 20
            }
        });
    });
    it("should handle errors", async () => {
        const req = {};
        const res = mockRes();  
        const errorMessage = "Database error";
        Users.count.mockRejectedValue(new Error(errorMessage));
        await getAdminStats(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    }
);
});
    it("should handle null revenue", async () => {
        const req = {}; 
        const res = mockRes();
        Users.count
        .mockResolvedValueOnce(50) // totalUsers
        .mockResolvedValueOnce(10);
        Order.count.mockResolvedValue(75);
        Order.sum.mockResolvedValue(null);
        await getAdminStats(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Stats retrieved successfully",
            data: {
                totalUsers: 50, 
                totalOrders: 75,
                revenue: 0,
                totalSellers: 10
            }
        });
    });
