import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../hooks/useAPI";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ShippingSection from "../../components/ShippingSection";
import PaymentMethod from "../../components/PaymentMethod";
import OrderSummary from "../../components/OrderSummary";

const Checkout = ({ onLogout }) => {
  const navigate = useNavigate();
  const { callApi, loading } = useApi();

  const [cartItems, setCartItems] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login to continue");
        navigate("/login");
        return;
      }

      const res = await callApi("GET", "/api/cart");
      const items = res.data || res;

      if (!items || items.length === 0) {
        toast.info("Your cart is empty");
        navigate("/cart");
        return;
      }

      const formattedItems = items.map(item => ({
        id: item.id,
        productId: item.Product?.id || item.productId,
        productName: item.Product?.name || item.productName,
        price: parseFloat(item.Product?.price || item.price),
        quantity: item.quantity,
      }));

      setCartItems(formattedItems);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      toast.error("Failed to load cart items");
      navigate("/cart");
    }
  };

  if (loading) {
    return (
      <>
        <Header onLogout={onLogout} />
        <main className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading checkout...</p>
          </div>
        </main>
        <Footer />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          theme="light"
        />
      </>
    );
  }

  return (
    <>
      <Header onLogout={onLogout} />
      <main className="min-h-screen bg-gray-50 pt-16 sm:pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Shipping & Payment */}
            <div className="lg:col-span-2 space-y-6">
              <ShippingSection
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
              />

              <PaymentMethod
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary
                cartItems={cartItems}
                selectedAddress={selectedAddress}
                paymentMethod={paymentMethod}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Checkout;