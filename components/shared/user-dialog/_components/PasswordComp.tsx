import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";

interface PasswordComponentProps {
  disabled?: boolean;
}

export const PasswordComponent = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mt-5 flex flex-col gap-2">
      <Label htmlFor="password" className="text-slate-600">{`Password`}</Label>
      <Controller
        name="password"
        control={control}
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters long",
          },
        }}
        render={({ field }) => (
          <Input
            {...field}
            type="password"
            id="password"
            className={`h-11 ${errors.password ? "border-red-500" : ""}`}
            placeholder="Enter your password"
          />
        )}
      />

      {errors.password && (
        <div className={`text-red-500 flex gap-1 items-center text-[13px]`}>
          <MdError />
          <p>
            <>{errors.password.message}</>
          </p>
        </div>
      )}
    </div>
  );
};
