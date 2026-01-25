import qrImg from "../assets/icons/qr.png";

const PaymentMethod = ({ paymentMethod, setPaymentMethod }) => {
  return (
    <div>
      <h3 className="font-bold mb-4">Payment Method</h3>

      <div className="flex gap-4">
        <div
          onClick={() => setPaymentMethod("QR")}
          className={`w-36 h-36 border-2 rounded-xl flex flex-col items-center justify-center cursor-pointer
          ${paymentMethod === "QR" ? "border-blue-600 bg-blue-50" : "border-black"}`}
        >
          <img src={qrImg} alt="QR" className="w-20 h-20 mb-2" />
          <p className="text-sm font-medium">QR Payment</p>
        </div>

        <div
          onClick={() => setPaymentMethod("CASH")}
          className={`w-36 h-36 border-2 rounded-xl flex items-center justify-center cursor-pointer
          ${paymentMethod === "CASH" ? "border-blue-600 bg-blue-50" : "border-black"}`}
        >
          <p className="text-sm font-medium">Cash on Delivery</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
