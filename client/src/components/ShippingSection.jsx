import editIcon from "../assets/icons/edit.png";

export default function ShippingSection() {
  return (
    <div className="flex-1">
      <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>

      <div className="bg-[#E5E5E5] p-4 rounded relative mb-6">
        <p className="font-semibold">Person’s Name</p>
        <p className="text-sm">Address</p>
        <p className="text-sm">Phone Number</p>

        <img
          src={editIcon}
          alt="Edit"
          className="absolute top-4 right-4 w-5 h-5 cursor-pointer"
        />
      </div>

      <button className="border border-black rounded-full px-10 py-2 mb-6">
        Add New Address
      </button>

      <div className="border-2 border-black p-6">
        <div className="grid grid-cols-2 gap-8">
          <input
            placeholder="Full Name"
            className="border-2 border-black px-4 py-2"
          />
          <input
            placeholder="Address"
            className="border-2 border-black px-4 py-2"
          />
          <input
            placeholder="Phone Number"
            className="border-2 border-black px-4 py-2 w-[260px]"
          />
        </div>
      </div>

     
    </div>
  );
}
 