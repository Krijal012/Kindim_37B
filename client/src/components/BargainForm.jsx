import { useState } from "react";

export function BargainForm({ onSubmit, onCancel }) {
  const [proposedPrice, setProposedPrice] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (!proposedPrice) {
      alert('Please enter a proposed price');
      return;
    }
    onSubmit({ proposedPrice, reason });
    setProposedPrice('');
    setReason('');
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-2">Your Proposed Price</label>
        <input
          type="text"
          value={proposedPrice}
          onChange={(e) => setProposedPrice(e.target.value)}
          placeholder="Enter your best offer"
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] text-sm sm:text-base"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Reason for Offer (Optional)</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Tell us why you deserve a lower price..."
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A73E8] h-28 sm:h-32 resize-none text-sm sm:text-base"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4">
        <button
          onClick={onCancel}
          className="px-4 sm:px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition text-sm sm:text-base"
        >
          Cancel Offer
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 sm:px-6 py-2 bg-[#1A73E8] text-white font-semibold rounded-lg hover:bg-[#1557b0] transition text-sm sm:text-base"
        >
          Submit Offer
        </button>
      </div>
    </div>
  );
}