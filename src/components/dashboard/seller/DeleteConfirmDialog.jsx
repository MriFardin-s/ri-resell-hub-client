'use client';

import { AlertDialog, Button } from "@heroui/react";

export default function DeleteConfirmDialog({ isOpen, onOpenChange, onConfirm, isCancelling }) {
  return (
    <AlertDialog isOpen={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="bg-white dark:bg-neutral-900 p-6 rounded-2xl max-w-md w-full border border-neutral-200 dark:border-neutral-800 shadow-2xl">
            
            <AlertDialog.Header className="pb-2">
              <AlertDialog.Heading className="text-lg font-bold text-neutral-900 dark:text-white">
                Delete Product
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body className="py-2 text-sm text-neutral-500 dark:text-neutral-400">
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialog.Body>

            <AlertDialog.Footer className="flex justify-end gap-3 mt-6">
              <Button 
                variant="ghost" 
                onClick={() => onOpenChange(false)}
                className="px-4 h-9 text-xs font-semibold rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300"
              >
                Cancel
              </Button>

              <Button 
                color="danger" 
                onClick={onConfirm}
                isLoading={isCancelling}
                disabled={isCancelling}
                className="px-4 h-9 text-xs font-semibold rounded-xl bg-red-500 text-white"
              >
                {isCancelling ? "Deleting..." : "Delete"}
              </Button>
            </AlertDialog.Footer>

          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}