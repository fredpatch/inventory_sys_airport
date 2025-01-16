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
import useUserStore from "@/context/user-store";
import { useToast } from "@/hooks/use-toast";

export const DeleteDialogUser = () => {
  const { toast } = useToast();

  // console.log(`function fired`);
  const {
    isLoading,
    openDialog,
    setOpenDialog,
    setSelectedUser,
    selectedUser,
    deleteUser,
  } = useUserStore();

  const deleteUserFn = async () => {
    if (selectedUser) {
      const user_id = selectedUser.user_id;
      const result = await deleteUser(user_id!);
      if (result.success) {
        toast({
          title: "User Deleted",
          description: `The User [${selectedUser.name}] has been deleted successfully`,
        });

        setOpenDialog(false);
        setSelectedUser(null);
      } else {
        toast({
          title: "Error",
          description: "Failed to delete the user.",
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
      defaultOpen={true}
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
              setSelectedUser(null);
              setOpenDialog(false);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={deleteUserFn}>
            {isLoading ? "deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
