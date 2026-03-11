
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { User } from "lucide-react";
import { IImportDetail } from "@/interfaces/import.interface";

export default function ImportInformation({
  data,
  onChangeNote,
}: {
  data: IImportDetail;
  onChangeNote: (note: string) => void;
}) {
  const [newNote, setNewNote] = useState(data.note);

  return (
    <>
      {/* Staff Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <User className="w-5 h-5" />
            Created By
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <div className="space-y-1">
            <div className="font-medium">{data.staff.full_name}</div>
            <div className="text-sm text-muted-foreground">Staff code: {data.staff.staff_code}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="">Import Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={newNote}
            onChange={(e) => { setNewNote(e.target.value) }}
          />
          <Button
            onClick={() => { onChangeNote(newNote) }}
            disabled={newNote === data.note}
            className="w-full"
          >
            Update
          </Button>
        </CardContent>
      </Card>
    </>
  )
}