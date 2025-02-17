"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function GeneralSubmitButton({
  text,
  icon,
  variant,
  width = "w-full",
  showToast = false,
  toastMessage = {
    success: 'Submitted successfully',
    error: 'Submission failed'
  }
}: {
  text: string;
  icon?: React.ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  width?: string;
  showToast?: boolean;
  toastMessage?: {
    success: string;
    error: string;
  };
}) {
  const { pending } = useFormStatus();

  const handleSubmit = (event: React.FormEvent) => {
    if (showToast) {
      try {
        // Placeholder for potential submission logic
        toast.success(toastMessage.success, {
          duration: 3000,
          position: 'bottom-right',
        });
      } catch (error) {
        toast.error(toastMessage.error, {
          duration: 3000,
          position: 'bottom-right',
        });
      }
    }
  };

  return (
    <Button
      type="submit"
      variant={variant}
      disabled={pending}
      className={width}
      onClick={handleSubmit}
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin " />
          <span>Submitting...</span>
        </>
      ) : (
        <>
          {icon && <div className="">{icon}</div>}
          <span>{text}</span>
        </>
      )}
    </Button>
  );
}

export function SaveJobButton({ savedJob }: { savedJob: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button
      variant="outline"
      disabled={pending}
      type="submit"
      className="flex items-center gap-2"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Saving...</span>
        </>
      ) : (
        <>
          <Heart
            className={`size-4 transition-colors ${
              savedJob ? "fill-current text-red-500" : ""
            }`}
          />
          {savedJob ? "Saved" : "Save Job"}
        </>
      )}
    </Button>
  );
}
