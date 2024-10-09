export const formatMoney = (amount: number | undefined): string => {
  if (amount === undefined) {
    return "N/A";
  }

  const formattedMoney = new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 0,
  }).format(amount);

  return `${formattedMoney}₺`;
};

export const formatInput = (amount: string): string => {
  if (amount === undefined) {
    return "";
  }

  const formattedMoney = new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 0,
  }).format(parseInt(amount));

  return `${formattedMoney}`;
};
