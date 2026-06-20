import { NavLink } from "react-router-dom";

const links = [
  { to: "/admin", label: "Dashboard", icon: "📊" },
  { to: "/admin/products", label: "Products", icon: "📦" },
  { to: "/admin/orders", label: "Orders", icon: "🛒" },
];

const AdminSidebar = () => (
  <aside className="w-56 min-h-screen bg-gray-900 text-white flex flex-col py-8 px-4">
    <h2 className="text-lg font-bold text-orange-400 mb-8 px-2">Admin Panel</h2>
    <nav className="flex flex-col gap-1">
      {links.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/admin"}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive ? "bg-orange-500 text-white" : "text-gray-300 hover:bg-gray-800"
            }`
          }
        >
          <span>{icon}</span>
          {label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default AdminSidebar;