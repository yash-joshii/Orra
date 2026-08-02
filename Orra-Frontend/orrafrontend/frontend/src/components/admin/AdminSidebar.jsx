import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCog,
  UserCheck,
  Package,
  ClipboardCheck,
} from "lucide-react";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/owners", label: "Owners", icon: UserCog },
  { to: "/admin/renters", label: "Renters", icon: UserCheck },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/product-approval", label: "Product Approval", icon: ClipboardCheck },
];

const AdminSidebar = () => {
  return (
     <aside className="w-56 border-r bg-white h-screen flex flex-col">
      <div className="px-4 py-4 font-semibold text-lg border-b">
        ORRA <span className="text-indigo-600">Admin</span>
      </div>
      <nav className="flex-1 px-2 py-3 space-y-1">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                isActive ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default AdminSidebar