import { toast } from "react-toastify";

const PaymentMethod = ({ paymentMethod, setPaymentMethod }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Payment Method</h2>

      <div className="space-y-3">
        <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-blue-300 transition">
          <input
            type="radio"
            name="payment"
            value="CASH"
            checked={paymentMethod === "CASH"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-5 h-5"
          />
          <div>
            <p className="font-semibold">Cash on Delivery</p>
            <p className="text-sm text-gray-600">Pay with cash when your order arrives</p>
          </div>
        </label>

        <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-blue-300 transition">
          <input
            type="radio"
            name="payment"
            value="QR"
            checked={paymentMethod === "QR"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-5 h-5"
          />
          <div>
            <p className="font-semibold">QR Payment</p>
            <p className="text-sm text-gray-600">Pay using QR code (eSewa, Khalti, etc.)</p>
          </div>
        </label>

        <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-blue-300 transition">
          <input
            type="radio"
            name="payment"
            value="CARD"
            checked={paymentMethod === "CARD"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-5 h-5"
          />
          <div>
            <p className="font-semibold">Debit/Credit Card</p>
            <p className="text-sm text-gray-600">Pay securely with your card</p>
          </div>
        </label>
      </div>
    </div>
  );
};

export default PaymentMethod;