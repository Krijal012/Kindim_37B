import { useState, useEffect } from "react";
import { apiRequest } from "../../utils/api";

const features = [
  "Price",
  "Brand",
  "Screen Size",
  "RAM",
  "Storage",
  "Battery Life",
  "Operating System",
  "Water Resistance",
  "Wireless Charging",
  "Warranty",
  "Included Accessories",
];

const ProductComparison = () => {
  const [allProducts, setAllProducts] = useState([]); 
  const [compareProducts, setCompareProducts] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await apiRequest("get", "/products");
        setAllProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);


  const handleAddProduct = () => {
    const productToAdd = allProducts.find(
      (p) => p.name.toLowerCase() === searchTerm.toLowerCase()
    );

    if (!productToAdd) {
      alert("Product not found!");
      return;
    }

    if (compareProducts.find((p) => p.id === productToAdd.id)) {
      alert("Product already in comparison!");
      return;
    }

    if (compareProducts.length >= 3) {
      alert("You can compare up to 3 products at a time!");
      return;
    }

    setCompareProducts([...compareProducts, productToAdd]);
    setSearchTerm("");
  };

  // Remove product from comparison
  const handleRemoveProduct = (id) => {
    setCompareProducts(compareProducts.filter((p) => p.id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Product Comparison</h1>
      <p className="mb-6 text-gray-600">
        Compare features, specifications, and prices of your favorite products side-by-side.
      </p>

   
      <div className="flex gap-6 mb-6">
        <input
          type="text"
          placeholder="Enter product name..."
          className="border p-2 rounded flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleAddProduct}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>


      {compareProducts.length === 0 ? (
        <p className="text-gray-500">No products selected for comparison.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Features</th>
                {compareProducts.map((product) => (
                  <th key={product.id} className="border p-2 text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-300"></div>
                      {product.name}
                      <button
                        onClick={() => handleRemoveProduct(product.id)}
                        className="ml-2 text-red-500 font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, fIndex) => (
                <tr key={fIndex}>
                  <td className="border p-2 font-semibold">{feature}</td>
                  {compareProducts.map((product) => (
                    <td
                      key={`${product.id}-${fIndex}`}
                      className="border p-2 text-gray-700"
                    >
                      {product[feature.toLowerCase().replace(/ /g, "_")] || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductComparison;
