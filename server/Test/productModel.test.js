const SequelizeMock = require("sequelize-mock");

const DBMock = new SequelizeMock();

const ProductMock = DBMock.define("Product", {
  id: 1,
  name: "Laptop",
  price: 50000,
  category: "electronics",
  rating: 4.5,
  description: "Gaming Laptop",
  image: "laptop.jpg",
  sellerId: 1,
});

describe("Product Model", () => {
  it("should create a product with specified values", async () => {
    const newProductData = {
      name: "New Gaming Mouse",
      price: 3500,
      category: "accessories",
      rating: 4.8,
      description: "A very good gaming mouse",
      image: "mouse.jpg",
      sellerId: 2,
    };
    const product = await ProductMock.create(newProductData);

    expect(product.name).toBe(newProductData.name);
    expect(product.price).toBe(newProductData.price);
    expect(product.category).toBe(newProductData.category);
    expect(product.rating).toBe(newProductData.rating);
    expect(product.sellerId).toBe(newProductData.sellerId);
  });
});
