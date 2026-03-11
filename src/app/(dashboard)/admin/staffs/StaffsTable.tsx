import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, } from "lucide-react";
import { IStaff } from "@/interfaces/staff.interface";
import { Spinner } from "@/components/ui/spinner";

export function getStatusStyle(status: string) {
  if (status === "active") {
    return "bg-success1 text-success1-foreground"
  } else if (status === "on_leave" || status === "inactive") {
    return "bg-warning1 text-warning1-foreground"
  } else if (status === "terminated") {
    return "bg-error1 text-error1-foreground"
  }
};

export default function StaffsTable({
  loading,
  data,
  onView,
  onEdit,
}: {
  loading: boolean;
  data: IStaff[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}) {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Staff Code</TableHead>
          <TableHead>Staff Full Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Employee Status</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Account Status</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={7} align="center">
              <Spinner className="size-10" />
            </TableCell>
          </TableRow>
        ) : data.length > 0 ? (data.map((staff) => (
          <TableRow key={staff._id}>
            <TableCell className="w-14/100 ">
              {staff.staff_code}
            </TableCell>

            <TableCell className="w-22/100 max-w-80 pr-8" title={staff.full_name}>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={staff.image} alt={staff.full_name} />
                  <AvatarFallback className="bg-primary text-white">
                    {staff.full_name[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="flex-1 font-medium truncate">{staff.full_name}</span>
              </div>
            </TableCell>

            <TableCell className="w-12/100 ">
              {staff.phone}
            </TableCell>

            <TableCell className="w-14/100 font-medium">
              <Select
                defaultValue={staff.status}
                value={staff.status}
                onValueChange={() => { }}
              >
                <SelectTrigger size="xs" className={`w-fit text-xs shadow-none ${getStatusStyle(staff.status)}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active" >Active</SelectItem>
                  <SelectItem value="on_leave">On leave</SelectItem>
                  <SelectItem value="terminated">Terminated</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>

            <TableCell className="w-14/100 font-medium ">
              <Select
                defaultValue={staff.account.role}
                value={staff.account.role}
                onValueChange={() => { }}
              >
                <SelectTrigger size="xs" className="inline-flex w-fit bg-secondary text-primary text-xs shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="warehouse_manager">Warehouse Manager</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>

            <TableCell className="w-12/100 font-medium">
              <Select
                defaultValue={staff.account.status}
                value={staff.account.status}
                onValueChange={() => { }}
              >
                <SelectTrigger size="xs" className={`w-fit text-xs shadow-none ${getStatusStyle(staff.account.status)}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active" >Active</SelectItem>
                  <SelectItem value="inactive">In Active</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>

            <TableCell className="text-center">
              <Button
                variant="ghost"
                size="sm"
                title="View Detail"
                onClick={() => { onView(staff._id) }}
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                title="Edit Staff"
                onClick={() => { onEdit(staff._id) }}
              >
                <Edit className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))) : (
          <TableRow>
            <TableCell colSpan={7} align="center">
              No data available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}