export const getSubscriptionCostPerDepartment = (allSims: any) => {
  const subscriptionCostPerDepartment = allSims.reduce((acc: any, sim: any) => {
    const department = sim.department || "Unknown";

    // Calculate total cost of all subscriptions for the current sim
    const totalCost = sim.subscriptions.reduce(
      (sum: number, subscription: any) => {
        return sum + subscription.price;
      },
      0
    );

    // Add the total cost to the respective department
    acc[department] = (acc[department] || 0) + totalCost;

    return acc;
  }, {});
  //   console.log("subscriptionCostPerDepartment", subscriptionCostPerDepartment);
  return subscriptionCostPerDepartment;
};
