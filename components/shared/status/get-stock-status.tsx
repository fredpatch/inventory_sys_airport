export const getStockStatus = (
  quantity: number,
  criticalValue: number
): string => {
  if (quantity > criticalValue) return "In Stock";
  if (quantity < criticalValue) return "Out Of Stock";
  return "Low";
};
