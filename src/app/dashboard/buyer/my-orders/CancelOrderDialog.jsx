'use client';

import { AlertDialog } from "@heroui/react";
import { TrashBin, CircleDashed, Xmark } from '@gravity-ui/icons';

export default function CancelOrderDialog({ isOpen, onOpenChange, onConfirm, isCancelling }) {

  if (!isOpen) return null;

  return (
    <AlertDialog isOpen={isOpen} onOpenChange={onOpenChange}>
      
     
      <AlertDialog.Backdrop className="bg-black/50 backdrop-blur-sm fixed inset-0 w-screen h-screen z-[9998]" />
      
      <AlertDialog.Container className="fixed inset-0 w-screen h-screen z-[9999] flex items-center justify-center p-4">
        <AlertDialog.Dialog className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 max-w-md w-full p-6 rounded-2xl shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
          
          <AlertDialog.CloseTrigger 
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 text-sm p-1 rounded-lg"
          >
            <Xmark/>
          </AlertDialog.CloseTrigger>
          
          <AlertDialog.Header className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-950/50 flex items-center justify-center text-red-500 shrink-0">
              <TrashBin className="w-5 h-5" />
            </div>
            <AlertDialog.Heading className="text-lg font-black tracking-tight text-neutral-900 dark:text-white">
              Cancel Order Request
            </AlertDialog.Heading>
          </AlertDialog.Header>

          <AlertDialog.Body className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
            Are you sure you want to cancel this order? This action will notify the seller, and it cannot be undone.
          </AlertDialog.Body>

          <AlertDialog.Footer className="flex items-center justify-end gap-3 border-t border-neutral-100 dark:border-neutral-800/60 pt-4">
            <button
              onClick={() => onOpenChange(false)}
              className="inline-flex h-9 items-center justify-center rounded-xl border border-neutral-300 dark:border-neutral-700 px-4 text-xs font-semibold bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 transition hover:bg-neutral-50 dark:hover:bg-neutral-700/50"
            >
              No, Keep Order
            </button>
            
            <button
              disabled={isCancelling}
              onClick={onConfirm}
              className="inline-flex h-9 items-center justify-center text-xs font-bold px-4 rounded-xl bg-red-500 hover:bg-red-600 text-white transition disabled:opacity-50 gap-1.5 shadow-sm shadow-red-500/20"
            >
              {isCancelling ? (
                <>
                  <CircleDashed className="w-3.5 h-3.5 animate-spin" />
                  Cancelling...
                </>
              ) : (
                <>
                  <TrashBin className="w-3.5 h-3.5" />
                  Yes, Cancel
                </>
              )}
            </button>
          </AlertDialog.Footer>
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog>
  );
}