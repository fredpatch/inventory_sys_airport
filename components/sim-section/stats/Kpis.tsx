import React from "react";
import { useSimStore } from "@/context/sim-store";

const KPIs = () => {
  const { totalSims, activeSims, inactiveSims, draftSims, averageCost } =
    useSimStore();

  return (
    <div className="flex items-center gap-4 pt-2">
      <div className="kpi">
        <h3>Total SIMs</h3>
        <p>{totalSims}</p>
      </div>
      <div className="kpi">
        <h3>Active SIMs</h3>
        <p>{activeSims}</p>
      </div>
      <div className="kpi">
        <h3>Inactive SIMs</h3>
        <p>{inactiveSims}</p>
      </div>
      <div className="kpi">
        <h3>Draft SIMs</h3>
        <p>{draftSims}</p>
      </div>
      <div className="kpi">
        <h3>Average Cost</h3>
        <p>{averageCost.toFixed(2)} FCFA</p>
      </div>
    </div>
  );
};

export default KPIs;
