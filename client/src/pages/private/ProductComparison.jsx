// src/components/ProductComparison.jsx
import { useState } from "react";

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
  "Included Accessories"
];

const ProductComparison = ({ products }) => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Product Comparison</h1>
      <p className="mb-6 text-gray-600">
        Compare features, specifications, and prices of your favorite products side-by-side to make an informed decision.
      </p>

      <div className="flex gap-6 mb-4">
        <input
          type="text"
          placeholder="Search for product to add..."
          className="border p-2 rounded flex-1"
        />
        <button className="bg-black text-white px-4 py-2 rounded">Add Product</button>
      </div>

      <div className="grid grid-cols-[200px_repeat(3,1fr)] gap-4">
        <div className="font-bold">Features</div>
        {products.map((product, index) => (
          <div key={index} className="font-bold flex items-center gap-2">
            <div className="w-12 h-12 bg-gray-300"></div>
            {product.name}
          </div>
        ))}

        {features.map((feature, fIndex) => (
          <div key={fIndex} className="font-semibold">{feature}</div>
        ))}
        {products.map((product, pIndex) =>
          features.map((feature, fIndex) => (
            <div key={`${pIndex}-${fIndex}`} className="text-gray-700">
              {product[feature.toLowerCase().replace(/ /g, "_")] || "-"}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductComparison;
