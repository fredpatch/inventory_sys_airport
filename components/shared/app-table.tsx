"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { SimTable } from "../sim-section/sim-table";
import { columns as getColumns } from "./table/columns";
import { useSimStore } from "@/context/sim-store";
import AddProductDialog from "../appTable/sim-dialog/add-sim-dialog";

const AppTable = () => {
  const { allSims, loadSims, totalCost, updateKPIs } = useSimStore();

  const fetchProducts = async () => {
    await loadSims();
    updateKPIs();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Card className="mt-5 flex flex-col shadow-none poppins border-none">
        <CardHeader className="flex justify-between p-2">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <CardTitle className="font-bold text-[32px] text-emerald-500 dark:text-emerald-400">
                Gestion des Sims
              </CardTitle>
              <p className="text-[16px] font-medium text-slate-600 dark:text-slate-200">
                {allSims.length} Sim enregistrees
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-200">
                <span className="text-[16px] text-slate-600 font-medium flex items-center gap-2 dark:text-slate-200">
                  {totalCost().toLocaleString("en-EN")} FCFA
                </span>
              </p>
            </div>
            <AddProductDialog />
            {/* <StatsChart data={chartData} /> */}
          </div>
        </CardHeader>

        <CardContent>
          <SimTable data={allSims} columns={getColumns()} />
        </CardContent>
      </Card>
    </>
  );
};

export default AppTable;
