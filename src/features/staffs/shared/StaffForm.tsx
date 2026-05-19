import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save } from "lucide-react";
import { getStaffStatusBadge } from "@/features/staffs/management/StaffsFilter";
import dayjs from "dayjs";
import { IAddEditStaff } from "@/interfaces/staff.interface";
import ImageUploader, { ImageState } from "@/components/layout/ImageUploader";
import Combobox from "@/components/layout/Combobox";
import { IRole } from "@/interfaces/role.interface";

const NullStaff: IAddEditStaff = {
  full_name: "",
  gender: "",
  dob: "",
  phone: "",
  image: "",
  status: "",
  user: {
    email: "",
    role: { _id: "", name: "" },
    is_active: true,
  },
};

interface StaffFormProps {
  mode: "create" | "edit";
  loading?: boolean;
  initialData?: IAddEditStaff;
  onSubmit: (data: IAddEditStaff, file: File | null, imageState: ImageState) => void;
  roleList: IRole[];
}

export default function StaffForm({
  mode,
  loading = false,
  initialData,
  onSubmit,
  roleList,
}: StaffFormProps) {
  const [data, setData] = useState(initialData ?? NullStaff);
  const [accountData, setAccountData] = useState(data.user);
  const [file, setFile] = useState<File | null>(null);
  const [imageState, setImageState] = useState<ImageState>("keep");

  useEffect(() => {
    setData({ ...data, user: accountData });
  }, [accountData]);

  useEffect(() => {
    if (initialData) {
      setData(initialData);
      setAccountData(initialData.user);
    }
  }, [initialData]);

  return (
    <div className="h-full flex flex-col px-8 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {mode === "create" ? "New Staff" : "Edit Staff"}
        </h1>

        <Button
          disabled={loading || !data.full_name || !data.gender || !data.dob
            || !data.phone || !data.user.role || !data.user.is_active
            || (mode === "create" && !data.user.email)}
          onClick={() => onSubmit(data, file, imageState)}
        >
          <Save className="w-4 h-4 mr-2" />
          {mode === "create" ? "Add New Staff" : "Save Changes"}
        </Button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="col-span-2">
          <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <Label
                  htmlFor="staff-name"
                  className={`transition-all text-muted-foreground
                    ${data.full_name.trim() === "" ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                  `}
                >
                  Staff Full Name
                </Label>
                <Input
                  id="staff-name"
                  value={data.full_name}
                  onChange={(e) => setData({ ...data, full_name: e.target.value })}
                  placeholder="Staff Full Name"
                  className="h-12"
                />
              </div>

              <div>
                <Label
                  htmlFor="staff-gender"
                  className={`transition-all text-muted-foreground
                    ${data.gender.trim() === "" ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                  `}
                >
                  Gender
                </Label>
                <Select
                  value={data.gender}
                  onValueChange={(value) => setData({ ...data, gender: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="staff-dob"
                  className={`transition-all text-muted-foreground opacity-100 mb-2
                  `}
                >
                  Date of Birth
                </Label>
                <Input
                  id="staff-dob"
                  type="date"
                  value={dayjs(data.dob).format("YYYY-MM-DD")}
                  onChange={(e) => { console.log(e.target.value); setData({ ...data, dob: e.target.value }) }}
                  placeholder="Date of Birth"
                  className="h-12"
                />
              </div>

              <div>
                <Label
                  htmlFor="staff-phone"
                  className={`transition-all text-muted-foreground
                    ${data.phone.trim() === "" ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                  `}
                >
                  Staff Phone Number
                </Label>
                <Input
                  id="staff-phone"
                  type="tel"
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  placeholder="Staff Phone Number"
                  className="h-12"
                />
              </div>

              <div>
                <Label
                  htmlFor="staff-status"
                  className={`transition-all text-muted-foreground
                    ${data.status.trim() === "" ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                  `}
                >
                  Employment Status
                </Label>
                <Select
                  value={data.status}
                  onValueChange={(value) => setData({ ...data, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Employment Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {["active", "on_leave", "terminated"].map(value => (
                      <SelectItem key={value} value={value}>{getStaffStatusBadge(value)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-6">
              {mode === "create" && accountData && (
                <>
                  <div>
                    <Label
                      htmlFor="account-email"
                      className={`transition-all text-muted-foreground
                        ${!accountData.email || accountData.email.trim() === "" ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                      `}
                    >
                      Email
                    </Label>
                    <Input
                      id="account-email"
                      value={accountData.email}
                      onChange={(e) => setAccountData({ ...accountData, email: e.target.value })}
                      placeholder="Account's Email"
                      className="h-12"
                    />
                  </div>
                </>
              )}

              <div>
                <Label
                  htmlFor="account-role"
                  className={`transition-all text-muted-foreground
                    ${accountData.role._id.trim() === "" ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                  `}
                >
                  Role
                </Label>
                <Combobox
                  items={roleList}
                  selectedValue={accountData.role._id}
                  onChange={(value) => {
                    const newRole = roleList.find(item => item._id === value);
                    if (newRole) setAccountData({ ...accountData, role: newRole });
                  }}
                  getLabel={(c) => c.name}
                  getValue={(c) => c._id}
                  placeholder="Select Role"
                  emptyText="No role found."
                  variant="input"
                />
              </div>

              <div>
                <Label
                  htmlFor="account-status"
                  className={`transition-all text-muted-foreground
                    ${accountData.is_active == undefined ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                  `}
                >
                  Account Status
                </Label>
                <Select
                  value={accountData.is_active ? "active" : "inactive"}
                  onValueChange={(value) => setAccountData({ ...accountData, is_active: value === "active" })}
                >
                  <SelectTrigger size="default" className="w-full">
                    <SelectValue placeholder="Select Account Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {["active", "inactive"].map(value => (
                      <SelectItem key={value} value={value}>{getStaffStatusBadge(value)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>

        </Card>

        <Card>
          <CardContent className="space-y-4">
            <ImageUploader
              value={data.image}
              onChange={(value, state) => {
                setFile(value);
                setImageState(state);
              }}
              className="w-full h-80 rounded-lg border object-contain"
              label="Staff Profile Picture"
              description="Upload a profile picture for this staff."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
