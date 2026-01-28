import {
  getAllProducts,
  getProductById,
  createProduct,
} from "../Controller/productController.js";

import Product from "../Model/productModel.js";

jest.mock("../Model/productModel.js");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn();
  return res;
};

describe("Product Controller", () => {
  afterEach(() => jest.clearAllMocks());

  it("should create a product", async () => {
    const req = {
      body: {
        name: "Phone",
        price: 20000,
        category: "electronics",
        description: "Smart Phone",
      },
      userId: 1,
      file: { filename: "phone.jpg" },
    };

    const res = mockRes();

    Product.create.mockResolvedValue(req.body);

    await createProduct(req, res);

    expect(Product.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("should retrieve all products", async () => {
    const req = { query: {} };
    const res = mockRes();

    Product.findAll.mockResolvedValue([{ name: "Laptop" }]);

    await getAllProducts(req, res);

    expect(Product.findAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
  });

  it("should handle non-existent product", async () => {
    const req = { params: { id: 99 } };
    const res = mockRes();

    Product.findByPk.mockResolvedValue(null);

    await getProductById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});
