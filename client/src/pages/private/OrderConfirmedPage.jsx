import OrderSummary from "../../components/OrderSummary";
import { OrderItem } from "../../components/OrderItem";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OrderConfirmedPage() {
  const orderItems = [
    { id: 1, name: 'Product Name', price: 'Price', qty: 1, image: '' },
    { id: 2, name: 'Product Name', price: 'Price', qty: 1, image: '' },
  ];

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-100 pt-24 pb-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Order Confirmed!</h1>
        <p className="text-center text-gray-600 mb-8">
          Thank you for your purchase. Your order has been successfully placed and is being processed.
        </p>

        <OrderSummary 
          estimatedDelivery="12PM"
          totalPaid="Price"
        />

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Order Details:</h2>
          <div className="space-y-3">
            {orderItems.map(item => (
              <OrderItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 px-6 py-3 bg-[#1A73E8] text-white font-semibold rounded-lg hover:bg-[#1557b0] transition">
            Track Order
          </button>
          <button className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
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

export default OrderConfirmedPage;