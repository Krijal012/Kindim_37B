export default function OrderSummary() {
  return (
    <div className="bg-[#D9D9D9] p-5 mb-6">
      <h3 className="font-bold mb-4">Order Summary</h3>

      <div className="text-sm space-y-1">
        <p>Product Name</p>
        <p>Product Name</p>
        <p>Subtotal</p>
        <p>Delivery</p>
        <p className="font-bold text-lg mt-2">Total</p>
      </div>

      <button className="w-full mt-4 bg-[#1E5EFF] text-white rounded-full py-2">
        I Have Paid
      </button>
    </div>
  );
}
