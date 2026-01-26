import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useAPI";
import ShippingSection from "../../components/ShippingSection";
import PaymentMethod from "../../components/PaymentMethod";
import OrderSummary from "../../components/OrderSummary";

const Checkout = () => {
  const { callApi } = useApi();

  const [cartItems, setCartItems] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await callApi("GET", "/api/cart");
        // The data from the cart API is nested. We need to flatten it
        // for the OrderSummary component to work correctly.
        const formattedItems = res.data.map(item => ({
          id: item.id, // Cart Item ID
          productId: item.Product.id,
          productName: item.Product.name,
          price: parseFloat(item.Product.price), // Ensure price is a number
          quantity: item.quantity,
        }));
        setCartItems(formattedItems);
      } catch (err) {
        setError("Please login again to continue checkout.");
        console.error("Failed to fetch cart items:", err.message);
      }
    };

    fetchCartItems();
  }, [callApi]);

  if (error) {
    return (
      <div className="text-center mt-20 text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <ShippingSection
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />

        <PaymentMethod
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
      </div>

      <OrderSummary
        cartItems={cartItems}
        selectedAddress={selectedAddress}
        paymentMethod={paymentMethod}
      />
    </div>
  );
};

export default Checkout;
