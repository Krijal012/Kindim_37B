import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ user }) {
  const location = useLocation();

  const menuItems = [
    { label: "My Account", path: "/profile" },
    { label: "My Orders", path: "/orders" },
    { label: "Returns & Cancel", path: "/returns" },
    { label: "My Rating & Review", path: "/reviews" },
    { label: "My Wishlist", path: "/wishlist" },
    { label: "Payment", path: "/payment" },
    { label: "Change Password", path: "/change-password" },
  ];

  return (
    <div className="w-64 bg-white shadow p-4 rounded">
      <div className="flex items-center gap-3 border-b pb-4 mb-4">
        {user?.profileImage ? (
          <img
            src={`http://localhost:5000${user.profileImage}`}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-300 rounded-full" />
        )}
        <h3 className="font-semibold">{user?.name}</h3>
      </div>

      <ul className="space-y-2 text-sm">
        {menuItems.map((item, i) => {
          const isActive = location.pathname.startsWith(item.path);

          return (
            <li key={i}>
              <Link
                to={item.path}
                className={`block px-3 py-2 rounded cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
