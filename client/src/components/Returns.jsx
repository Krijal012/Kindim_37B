import { useEffect, useState } from "react";
import { useApi } from "../hooks/useAPI";

export default function Returns() {
  const { callApi, loading } = useApi();
  const [returns, setReturns] = useState([]);

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const res = await callApi("GET", "/api/returns");
        setReturns(res.data || []);
      } catch (err) {
        console.error("Returns fetch error:", err);
      }
    };
    fetchReturns();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      completed: "bg-blue-100 text-blue-800",
    };
    return colors[status?.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="flex-1 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Returns & Cancellations</h2>

      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading returns...</p>
        </div>
      ) : returns.length === 0 ? (
        <div className="text-center py-20">
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
              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
            />
          </svg>
          <p className="text-gray-500 text-lg">No returns or cancellations</p>
          <p className="text-gray-400 text-sm mt-2">Your return requests will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {returns.map((returnItem) => (
            <div
              key={returnItem.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-600">Return ID: #{returnItem.id}</p>
                  <p className="text-sm text-gray-600">
                    Requested on: {new Date(returnItem.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Type: <span className="font-semibold">{returnItem.type}</span>
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(returnItem.status)}`}>
                  {returnItem.status}
                </span>
              </div>

              <div className="flex gap-4 items-center pb-3 border-b">
                <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  {returnItem.productImage && (
                    <img
                      src={`http://localhost:5000/uploads/${returnItem.productImage}`}
                      alt={returnItem.productName}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{returnItem.productName}</p>
                  <p className="text-sm text-gray-600">Order ID: #{returnItem.orderId}</p>
                  <p className="text-sm font-bold text-blue-600">Rs. {returnItem.amount}</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Reason:</span> {returnItem.reason}
                </p>
                {returnItem.adminResponse && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-semibold text-gray-700">Admin Response:</p>
                    <p className="text-sm text-gray-600 mt-1">{returnItem.adminResponse}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}