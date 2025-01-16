"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

// import { ExportButtons } from "../shared/export-buttons";
import { exportToCSV } from "@/utils/export-to-csv";
import { useSimStore } from "@/context/sim-store";
import { CategoryDropdown } from "@/components/appTable/dropdown/subscription-dropdown";
import { ExportButtons } from "@/components/shared/export-buttons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginationSelection } from "@/components/shared/table/pagination-selection";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useInkStore } from "@/context/ink-store";

// Define custom filter types
declare module "@tanstack/table-core" {
  interface FilterFns {
    multiSelect: FilterFn<unknown>;
  }
}

interface GlobalFilter {
  globalFilter: any;
}

const multiSelectFilter: FilterFn<unknown> = (
  row,
  columnId,
  filterValue: string[]
) => {
  const value = row.getValue(columnId);

  // console.log("Filter Value:", filterValue);
  // console.log("Get Value:", row);
  // console.log("Row Value:", value); // Log the row value for debugging

  if (Array.isArray(value)) {
    return value.some((val) =>
      String(val.label)
        .toLowerCase()
        .includes(filterValue.join(",").toLowerCase())
    );
  }

  return false;
};

export interface PaginationType {
  pageIndex: number;
  pageSize: number;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export const InkDataTable = <TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  const [pagination, setPagination] = React.useState<PaginationType>({
    pageIndex: 0,
    pageSize: 6,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const [selectedSubscriptions, setSelectedSubscriptions] = useState<string[]>(
    []
  );
  const [globalFilter, setGlobalFilter] = useState<any>([]);

  useEffect(() => {
    // setColumnFilters((prev) => {
    // Remove both status and subscription filters if no statuses are selected
    //   const baseFilters = prev.filter(
    //     (filter) => filter.id !== "status" && filter.id !== "subscriptions"
    //   );

    const newFilters = "";
    //   [...baseFilters];

    // Add status filter if there are selected statuses
    //   if (selectedStatuses.length > 0) {
    //     newFilters.push({
    //       id: "status",
    //       value: selectedStatuses,
    //     });
    //   }

    // console.log(`New Column filters: ${newFilter}`);
    //   return newFilters;
    // });
    // Set Initial sorting to the created at column
    setSorting([
      {
        id: "savedDate",
        desc: true,
      },
    ]);
  }, [selectedSubscriptions]);

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      columnFilters,
      sorting,
      globalFilter,
    },
    filterFns: {
      multiSelect: multiSelectFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleExportCSV = () => {
    const filteredData = table
      .getFilteredRowModel()
      .rows.map((row) => row.original);
    exportToCSV(filteredData, "filtered-table-data.csv");
  };

  const { allInks, model } = useInkStore();

  return (
    <div className="poppins">
      <div className="flex flex-col gap-3 mb-8 mt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 w-[30%] ">
            {/* global search */}
            <Input
              value={table.getAllColumns()[0].getFilterValue() as string}
              onChange={(event) => table.setGlobalFilter(event.target.value)}
              placeholder={`Rechercher parmis ${model} modeles disponible...`}
              className="w-full h-10"
            />
          </div>
          <div className="flex items-center gap-4">
            {/* <StatusDropdown
              selectedStatuses={selectedStatuses}
              setSelectedStatuses={setSelectedStatuses}
            /> */}
            {/* <CategoryDropdown
              selectedSubscriptions={selectedSubscriptions}
              setSelectedSubscriptions={setSelectedSubscriptions}
            /> */}
            <ExportButtons onExportCSV={handleExportCSV} />
          </div>
        </div>

        {/* filter area */}
        <FilterArea
          selectedStatuses={selectedStatuses}
          setSelectedStatuses={setSelectedStatuses}
          selectedSubscriptions={selectedSubscriptions}
          setSelectedSubscriptions={setSelectedSubscriptions}
        />
      </div>

      {/* table */}
      <div className="rounded-sm border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* pagination */}
      <div className="flex items-center justify-between mt-5">
        <PaginationSelection
          pagination={pagination}
          setPagination={setPagination}
        />

        {/* pagination buttons */}
        <div className="flex gap-6 items-center">
          <span className="text-sm text-gray-500">
            Page {pagination.pageIndex + 1} / {table.getPageCount()}
          </span>
          <div className="flex items-center justify-end space-x-2 py-4">
            {/* First page button */}
            <Button
              variant={"outline"}
              className="size-9 w-12"
              size={"sm"}
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <BiFirstPage />
            </Button>

            {/* Previous page button */}
            <Button
              variant={"outline"}
              className="size-9 w-12"
              size={"sm"}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <GrFormPrevious />
            </Button>

            {/* Next Page Button */}
            <Button
              className="size-9 w-12"
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <GrFormNext />
            </Button>

            {/* Last Page Button */}
            <Button
              className="size-9 w-12"
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <BiLastPage />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

function FilterArea({
  selectedStatuses,
  setSelectedStatuses,
  selectedSubscriptions,
  setSelectedSubscriptions,
}: {
  selectedStatuses: string[];
  setSelectedStatuses: Dispatch<SetStateAction<string[]>>;
  selectedSubscriptions: string[];
  setSelectedSubscriptions: Dispatch<SetStateAction<string[]>>;
}) {
  return (
    <div className="flex gap-3">
      {/* status */}
      {selectedStatuses.length > 0 && (
        <div className="border-dashed border rounded-sm p-1 flex gap-2 items-center px-2 text-sm">
          <span className="text-gray-600">Status</span>
          <Separator orientation="vertical" />
          <div className="flex gap-2 items-center">
            {selectedStatuses.length < 3 ? (
              <>
                {selectedStatuses.map((status, index) => (
                  <Badge key={index} variant={"secondary"}>
                    {status}
                  </Badge>
                ))}
              </>
            ) : (
              <>
                <Badge variant={"secondary"}>3 Selected</Badge>
              </>
            )}
          </div>
        </div>
      )}

      {/* category */}
      {/* {selectedSubscriptions.length > 0 && (
        <div className="border-dashed border rounded-sm p-1 flex gap-2 items-center px-2 text-sm">
          <span className="text-gray-600">Abonnements</span>
          <Separator orientation="vertical" />
          <div className="flex gap-2 items-center">
            {selectedSubscriptions.length < 3 ? (
              <>
                {selectedSubscriptions.map((category, index) => (
                  <Badge key={index} variant={"secondary"}>
                    {category}
                  </Badge>
                ))}
              </>
            ) : (
              <>
                <Badge variant={"secondary"}>
                  {selectedSubscriptions.length} selected
                </Badge>
              </>
            )}
          </div>
        </div>
      )} */}

      {/* {selectedSubscriptions.length > 0 && (
        <Button
          onClick={() => {
            setSelectedSubscriptions([]);
            setSelectedStatuses([]);
          }}
          variant={"ghost"}
          className="p-1 px-2"
        >
          <span>Reset</span>
          <IoClose />
        </Button>
      )} */}
    </div>
  );
}
