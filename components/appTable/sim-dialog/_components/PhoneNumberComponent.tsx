import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";
import PhoneInput from "react-phone-number-input";
import { NumericFormat } from "react-number-format";
import "react-phone-number-input/style.css"; // import the css
import { Input } from "@/components/ui/input";

export const PhoneNumberComponent = () => {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext();

  const handlePhoneNumberChange = (value: string | undefined) => {
    setValue("simNumber", value || "", { shouldValidate: true }); // Update the form value
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="phone" className="text-slate-700">
        Numéro de la Sim
        <p className="text-[12px] text-gray-500 font-light">
          Entrez le numéro de la sim
        </p>
      </label>
      <PhoneInput
        inputComponent={Input}
        {...register("simNumber", {
          required: "Phone number is required",
        })}
        international
        defaultCountry="GA"
        placeholder="+241 66 25 58 41..."
        onChange={handlePhoneNumberChange}
        className="react-phone-number-input p-2 rounded-md max-w-60 shadow-none"
      />

      {/* error message */}
      {errors.simNumber && (
        <div className="text-red-500 flex gap-1 items-center text-[13px]">
          <MdError />
          <p>
            <>{errors.simNumber.message}</>
          </p>
        </div>
      )}
    </div>
  );
};
