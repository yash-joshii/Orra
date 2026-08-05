import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCog,
  UserCheck,
  Package,
  ClipboardCheck,
  ShieldCheck,
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
    <aside className="w-64 border-r border-slate-200/80 bg-white h-screen sticky top-0 flex flex-col justify-between shrink-0 select-none transition-all">
      
      {/* Top Branding Header */}
      <div>
        <div className="h-16 border-b border-slate-200/80 px-6 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-base shadow-md shadow-indigo-500/20">
            O
          </div>
          <div className="flex flex-col">
            <div className="font-black text-slate-900 tracking-tight text-base leading-tight flex items-center gap-1.5">
              <span>ORRA</span>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-600 px-1.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-100">
                Admin
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Management Portal
            </p>
          </div>
        </div>

        {/* Navigation List */}
        <div className="p-4 space-y-6">
          <div>
            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Main Navigation
            </div>
            <nav className="space-y-1.5">
              {navItems.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 h-11 rounded-2xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isActive ? "text-white" : "text-slate-400"
                        }`}
                      />
                      <span>{label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Sidebar Footer Widget */}
      <div className="p-4 border-t border-slate-200/80">
        <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-bold text-slate-700">System Live</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-md border border-slate-200">
            <ShieldCheck className="w-3 h-3 text-indigo-500" />
            <span>v1.0</span>
          </div>
        </div>
      </div>

    </aside>
  );
};

export default AdminSidebar;