"use client";

import { SimsPerDepartmentChart } from "@/components/sim-section/charts/SimsPerDepartmentChart";
import { StatusBreakdownChart } from "@/components/sim-section/charts/StatusBreakdownChart";
import { SubscriptionCostPerDepartment } from "@/components/sim-section/charts/SubscriptionCostPerDepartment";
import { useSimStore } from "@/context/sim-store";
import { useEffect } from "react";

export default function Dashboard() {
  const { loadSims, updateKPIs } = useSimStore();

  const fetchProducts = async () => {
    await loadSims();
    updateKPIs();
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="grid grid-cols-3 border-none shadow-none p-3 h-full">
      {/* <Card className="grid grid-cols-3 shadow-none p-5 gap-8"> */}
      <StatusBreakdownChart />
      <SimsPerDepartmentChart />
      <SubscriptionCostPerDepartment />
      {/* <SubscriptionCostPerDepartment />
        <SubscriptionCostPerDepartment />
        <SubscriptionCostPerDepartment /> */}
      {/* <StatusBreakdownChart /> */}
      {/* </Card> */}
    </div>
  );
}
