import { useSelector } from "react-redux";



const AdminNavbar = () => {
    const { user } = useSelector((state) => state.auth);
  return (
     <header className="h-14 border-b bg-white flex items-center justify-between px-6">
      <input
        type="text"
        placeholder="Search users, products..."
        className="border rounded-md px-3 py-1.5 text-sm w-72"
      />
      <div className="flex items-center gap-2">
        <div className="text-right">
          <div className="text-sm font-medium">{user?.name || "Admin User"}</div>
          <div className="text-xs text-gray-500">Superadmin</div>
        </div>
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-semibold text-indigo-700">
          AU
        </div>
      </div>
    </header>
  )
}

export default AdminNavbar