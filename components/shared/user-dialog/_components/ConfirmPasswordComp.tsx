import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";

export const ConfirmPasswordComponent = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const password = watch("password");
  const passwordConfirm = watch("confirmPassword");

  const passwordMatch =
    password && passwordConfirm && password === passwordConfirm;
  const passwordMatchError = passwordConfirm && password !== passwordConfirm;

  return (
    <div className="mt-5 flex flex-col gap-2">
      <Label htmlFor="confirmPassword" className="text-slate-600">
        Confirm Password
      </Label>
      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          validate: (value) => value === password || "Passwords don't match",
        }}
        render={({ field }) => (
          <Input
            {...field}
            type="password"
            id="confirmPassword"
            className={`h-11 ${passwordMatch ? "border-green-500" : ""} ${
              passwordMatchError ? "border-red-500" : ""
            }`}
            placeholder="Confirm your password"
          />
        )}
      />

      {passwordMatchError && (
        <div className="text-red-500 flex gap-1 items-center text-[13px]">
          <MdError />
          <span>Passwords don't match</span>
        </div>
      )}

      {!passwordConfirm && (
        <div className="text-red-500 flex gap-1 items-center text-[13px]">
          <MdError />
          <span>Confirm Password</span>
        </div>
      )}
    </div>
  );
};
