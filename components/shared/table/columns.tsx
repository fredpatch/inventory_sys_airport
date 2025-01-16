"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SimDropdown } from "./sim-dropdown";

import React, { ReactNode } from "react";
import DateComponent from "../DateComponent";
import { SimHolder, SortableHeader } from "@/lib/helpers";
import { Badge } from "@/components/ui/badge";
import { FaCheck, FaInbox } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export const columns = (): ColumnDef<SimHolder>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => <SortableHeader column={column} label="ID" />,
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
    accessorKey: "issuedDate",
    header: ({ column }) => (
      <SortableHeader column={column} label="Date de creation" />
    ),
    cell: ({ getValue }) => {
      const date = getValue<any>();
      return <DateComponent creationDate={date} dateString={null} />;
    },
  },
  {
    accessorKey: "name",
    cell: ({ row }) => {
      const Icon = row.original.icon; // Access the icon from the original data
      const name = row.original.name;
      return (
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-sm bg-primary/10 text-primary">
            {Icon}
          </div>
          <span>{name}</span>
        </div>
      );
    },
    header: ({ column }) => (
      <SortableHeader column={column} label="Nom & Prenom" />
    ),
  },
  {
    accessorKey: "department",
    header: ({ column }) => (
      <SortableHeader column={column} label="Departement" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.original.department}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "simNumber",
    header: ({ column }) => (
      <SortableHeader column={column} label="Numero SIM" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <span>{row.original.simNumber}</span>
        </div>
      );
    },
  },
  {
    filterFn: "multiSelect",
    accessorKey: "status",
    header: ({ column }) => <SortableHeader column={column} label="Status" />,
    cell: ({ row }) => {
      const status = row.original.status;
      let colorClass;
      let icon: ReactNode;
      switch (status) {
        case "Active":
          colorClass = "text-green-600 bg-green-100";
          icon = <FaCheck className="text-[12px]" />;
          break;
        case "Draft":
          colorClass = "text-gray-600 bg-gray-200";
          icon = <FaInbox />;
          break;
        case "Inactive":
          colorClass = "text-red-600 bg-red-100";
          icon = <IoClose />;
          break;
        default:
          colorClass = "text-gray-600 bg-gray-200";
          icon = <FaInbox />;
      }
      return (
        <span
          className={`px-3 py-[2px] justify-center rounded-full font-medium ${colorClass} flex gap-1 items-center w-fit`}
        >
          {icon}
          <span className="text-[13px]">{status}</span>
        </span>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <SortableHeader column={column} label="Dernière MAJ" />
    ),
    cell: ({ getValue }) => {
      const date = getValue<any>();
      return <DateComponent dateString={date} creationDate={null} />;
    },
  },
  {
    filterFn: "multiSelect",
    accessorKey: "subscriptions",
    header: ({ column }) => (
      <SortableHeader column={column} label="Abonnements" />
    ),
    cell: ({ row }) => {
      const subscriptions = row.original.subscriptions;

      // console.log(subscriptions);
      return (
        <div className="flex items-center gap-2">
          {subscriptions.map((subscription: any, index: number) => (
            <Badge key={index} variant={"outline"} className="bg-gray-200">
              <span className="text-[12px] dark:text-gray-500">
                {subscription?.label}
              </span>
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "cost",
    header: ({ column }: any) => (
      <SortableHeader column={column} label="Montant HT" />
    ),
    cell: ({ getValue }: any) => {
      return (
        <div className="flex items-center justify-center">
          <>{`${getValue().toFixed(0)}`}</>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <SimDropdown row={row} />;
    },
  },
];
