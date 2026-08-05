import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  CheckCircle2,
  Ban,
  Unlock,
  ShieldCheck,
  ShieldAlert,
  Users as UsersIcon,
  Loader2,
} from "lucide-react";
import { blockUser, getUsers, unblockUser, verifyUser } from "@/api/admin/adminApi";

// Soft status pill styles
const statusStyles = {
  ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
  PENDING: "bg-amber-50 text-amber-700 border-amber-200/60",
  BLOCKED: "bg-rose-50 text-rose-700 border-rose-200/60",
};

const UserTable = ({ role, title }) => {
  const [users, setUsers] = useState([]);
  const [tab, setTab] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    setLoading(true);
    const status = tab === "ALL" ? undefined : tab;
    getUsers(role, status)
      .then((res) => setUsers(res?.data?.content || []))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, [tab, role]);

  const handleVerify = async (id) => {
    await verifyUser(id);
    fetchUsers();
  };

  const handleBlock = async (id) => {
    await blockUser(id);
    fetchUsers();
  };

  const handleUnblock = async (id) => {
    await unblockUser(id);
    fetchUsers();
  };

  // Extract initials for user avatar badge
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    return parts.length >= 2
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-5">
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Manage user permissions, account verifications, and access status.
          </p>
        </div>

        {/* Tab Filters */}
        <Tabs value={tab} onValueChange={setTab} className="w-full sm:w-auto">
          <TabsList className="bg-slate-100 p-1 rounded-2xl h-11 border border-slate-200/60">
            <TabsTrigger value="ALL" className="rounded-xl text-xs font-semibold px-4">
              All
            </TabsTrigger>
            <TabsTrigger value="ACTIVE" className="rounded-xl text-xs font-semibold px-4">
              Verified
            </TabsTrigger>
            <TabsTrigger value="PENDING" className="rounded-xl text-xs font-semibold px-4">
              Pending
            </TabsTrigger>
            <TabsTrigger value="BLOCKED" className="rounded-xl text-xs font-semibold px-4">
              Blocked
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Table Card Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/60">
            <TableRow className="border-b border-slate-100">
              <TableHead className="text-[10px] uppercase font-bold text-slate-400 tracking-wider py-4 pl-6">
                User
              </TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-slate-400 tracking-wider py-4">
                Role
              </TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-slate-400 tracking-wider py-4">
                Status
              </TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-slate-400 tracking-wider py-4">
                KYC Verification
              </TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-slate-400 tracking-wider py-4">
                Joined Date
              </TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-slate-400 tracking-wider py-4 text-center">
                Listings
              </TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-slate-400 tracking-wider py-4 text-center">
                Rentals
              </TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-slate-400 tracking-wider py-4 pr-6 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12">
                  <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                    <span className="text-xs font-medium">Fetching accounts...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12">
                  <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                    <UsersIcon className="w-8 h-8 opacity-40" />
                    <span className="text-sm font-semibold text-slate-600">No users found</span>
                    <span className="text-xs text-slate-400">
                      Try switching filters or search criteria.
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              users.map((u) => (
                <TableRow
                  key={u.id}
                  className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                >
                  {/* User Profile */}
                  <TableCell className="py-3.5 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-100 border border-indigo-200/60 flex items-center justify-center text-xs font-bold text-indigo-700 shrink-0">
                        {getInitials(u.name)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-slate-900 leading-snug">
                          {u.name || "Unnamed User"}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          {u.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Roles */}
                  <TableCell className="py-3.5">
                    <span className="text-xs font-semibold text-slate-700 capitalize">
                      {u.roles?.join(", ") || "User"}
                    </span>
                  </TableCell>

                  {/* Account Status Badge */}
                  <TableCell className="py-3.5">
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-lg border ${
                        statusStyles[u.status] || statusStyles.ACTIVE
                      }`}
                    >
                      {u.status}
                    </Badge>
                  </TableCell>

                  {/* KYC Verification Indicator */}
                  <TableCell className="py-3.5">
                    {u.verified ? (
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verified</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                        <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
                        <span>Unverified</span>
                      </div>
                    )}
                  </TableCell>

                  {/* Joined Date */}
                  <TableCell className="py-3.5 text-xs text-slate-600 font-medium">
                    {u.joinedDate
                      ? new Date(u.joinedDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—"}
                  </TableCell>

                  {/* Counts */}
                  <TableCell className="py-3.5 text-center font-bold text-slate-800 text-xs">
                    {u.listingsCount ?? 0}
                  </TableCell>

                  <TableCell className="py-3.5 text-center font-bold text-slate-800 text-xs">
                    {u.rentalsCount ?? 0}
                  </TableCell>

                  {/* Actions Dropdown */}
                  <TableCell className="py-3.5 pr-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                        className="w-40 rounded-2xl p-1.5 border border-slate-200/80 shadow-md bg-white space-y-1"
                      >
                        {u.status === "PENDING" && (
                          <DropdownMenuItem
                            onClick={() => handleVerify(u.id)}
                            className="rounded-xl text-xs font-semibold text-emerald-600 hover:bg-emerald-50 focus:bg-emerald-50 cursor-pointer flex items-center gap-2"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Verify User</span>
                          </DropdownMenuItem>
                        )}

                        {u.status !== "BLOCKED" ? (
                          <DropdownMenuItem
                            onClick={() => handleBlock(u.id)}
                            className="rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 focus:bg-rose-50 cursor-pointer flex items-center gap-2"
                          >
                            <Ban className="w-4 h-4" />
                            <span>Block User</span>
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => handleUnblock(u.id)}
                            className="rounded-xl text-xs font-semibold text-indigo-600 hover:bg-indigo-50 focus:bg-indigo-50 cursor-pointer flex items-center gap-2"
                          >
                            <Unlock className="w-4 h-4" />
                            <span>Unblock User</span>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

    </div>
  );
};

export default UserTable;