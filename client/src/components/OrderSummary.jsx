function OrderSummary({ estimatedDelivery, totalPaid }) {
  return (
    <div className="flex justify-center gap-8 mb-8">
      <div className="text-center">
        <p className="text-gray-600 text-sm mb-1">Estimated Delivery:</p>
        <p className="font-bold text-lg">{estimatedDelivery}</p>
      </div>
      <div className="text-center">
        <p className="text-gray-600 text-sm mb-1">Total Paid:</p>
        <p className="font-bold text-lg">{totalPaid}</p>
      </div>
    </div>
  );
}

export default OrderSummary;