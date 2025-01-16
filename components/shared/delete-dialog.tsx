import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSimStore } from "@/context/sim-store";
import { useToast } from "@/hooks/use-toast";

export const DeleteDialog = () => {
  const { toast } = useToast();
  const {
    isLoading,
    openDialog,
    setOpenDialog,
    setSelectedSim,
    selectedSim,
    deleteSim,
  } = useSimStore();

  const deleteProductFn = async () => {
    if (selectedSim) {
      const result = await deleteSim(selectedSim.id);
      if (result.success) {
        toast({
          description: `La Sim [${selectedSim.simNumber}] a été supprimée`,
        });

        setOpenDialog(false);
        setSelectedSim(null);
      } else {
        toast({
          description: "Echec de la suppression de la Sim",
        });
      }
    }
  };
  return (
    <AlertDialog
      open={openDialog}
      onOpenChange={(open) => {
        setOpenDialog(open);
      }}
    >
      <AlertDialogContent className="p-8">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="mt-2">
            This action cannot be undone. This will permanently delete the item.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-8">
          <AlertDialogCancel
            onClick={() => {
              setSelectedSim(null);
              setOpenDialog(false);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={deleteProductFn}>
            {isLoading ? "Suppression..." : "Supprimer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

/* 

This code defines a DeleteDialog component that creates a confirmation popup window when a user wants to delete a SIM card item. The component is designed to prevent accidental deletions by asking users to confirm their action.

The component doesn't take any direct inputs through props, but instead uses a store (useSimStore) to manage its state and data. It accesses information about the selected SIM card and controls whether the dialog is visible or hidden.

The main output is a visual dialog box that shows a warning message asking users if they're sure about deleting the item. It displays two buttons: "Cancel" and "Supprimer" (French for "Delete").

The logic flow works like this:

- When the dialog opens, it shows a warning message with the confirmation buttons
- If the user clicks "Cancel", the dialog closes and clears the selected SIM card
- If the user clicks "Supprimer", it triggers the deleteProductFn function which:
 + Attempts to delete the selected SIM card using the deleteSim function
 + Shows a success message with the SIM card number if deletion works
 + Shows an error message if deletion fails
 + Closes the dialog and clears the selection on success

 Important data transformations include handling the loading state (showing "Suppression..." while deleting) and managing the dialog's open/closed state. The component also handles cleaning up by removing the selected SIM reference when the dialog is closed or after a successful deletion.

The code uses a toast notification system to give feedback to users about whether the deletion was successful or failed, making the interface more user-friendly by keeping users informed about what's happening.

*/
