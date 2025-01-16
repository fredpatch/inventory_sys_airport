import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";

export const DepartmentComponent = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mt-5 flex flex-col gap-2">
      <Label htmlFor="department-name" className="text-slate-700">
        {`Nom du département`}
        <p className="text-[12px] mt-1 text-gray-500 font-light">
          Entrez le nom du département de l'utilisateur qui possède la sim.
        </p>
      </Label>
      <Input
        {...register("department")}
        type="text"
        id="department-name"
        className="h-11 shadow-none"
        placeholder="IT & Telecom from TechWorld"
      />

      {/* error message */}
      {errors.department && (
        <div className="text-red-500 flex gap-1 items-center text-[13px]">
          <MdError />
          <p>Le nom du département est requis</p>
        </div>
      )}
    </div>
  );
};
