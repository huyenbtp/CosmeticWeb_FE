import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { getRoleName, updateQueryParams } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { IRole } from "@/interfaces/role.interface";

export function getStaffRoleBadge(role: string) {
  return (
    <Badge variant={"secondary"}>{getRoleName(role)}</Badge>
  )
};

export function getStaffStatusBadge(status: string) {
  if (status === "active") {
    return <Badge className="bg-success1 text-success1-foreground">Active</Badge>
  } else if (status === "on_leave") {
    return <Badge className="bg-warning1 text-warning1-foreground">On leave</Badge>
  } else if (status === "inactive") {
    return <Badge className="bg-warning1 text-warning1-foreground">Inactive</Badge>
  } else if (status === "terminated") {
    return <Badge className="bg-error1 text-error1-foreground">Terminated</Badge>
  }
};

export default function StaffsFilter({
  roles
}: {
  roles: IRole[]
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = searchParams.get("status") || "";
  const roleId = searchParams.get("role") || "";
  const is_active = searchParams.get("is_active") || "";

  const handleEmpStatusChange = (value: string) => {
    const newQuery = updateQueryParams(searchParams, {
      status: value !== "all" ? value : "",
      page: 1,
    });
    router.push(`?${newQuery}`);
  }

  const handleRoleChange = (value: string) => {
    const newQuery = updateQueryParams(searchParams, {
      role: value !== "all" ? value : "",
      page: 1,
    });
    router.push(`?${newQuery}`);
  }

  const handleAccStatusChange = (value: string) => {
    const newQuery = updateQueryParams(searchParams, {
      is_active: value !== "all" ? value : "",
      page: 1,
    });
    router.push(`?${newQuery}`);
  }

  return (
    <>
      <Select value={status} onValueChange={(value) => handleEmpStatusChange(value)}>
        <SelectTrigger size="sm" className="w-full sm:w-36">
          <SelectValue placeholder="Emp Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All employment status</SelectItem>
          {["active", "on_leave", "terminated"].map(value => (
            <SelectItem key={value} value={value}>{getStaffStatusBadge(value)}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={roleId} onValueChange={(value) => handleRoleChange(value)}>
        <SelectTrigger size="sm" className="w-full sm:w-36">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All role</SelectItem>
          {roles.map((item) => (
            <SelectItem key={item._id} value={item._id}>{getStaffRoleBadge(item.name)}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={is_active} onValueChange={(value) => handleAccStatusChange(value)}>
        <SelectTrigger size="sm" className="w-full sm:w-36">
          <SelectValue placeholder="Acc Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All account status</SelectItem>
          {["active", "inactive"].map(value => (
            <SelectItem key={value} value={value}>{getStaffStatusBadge(value)}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}