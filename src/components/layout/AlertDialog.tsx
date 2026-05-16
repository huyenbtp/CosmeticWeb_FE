import {
  AlertDialog as Dialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface Props {
  visible: boolean;
  onVisibleChange: (v: boolean) => void;
  message: string;
  description?: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}


export default function AlertDialog({
  visible,
  onVisibleChange,
  message = "Are you absolutely sure?",
  description = "",
  onConfirm,
  confirmText = "Continue",
  cancelText = "Cancel",
}: Props) {
  return (
    <Dialog open={visible} onOpenChange={onVisibleChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{message}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{confirmText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </Dialog>
  )
}
