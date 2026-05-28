export const cleanFloatingValues = (n: number): number => (Math.abs(n) < 0.000001 ? 0 : n);

export const formatCurrency = (value: number): string => {
  const cleaned = cleanFloatingValues(value);
  const sign = cleaned < 0 ? "-" : "";
  const abs = Math.abs(cleaned);
  return `${sign}₹${abs.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const formatNumber = (value: number, max = 6): string => {
  const cleaned = cleanFloatingValues(value);
  return cleaned.toLocaleString("en-IN", { maximumFractionDigits: max });
};
