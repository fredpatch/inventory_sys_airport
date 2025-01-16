import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Column } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";
import { ReactNode } from "react";
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";

export type SimHolder = {
  id: number;
  simNumber: string;
  name: string;
  department: string;
  status: "Active" | "Inactive" | "Draft";
  subscriptions: string[];
  cost: number;

  issuedDate: Date;
  updatedAt: Date;
  icon: ReactNode;
};

export type InkModel = {
  id: number;
  model: string;
  color: string;
  quantity: number;

  savedDate: Date;
  updatedAt: Date;
  icon: ReactNode;
};

export type SimFormDataToSend = {
  simNumber: string;
  name: string | undefined;
  department: string;
  status: "Active" | "Inactive" | "Draft";
  subscriptions: string[];
  cost: number;
  icon: ReactNode;
};

export type SimFormDataToUpdate = {
  id: any;
  simNumber: string;
  name: string | undefined;
  department: string;
  status: "Active" | "Inactive" | "Draft";
  subscriptions: string[];
  cost: number;
  icon: ReactNode;
};

type SortableHeaderProps = {
  column: Column<SimHolder, unknown>; // Specify the type of data
  label: string;
};

type SortableHeaderInkProps = {
  column: Column<InkModel, unknown>; // Specify the type of data
  label: string;
};

export const SortableHeaderInk: React.FC<SortableHeaderInkProps> = ({
  column,
  label,
}) => {
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

export const SortableHeader: React.FC<SortableHeaderProps> = ({
  column,
  label,
}) => {
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

// const StockLevelCell: React.FC<{ row: SimHolder }> = ({ row }) => {
//     const isCritical = row.quantityInStock < row.criticalStockLevel;
//     const isApproachingCritical =
//       row.quantityInStock < row.criticalStockLevel * 1.5 && !isCritical;
//     const textColor = isCritical
//       ? "text-red-600"
//       : isApproachingCritical
//       ? "text-yellow-600"
//       : "text-green-600";
//     const Icon = isCritical
//       ? MdDangerous
//       : isApproachingCritical
//       ? MdWarning
//       : MdCheckCircle;

//     return (
//       <div className={`flex items-center space-x-2 ${textColor} justify-center`}>
//         <span>{row.quantityInStock}</span>
//         <Icon />
//       </div>
//     );
//   };
