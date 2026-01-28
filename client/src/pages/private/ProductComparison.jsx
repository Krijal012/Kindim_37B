import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const features = [
  "name",
  "price",
  "category",
  "description",
  "rating",
];

const ProductComparison = () => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [compareProducts, setCompareProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (response.ok) {
          const data = await response.json();
          setAllProducts(data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts([]);
      setShowDropdown(false);
      return;
    }

    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setShowDropdown(true);
  }, [searchTerm, allProducts]);

  // Scroll logic for header/footer
  useEffect(() => {
    function handleScroll() {
      const currentScroll = window.scrollY;
      setShowHeader(currentScroll < lastScrollY);
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      setShowFooter(atBottom);
      setLastScrollY(currentScroll);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleSelectProduct = (product) => {
    if (compareProducts.find((p) => p.id === product.id)) {
      alert("Product already in comparison!");
      return;
    }

    if (compareProducts.length >= 3) {
      alert("You can compare up to 3 products at a time!");
      return;
    }

    setCompareProducts([...compareProducts, product]);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const handleRemoveProduct = (id) => {
    setCompareProducts(compareProducts.filter((p) => p.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header show={showHeader} onLogout={handleLogout} hideSearch={false} />

      <main className="mt-[80px] sm:mt-[112px] px-4 sm:px-6 py-4 sm:py-8 pb-32 bg-white min-h-screen">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-4 text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 text-sm sm:text-base"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Dashboard
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Product Comparison</h1>
        <p className="mb-6 sm:mb-8 text-gray-600 text-sm sm:text-base">
          Compare features, specifications, and prices of your favorite products side-by-side.
        </p>

        {/* Search and Add Product */}
        <div className="relative mb-8">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search for a product to add..."
                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => searchTerm && setShowDropdown(true)}
              />

              {/* Dropdown with filtered products */}
              {showDropdown && filteredProducts.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto z-10">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product)}
                      className="p-4 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                          {product.image && (
                            <img
                              src={`http://localhost:5000/uploads/${product.image}`}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.category}</p>
                          <p className="text-sm font-bold text-blue-600 mt-1">Rs. {product.price}</p>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showDropdown && filteredProducts.length === 0 && searchTerm && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10">
                  <p className="text-gray-500 text-center">No products found</p>
                </div>
              )}
            </div>
          </div>

          {/* Selected Products Preview */}
          {compareProducts.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Selected Products ({compareProducts.length}/3):
              </p>
              <div className="flex gap-3 flex-wrap">
                {compareProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-300"
                  >
                    <div className="w-8 h-8 bg-gray-200 rounded overflow-hidden">
                      {product.image && (
                        <img
                          src={`http://localhost:5000/uploads/${product.image}`}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-800">{product.name}</span>
                    <button
                      onClick={() => handleRemoveProduct(product.id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Comparison Table */}
        {compareProducts.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <p className="text-gray-500 text-lg">No products selected for comparison.</p>
            <p className="text-gray-400 text-sm mt-2">Search and add up to 3 products to compare</p>
          </div>
        ) : (
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="table-auto border-collapse border border-gray-300 w-full bg-white">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <th className="border border-gray-300 p-4 text-left font-semibold">Features</th>
                  {compareProducts.map((product) => (
                    <th key={product.id} className="border border-gray-300 p-4 text-left min-w-[250px]">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                            {product.image && (
                              <img
                                src={`http://localhost:5000/uploads/${product.image}`}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-base">{product.name}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveProduct(product.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold transition-colors"
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
                  <tr key={fIndex} className={fIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="border border-gray-300 p-4 font-semibold text-gray-700 capitalize">
                      {feature.replace(/_/g, " ")}
                    </td>
                    {compareProducts.map((product) => (
                      <td
                        key={`${product.id}-${fIndex}`}
                        className="border border-gray-300 p-4 text-gray-700"
                      >
                        {feature === "price"
                          ? `Rs. ${product[feature] || "-"}`
                          : product[feature] || "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <Footer show={showFooter} />
    </div>
  );
};

export default ProductComparison;