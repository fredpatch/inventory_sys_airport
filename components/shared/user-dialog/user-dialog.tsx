"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

import React, { useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

import { PasswordComponent } from "./_components/PasswordComp";
import { ConfirmPasswordComponent } from "./_components/ConfirmPasswordComp";
import { EmailComponent } from "./_components/EmailComponent";
import { PhoneNumberComponent } from "./_components/PhoneNumberComponent";
import useUserStore from "@/context/user-store";
import { UserName } from "./_components/UserNameComp";
import { SkuComponent } from "./_components/SkuComponent";

const UserSchema = z.object({
  name: z
    .string()
    .min(1, "Username is required")
    .max(100, "Username must be less than 100 characters"),

  sku: z
    .string()
    .default(() => nanoid(5))
    .optional(),

  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone: z.string().min(1, "Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),

  confirmPassword: z
    .string()
    .refine((data: any) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }),
});

export const UpdateUserSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  phone: z
    .string()
    .regex(/^\+[0-9]{1,15}$/, "Invalid phone number format")
    .optional(),
  sku: z.string().optional(),
});

type UserFormValues = z.infer<typeof UserSchema> & {
  confirmPassword?: string;
};

const UserDialog = () => {
  const {
    addUser,
    updateUser,
    deleteUser,
    isLoading,
    openUserDialog,
    setOpenUserDialog,
    setSelectedUser,
    selectedUser,
  } = useUserStore();

  const methods = useForm<UserFormValues>({
    resolver: zodResolver(selectedUser ? UpdateUserSchema : UserSchema),
  });

  const { reset, setValue } = methods;

  const { toast } = useToast();
  const dialogCloseRef = useRef<HTMLButtonElement | null>(null);

  const onSubmit = async (data: UserFormValues) => {
    // Handle user creation logic here
    const { confirmPassword, password, ...userToAddOrUpdate } = data;
    // console.log("User data:", userToAddOrUpdate);

    // Ensure the phone number is correctly formatted
    let phoneNumber = userToAddOrUpdate.phone.replace(/\D/g, "");
    if (!phoneNumber.startsWith("+")) {
      phoneNumber = `+${phoneNumber}`;
    }

    try {
      let result;
      if (selectedUser) {
        result = await updateUser({
          ...selectedUser,
          ...userToAddOrUpdate,
          user_metadata: {
            phone: phoneNumber,
            sku: selectedUser.user_metadata.sku,
          },
        });
      } else {
        result = await addUser({
          ...userToAddOrUpdate,
          identities: [],
          blocked: false,
          email_verified: false,
          phone_verified: false,
          user_metadata: {
            phone: phoneNumber,
            sku: data.sku || "",
          },
          app_metadata: {},
          given_name: "",
          family_name: "",
          username: "",
          picture: "",
          connection: "Username-Password-Authentication", // Replace with your connection name
          nickname: "",
          password: data.password,
          verify_email: false,
        });
      }

      // console.log("User creation result:", result);

      if (result.success === true) {
        toast({
          title: "Success",
          description: `User ${data.name} has been ${
            selectedUser ? "updated" : "created"
          }.`,
        });
        // reset();
        setOpenUserDialog(false);
        dialogCloseRef.current?.click();
      } else {
        toast({
          title: "Error",
          description: `Failed to ${selectedUser ? "update" : "create"} user`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.message ||
          `Failed to ${selectedUser ? "update" : "create"} user`,
      });
      console.error(
        `Failed to ${selectedUser ? "update" : "create"} user:`,
        error
      );
    }
  };

  useEffect(() => {
    if (selectedUser) {
      /* Update form with selected user details when dialog opens */
      reset({
        name: selectedUser.name,
        email: selectedUser.email,
        phone: selectedUser.user_metadata?.phone,
      });
      setValue("sku", selectedUser.user_metadata?.sku);
    } else {
      reset({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [selectedUser, openUserDialog, setValue]);

  function handleReset() {
    reset();
    setSelectedUser(null);
  }

  return (
    <Dialog open={openUserDialog} onOpenChange={setOpenUserDialog}>
      <DialogTrigger asChild>
        <Button className="h-10">Add User</Button>
      </DialogTrigger>
      <DialogContent className="p-7 px-8 poppins max-w-5xl w-full">
        <DialogHeader>
          <DialogTitle className="text-[22px]">
            {selectedUser ? "Update User" : "Add User"}
          </DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new User
          </DialogDescription>
        </DialogHeader>
        <Separator />
        {/* Form */}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 mt-1">
              {/* First Row */}
              <div className="grid grid-cols-2 gap-7">
                <UserName />
                {!selectedUser && <SkuComponent />}
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-2 gap-5 items-start mt-4">
                <EmailComponent />
                <PhoneNumberComponent />
              </div>

              {/* Third Row */}
              <div className="mt-3 grid grid-cols-2 gap-5">
                {!selectedUser && (
                  <>
                    <PasswordComponent />
                    <ConfirmPasswordComponent />
                  </>
                )}
              </div>
            </div>
            <DialogFooter className="mt-9 mb-4 flex items-center gap-4">
              <DialogClose
                asChild
                ref={dialogCloseRef}
                onClick={() => {
                  handleReset();
                }}
              >
                <Button variant={"secondary"} className="h-11 px-11">
                  Cancel
                </Button>
              </DialogClose>
              <Button className="h-11 px-11">
                {isLoading
                  ? "loading..."
                  : `${selectedUser ? "Update User" : "Add User"}`}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog;
