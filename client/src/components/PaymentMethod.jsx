import { toast } from "react-toastify";

const PaymentMethod = ({ paymentMethod, setPaymentMethod }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
      <h2 className="text-lg sm:text-xl font-bold mb-4">Payment Method</h2>

      <div className="space-y-3">
        {/* Cash on Delivery */}
        <label className="flex items-start gap-3 p-3 sm:p-4 border-2 rounded-lg cursor-pointer hover:border-blue-300 transition">
          <input
            type="radio"
            name="payment"
            value="CASH"
            checked={paymentMethod === "CASH"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 accent-blue-600"
          />
          <div className="flex-1">
            <p className="font-semibold text-sm sm:text-base">Cash on Delivery</p>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Pay with cash when your order arrives
            </p>
          </div>
        </label>

        {/* QR Payment */}
        <label className="flex items-start gap-3 p-3 sm:p-4 border-2 rounded-lg cursor-pointer hover:border-blue-300 transition">
          <input
            type="radio"
            name="payment"
            value="QR"
            checked={paymentMethod === "QR"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 accent-blue-600"
          />
          <div className="flex-1">
            <p className="font-semibold text-sm sm:text-base">QR Payment</p>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Pay using QR code (eSewa, Khalti, etc.)
            </p>
          </div>
        </label>

        {/* Card Payment */}
        <label className="flex items-start gap-3 p-3 sm:p-4 border-2 rounded-lg cursor-pointer hover:border-blue-300 transition">
          <input
            type="radio"
            name="payment"
            value="CARD"
            checked={paymentMethod === "CARD"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 accent-blue-600"
          />
          <div className="flex-1">
            <p className="font-semibold text-sm sm:text-base">Debit/Credit Card</p>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Pay securely with your card
            </p>
          </div>
        </label>
      </div>
    </div>
  );
};

export default PaymentMethod;