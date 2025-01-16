export const getStatusBreakdown = (allSims: any) => {
  const total = allSims.length;
  const breakdown = allSims.reduce(
    (acc: any, sim: any) => {
      acc[sim.status] = (acc[sim.status] || 0) + 1;

      return acc;
    },
    { Active: 0, Inactive: 0, Draft: 0 }
  );

  return {
    Active: Number((breakdown.Active / total).toFixed(2)) * 100 || 0,
    Inactive: Number((breakdown.Inactive / total).toFixed(2)) * 100 || 0,
    Draft: Number((breakdown.Draft / total).toFixed(2)) * 100 || 0,
  };
};
