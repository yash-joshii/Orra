import { useEffect, useState } from "react";
// import { getUsers, verifyUser, blockUser, unblockUser } from "@/api/adminApi";
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
import { MoreVertical } from "lucide-react";
import { blockUser, getUsers, unblockUser, verifyUser } from "@/api/admin/adminApi";

const statusColor = {
  ACTIVE: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  BLOCKED: "bg-red-100 text-red-700",
};

const UserTable = ({ role, title }) => {
    const [users, setUsers] = useState([]);
  const [tab, setTab] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    setLoading(true);
    const status = tab === "ALL" ? undefined : tab;
    getUsers(role, status)
      .then((res) => setUsers(res.data.content))
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

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">{title}</h1>

      <Tabs value={tab} onValueChange={setTab} className="mb-4">
        <TabsList>
          <TabsTrigger value="ALL">All</TabsTrigger>
          <TabsTrigger value="ACTIVE">Verified</TabsTrigger>
          <TabsTrigger value="PENDING">Pending</TabsTrigger>
          <TabsTrigger value="BLOCKED">Blocked</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Listings</TableHead>
              <TableHead>Rentals</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="font-medium">{u.name}</div>
                    <div className="text-xs text-gray-500">{u.email}</div>
                  </TableCell>
                  <TableCell>{u.roles?.join(", ")}</TableCell>
                  <TableCell>
                    <Badge className={statusColor[u.status]}>{u.status}</Badge>
                  </TableCell>
                  <TableCell>{u.verified ? "Verified" : "Unverified"}</TableCell>
                  <TableCell>{new Date(u.joinedDate).toLocaleDateString()}</TableCell>
                  <TableCell>{u.listingsCount}</TableCell>
                  <TableCell>{u.rentalsCount}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <MoreVertical size={16} />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {u.status === "PENDING" && (
                          <DropdownMenuItem onClick={() => handleVerify(u.id)}>
                            Verify
                          </DropdownMenuItem>
                        )}
                        {u.status !== "BLOCKED" ? (
                          <DropdownMenuItem onClick={() => handleBlock(u.id)}>
                            Block
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleUnblock(u.id)}>
                            Unblock
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
  )
}

export default UserTable