import React, { JSX } from "react";
import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import useUserStore, { User } from "@/context/user-store";

type MenuItem = {
  icon: React.ReactNode;
  label: string;
  className: string;
  separator?: undefined;
};

export const UserDropdown = ({ row }: { row: Row<User> }) => {
  // console.log(row);

  const { setOpenDialog, setOpenUserDialog, setSelectedUser } = useUserStore();

  const { toast } = useToast();

  const menuItems: MenuItem[] = [
    // { icon: <MdContentCopy />, label: "Copy", className: "" },
    { icon: <FaRegEdit />, label: "Edit", className: "" },
    {
      icon: <MdOutlineDelete className="text-lg" />,
      label: "Delete",
      className: "text-red-600",
    },
  ];

  const handleClickedItem = async (item: MenuItem) => {
    if (item.label === "Delete") {
      setOpenDialog(true);
      setSelectedUser(row.original);
    }

    if (item.label === "Edit") {
      setOpenUserDialog(true);
      setSelectedUser(row.original);
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
        <DropdownMenuContent className="poppins">
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
