"use client";

import { Trash2 } from "lucide-react";
import React, { useState, useTransition } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { deleteSummaryAction } from "@/actions/summary-actions";
import { toast } from "sonner";

interface deleteButtonProps {
  summaryId: string;
}

const DeleteButton = ({ summaryId }: deleteButtonProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const HandleDelete = async () => {
    startTransition(async () => {
      const result = await deleteSummaryAction({ summaryId });
      if (!result.success) {
        toast("Error in deleting the summary.");
      }
      setOpen(false);
      toast("Summary Deleted succesfully.");
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size="icon"
          className="bg-gray-50 text-gray-500 border border-gray-200 hover:text-red-500 hover:bg-rose-100"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Summary?</DialogTitle>
          <DialogDescription>
            Are You Sure you want to delete the summary? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={"ghost"}
            className="bg-gray-50 text-gray-800 border border-gray-20hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            className="bg-gray-900 hover:bg-gray-700"
            onClick={HandleDelete}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
