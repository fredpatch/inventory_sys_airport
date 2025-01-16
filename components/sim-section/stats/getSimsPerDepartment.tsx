export const getSimsPerDepartment = (allSims: any) => {
  const simsPerDepartment = allSims.reduce((acc: any, sim: any) => {
    const department = sim.department || "Unknown";
    acc[department] = (acc[department] || 0) + 1;
    return acc;
  }, {});

  return simsPerDepartment;
};
