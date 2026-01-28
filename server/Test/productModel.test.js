import SequelizeMock from "sequelize-mock";

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
  it("should create a product", async () => {
    const product = await ProductMock.create({
      name: "Laptop",
      price: 50000,
      category: "electronics",
      rating: 4.5,
      description: "Gaming Laptop",
      image: "laptop.jpg",
      sellerId: 1,
    });

    expect(product.name).toBe("Laptop");
    expect(product.price).toBe(50000);
    expect(product.category).toBe("electronics");
  });
});
