
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { User } from "lucide-react";
import { IExportDetail } from "@/interfaces/export.inerface";

export default function ExportInformation({
  data,
  onChangeNotes,
}: {
  data: IExportDetail;
  onChangeNotes: (notes: string) => void;
}) {
  const [newNotes, setNewNotes] = useState(data.notes);

  return (
    <>
      {/* Staff Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <User className="w-5 h-5" />
            Responsible
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="space-y-1">
            <div className="font-medium">{data.createdStaff.full_name} (Creator)</div>
            <div className="text-sm text-muted-foreground">Staff code: {data.createdStaff.staff_code}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="">Export Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={newNotes}
            onChange={(e) => { setNewNotes(e.target.value) }}
          />
          <Button
            onClick={() => { onChangeNotes(newNotes) }}
            disabled={newNotes === data.notes}
            className="w-full"
          >
            Update
          </Button>
        </CardContent>
      </Card>
    </>
  )
}