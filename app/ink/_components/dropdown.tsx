"use client";

import React from "react";
import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { InkModel } from "@/lib/helpers";
import { useInkStore } from "@/context/ink-store";

type MenuItem = {
  icon: React.ReactNode;
  label: string;
  className: string;
  separator?: boolean;
};

export const InkDropdown = ({ row }: { row: Row<InkModel> }) => {
  const { setSelectedInk, setOpenDialog, setOpenInkDialog } = useInkStore();

  const menuItems: MenuItem[] = [
    { icon: <FaRegEdit />, label: "Edit", className: "cursor-pointer" },
    { icon: null, label: "", className: "", separator: true },
    {
      icon: <MdOutlineDelete className="text-lg" />,
      label: "Delete",
      className: "text-red-600 cursor-pointer",
    },
  ];

  const handleClickedItem = async (item: MenuItem) => {
    if (item.label === "Delete") {
      setOpenDialog(true);
      setSelectedInk(row.original);
    }

    if (item.label === "Edit") {
      setOpenInkDialog(true);
      setSelectedInk(row.original);
    }
  };

  return (
    <div>
      <DropdownMenu>
        {/* Trigger Dropdown */}
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="poppins" align="end">
          <DropdownMenuLabel className="poppins font-medium flex items-center justify-center">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {menuItems.map((item, index) =>
            item.separator ? (
              <DropdownMenuSeparator key={index} />
            ) : (
              <DropdownMenuItem
                key={index}
                className={`flex items-center gap-1 p-[10px] ${item.className}`}
                onClick={() => handleClickedItem(item)}
              >
                {item.icon}
                <span>{item.label}</span>
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
