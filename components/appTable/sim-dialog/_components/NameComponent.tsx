import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";
import { IconSelector } from "../icon-selector";

export const NameComponent = ({
  onSelectedIcon,
}: {
  onSelectedIcon: (selectedIcon: React.ReactNode) => void;
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  function getSelectedIcon(selectedIcon: React.ReactNode) {
    onSelectedIcon(selectedIcon);
  }
  return (
    <div className="mt-5 flex flex-col gap-2">
      <Label htmlFor="product-name" className="text-slate-700">
        {`Nom de l'utilisateur`}
        <p className="text-[12px] mt-1 text-gray-500 font-light">
          Entrez le nom de l'utilisateur qui possède la sim.
        </p>
      </Label>
      <div className="flex gap-2 items-center">
        <Input
          {...register("name")}
          type="text"
          id="product-name"
          className="h-11 shadow-none"
          placeholder="John Doe"
        />
        <IconSelector onUpdateIcon={getSelectedIcon} />
      </div>

      {/* Error message */}
      {errors.name && (
        <div className="text-red-500 flex gap-1 items-center text-[13px]">
          <MdError />
          <p>
            <>{errors.name.message}</>
          </p>
        </div>
      )}
    </div>
  );
};
