"use client";

import { ColumnDef } from "@tanstack/react-table";

import React from "react";
import { InkModel, SortableHeaderInk } from "@/lib/helpers";
import { Badge } from "@/components/ui/badge";
import DateComponent from "@/components/shared/DateComponent";
import { InkDropdown } from "../dropdown";
import { FaBoxOpen } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";
import { MdOutlineInventory2 } from "react-icons/md";

export const columns = (): ColumnDef<InkModel>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => <SortableHeaderInk column={column} label="ID" />,
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <div className="text-center">
          <Badge variant={"secondary"}>{id}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "savedDate",
    header: ({ column }) => (
      <SortableHeaderInk column={column} label="Date de creation" />
    ),
    cell: ({ getValue }) => {
      const date = getValue<any>();
      return <DateComponent creationDate={date} dateString={null} />;
    },
  },
  {
    accessorKey: "model",
    cell: ({ row }) => {
      const Icon = row.original.icon; // Access the icon from the original data
      const model = row.original.model;
      return (
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-sm bg-primary/10 text-primary">
            {Icon}
          </div>
          <span>{model}</span>
        </div>
      );
    },
    header: ({ column }) => (
      <SortableHeaderInk column={column} label="Model de l'encre" />
    ),
  },
  {
    accessorKey: "color",
    cell: ({ row }) => {
      const color = row.original.color;
      // Map color names to CSS color values
      const colorMap: { [key: string]: string } = {
        black: "#000000",
        yellow: "#FFD700",
        magenta: "#FF00FF",
        cyan: "#00FFFF",
        // Add more colors as needed
      };

      return (
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-full border border-gray-200"
            style={{
              backgroundColor: colorMap[color.toLowerCase()] || color,
            }}
          />
          <span>{color}</span>
        </div>
      );
    },
    header: ({ column }) => (
      <SortableHeaderInk column={column} label="Couleur" />
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <SortableHeaderInk column={column} label="Quantite en stock" />
    ),
    cell: ({ row }) => {
      const quantity = row.original.quantity;

      // Define status based on quantity
      const getStockStatus = (qty: number) => {
        if (qty <= 0)
          return {
            icon: FaBoxOpen,
            color: "text-red-500",
            label: "Rupture de stock",
          };
        if (qty <= 2)
          return {
            icon: IoWarning,
            color: "text-amber-500",
            label: "Stock faible",
          };
        return {
          icon: MdOutlineInventory2,
          color: "text-emerald-500",
          label: "En stock",
        };
      };

      const status = getStockStatus(quantity);
      const StatusIcon = status.icon;

      return (
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1.5 ${status.color}`}>
            <StatusIcon className="w-4 h-4" />
            <span>{quantity}</span>
          </div>
          <Badge variant="secondary" className={`text-xs ${status.color}`}>
            {status.label}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <SortableHeaderInk column={column} label="Dernière MAJ" />
    ),
    cell: ({ getValue }) => {
      const date = getValue<any>();
      return <DateComponent dateString={date} creationDate={null} />;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      return <InkDropdown row={row} />;
    },
  },
];
