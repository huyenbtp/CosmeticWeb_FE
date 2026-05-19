
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Clock, User } from "lucide-react";
import { IImportDetail } from "@/interfaces/import.interface";
import dayjs from "dayjs";

export default function ImportInformation({
  data,
  onChangeNotes,
}: {
  data: IImportDetail;
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
          {data.confirmedStaff && (
            <div className="space-y-1">
              <div className="font-medium">{data.confirmedStaff.full_name} (Confirmer)</div>
              <div className="text-sm text-muted-foreground">Staff code: {data.confirmedStaff.staff_code}</div>
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <div className="text-sm text-muted-foreground">Confirmed at {dayjs(data.confirmedAt).format("hh:mm, DD/MM/YYYY")}</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="">Import Notes</CardTitle>
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