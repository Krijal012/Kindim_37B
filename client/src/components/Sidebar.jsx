import userImg from "../../assets/icons/user.png";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow rounded">
      <div className="flex items-center gap-3 p-4 border-b">
        <img
          src={userImg}
          alt="User"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="text-sm text-gray-500">Hello</p>
          <h3 className="font-semibold">Rajesh Hamal</h3>
        </div>
      </div>

      <ul className="text-sm">
        {[
          "My Account",
          "My Orders",
          "Returns & Cancel",
          "My Rating & Review",
          "My Wishlist",
          "Payment",
          "Change Password",
        ].map((item, index) => (
          <li
            key={index}
            className={`px-4 py-2 border-b cursor-pointer ${
              index === 0
                ? "bg-blue-600 text-white font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
