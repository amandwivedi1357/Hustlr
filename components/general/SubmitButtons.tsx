"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export function GeneralSubmitButton({
  text,
  icon,
  variant,
  width = "w-full",
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
}) {
  const { pending } = useFormStatus();
  const [isApplied, setIsApplied] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    
    // Show toast notification
    toast.success('Application Submitted', {
      description: 'Your job application has been successfully submitted.',
      duration: 3000,
      position: 'bottom-right',
    });

    // Set applied state
    setIsApplied(true);
  };

  return (
    <Button
      type="submit"
      variant={variant}
      disabled={pending || isApplied}
      className={width}
      onClick={handleSubmit}
    >
      {isApplied ? (
        "Applied"
      ) : pending ? (
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
