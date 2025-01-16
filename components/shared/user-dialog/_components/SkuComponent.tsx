import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { MdError } from "react-icons/md";
import { nanoid } from "nanoid";

export const SkuComponent = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    // Generate a unique SKU using nanoid and set it as the default value
    const generatedSku = nanoid(5);
    setValue("sku", generatedSku);
  }, [setValue]);

  return (
    <div className="mt-5 flex flex-col gap-2">
      <Label htmlFor="sku" className="text-slate-600">{`Sku`}</Label>
      <Input
        {...register("sku")}
        type="text"
        name="sku"
        id="sku"
        className="h-11 shadow-none"
        placeholder="ABC001"
        readOnly // prevent users from modifying the SKU
        disabled // prevent users from modifying the SKU
      />

      {errors.sku && (
        <div className={`text-red-500 flex gap-1 items-center text-[13px]`}>
          <MdError />
          <p>
            <>{errors.sku.message}</>
          </p>
        </div>
      )}
    </div>
  );
};
