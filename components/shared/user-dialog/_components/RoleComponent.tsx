"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { Dispatch, useEffect, useState } from "react";
import { Product } from "../../table/columns";
import { useFormContext } from "react-hook-form";
import useUserStore from "@/context/user-store";

interface CategoryComponentProps {
  selectedRole: string | any;
  setSelectedRole: Dispatch<React.SetStateAction<string>>;
}

export const RoleComponent: React.FC<CategoryComponentProps> = ({
  selectedRole,
  setSelectedRole,
}) => {
  const { setValue } = useFormContext(); // Access react-hook-form's context
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);
  const { loadUsers } = useUserStore();

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
    setValue("roles", [value]); // Update the roles value in the form
  };

  // const matchedRoles = availableRoles.filter((role) =>
  //   Object.values(Role).includes(role )
  // );

  // console.log("Available roles:", availableRoles);

  return (
    <div className="flex flex-col gap-2 poppins">
      <Label className="text-slate-600">{`User's Roles`}</Label>

      <Select value={selectedRole} onValueChange={handleRoleChange}>
        <SelectTrigger className="h-[45px] shadow-none">
          <SelectValue placeholder={"Assign a role"} />
        </SelectTrigger>
        <SelectContent className="poppins">
          {/* {matchedRoles.map((role) => (
            <SelectItem
              className="cursor-pointer hover:bg-secondary"
              key={role}
              value={role}
            >
              {role}
            </SelectItem>
          ))} */}
        </SelectContent>
      </Select>
    </div>
  );
};
