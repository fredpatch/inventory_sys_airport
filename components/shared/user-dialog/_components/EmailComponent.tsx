import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";

export const EmailComponent = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col gap-2">
      <Label
        htmlFor="email-address"
        className="text-slate-600"
      >{`User's Email`}</Label>
      <Input
        {...register("email")}
        type="email"
        id="email-address"
        className="h-11 shadow-none"
        placeholder="example@example.com"
      />

      {errors.email && (
        <div className={`text-red-500 flex gap-1 items-center text-[13px]`}>
          <MdError />
          <p>
            <>{errors.email.message}</>
          </p>
        </div>
      )}
    </div>
  );
};
