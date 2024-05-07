export const formatNumber = (number) => {
  if (typeof number !== "number" || isNaN(number)) {
    return "0";
  }
  return number.toLocaleString();
};

export const formatCurrency = (amount) => {
  if (typeof amount !== "number" || isNaN(amount)) {
    return "$0";
  }
  return `$${formatNumber(amount)}`;
};
