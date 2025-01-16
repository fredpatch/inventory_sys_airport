"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect } from "react";

import { InkDataTable } from "./ink-data-table";
import { columns as getColumns } from "./column/columns";
import { useInkStore } from "@/context/ink-store";

const InkTable = () => {
  const { allInks, loadInks, totalInks, setTotalInks, setModel, model } =
    useInkStore();

  const fetchInks = async () => {
    await loadInks();
    await setModel();
    await setTotalInks();
  };

  useEffect(() => {
    fetchInks();
  }, []);

  return (
    <div>
      <Card className="mt-5 flex flex-col shadow-none poppins border-none">
        <CardHeader className="flex justify-between p-2">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <CardTitle className="font-bold text-[32px] text-emerald-500 dark:text-emerald-400">
                Gestion des Encres
              </CardTitle>
              <p className="text-[16px] font-medium text-slate-600 dark:text-slate-200">
                {totalInks} cartouche(s) d'encre en stock
              </p>
            </div>
            {/* <AddProductDialog /> */}
          </div>
        </CardHeader>

        <CardContent>
          <InkDataTable data={allInks} columns={getColumns()} />
        </CardContent>
      </Card>
    </div>
  );
};

export default InkTable;
