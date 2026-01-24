import { useEffect, useState } from "react";
import ShippingSection from "../../components/ShippingSection";
import OrderSummary from "../../components/OrderSummary";
import PaymentMethod from "../../components/PaymentMethod";
import { apiRequest } from "../../utils/api";

const Checkout = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    const res = await apiRequest("get", "/cart");

    const formatted = res.data.map((item) => ({
      id: item.id,
      name: item.Product.name,
      price: item.Product.price,
      quantity: item.quantity,
    }));

    setCartItems(formatted);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 overflow-y-auto flex justify-center">
        <div className="w-[1200px] px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>

          <div className="flex gap-12">
            <ShippingSection
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />

            <div className="w-[320px] self-start space-y-6">
              <OrderSummary
                cartItems={cartItems}
                selectedAddress={selectedAddress}
                paymentMethod={paymentMethod}
              />

              <PaymentMethod
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
