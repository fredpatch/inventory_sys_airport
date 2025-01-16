"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";
import { ArrowUpDown } from "lucide-react";
import { UserDropdown } from "./user-dropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/context/user-store";

type SortableHeaderProps = {
  column: Column<User, unknown>; // Specify the type of data
  label: string;
};

const SortableHeader: React.FC<SortableHeaderProps> = ({ column, label }) => {
  const isSorted = column.getIsSorted();
  const SortingIcon =
    isSorted == "asc"
      ? IoMdArrowDown
      : isSorted == "desc"
      ? IoMdArrowUp
      : ArrowUpDown;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={`flex items-start py-[14px] select-none cursor-pointer p-2 gap-1 ${
            isSorted && "text-primary"
          }`}
          aria-label={`Sort by ${label} ${isSorted == "asc" ? "asc" : "desc"}`}
        >
          {label}
          <SortingIcon className="ml-2 h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="bottom">
        <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
          <IoMdArrowUp className="mr-2 h-4 w-4" />
          Asc
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
          <IoMdArrowDown className="mr-2 h-4 w-4" />
          Desc
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const users_columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column} label="Name" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortableHeader column={column} label="Email" />,
    cell: ({ row }) => {
      const user = row.original;
      const identity = user.identities[0];
      if (identity?.isSocial) {
        return <span>social: {identity.provider}</span>;
      }
      return <span>{user.email}</span>;
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <SortableHeader column={column} label="Created At" />
    ),
    cell: ({ getValue }) => {
      const value = getValue<string | null>();
      if (!value) {
        return <span>Never</span>;
      }
      const date = new Date(value);
      return (
        <span>
          {date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}{" "}
        </span>
      );
    },
  },
  {
    accessorKey: "last_login",
    header: ({ column }) => (
      <SortableHeader column={column} label="Dernière Connection" />
    ),
    cell: ({ getValue }) => {
      const value = getValue<string | null>();
      if (!value) {
        return <span>Never</span>;
      }
      const date = new Date(value);
      return (
        <span>
          {date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}{" "}
          {date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      );
    },
  },
  {
    accessorKey: "roles",
    header: ({ column }) => <SortableHeader column={column} label="Role" />,
    cell: ({ getValue }) => {
      const roles =
        getValue<{ id: string; name: string; description: string }[]>();
      if (!roles || roles.length === 0) {
        return <span>No Roles set yet</span>;
      }

      return <span>{roles.map((role) => role.name).join(", ")}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <UserDropdown row={row} />;
    },
  },
];
