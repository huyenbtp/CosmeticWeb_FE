import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { capitalize, updateQueryParams } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function getCustomerStatusBadge(status: string) {
  if (status === "active" || status === "verified") {
    return <Badge className="bg-success1 text-success1-foreground">{capitalize(status)}</Badge>
  } else if (status === "inactive" || status === "unverified") {
    return <Badge className="bg-warning1 text-warning1-foreground">{capitalize(status)}</Badge>
  }
};

export default function CustomersFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const is_active = searchParams.get("is_active") || "";

  const handleAccStatusChange = (value: string) => {
    const newQuery = updateQueryParams(searchParams, {
      is_active: value !== "all" ? value : "",
      page: 1,
    });
    router.push(`?${newQuery}`);
  }

  return (
    <>
      <Select value={is_active} onValueChange={(value) => handleAccStatusChange(value)}>
        <SelectTrigger size="sm" className="w-full sm:w-36">
          <SelectValue placeholder="Acc Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All account status</SelectItem>
          {["active", "inactive"].map(value => (
            <SelectItem key={value} value={value}>{getCustomerStatusBadge(value)}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}