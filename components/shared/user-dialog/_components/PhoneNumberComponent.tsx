"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";

export const PhoneNumberComponent = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let phoneNumber = event.target.value;

    // Remove all non-numeric characters
    phoneNumber = phoneNumber.replace(/\D/g, "");

    // Add the country code if it's missing
    if (!phoneNumber.startsWith("+")) {
      phoneNumber = `+${phoneNumber}`;
    }

    setValue("phone", phoneNumber);
  };

  return (
    <div className="flex flex-col gap-2 pt-[6px]">
      <Label
        htmlFor="phone"
        className="text-slate-600"
      >{`Phone Number`}</Label>

      <Input
        {...register("phone")}
        type="text"
        id="phone"
        className="h-11 shadow-none"
        placeholder="Enter your phone number"
        onChange={handlePhoneNumberChange}
      />

      {/* error message */}
      {errors.phone && (
        <div className={`text-red-500 flex gap-1 items-center text-[13px]`}>
          <MdError />
          <p>{String(errors.phone.message)}</p>
        </div>
      )}
    </div>
  );
};
