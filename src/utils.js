export const formatCurrency = (value) => {
  if (value && value.replace) {
    value = value.replace(/[^0-9]/g, "");
  }
  if (!Number.isNaN(value)) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value / 100);
  }
  return "";
};
