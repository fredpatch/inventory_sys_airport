import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";

export const UserName = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mt-5 flex flex-col gap-2">
      <Label htmlFor="user-name" className="text-slate-600">
        {`Nom de l'utilisateur`}
      </Label>
      <div className="flex gap-2 items-center">
        <Input
          {...register("name")}
          type="text"
          id="user-name"
          className="h-11 shadow-none"
          placeholder="User's Name"
        />
      </div>

      {/* error message */}
      {errors.name && (
        <div className="text-red-500 flex gap-1 items-center text-[13px]">
          <MdError />
          <p>The user's name is required</p>
        </div>
      )}
    </div>
  );
};
