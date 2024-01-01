export const getCurrencySymbols = (value: string): string => {
  switch (value) {
    case "cad":
      return "CA$";
    case "eur":
      return "€";
    case "myr":
      return "RM"; // Malaysian Ringgit
    default:
      return "$";
  }
};

export const formatDate = () => {
  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return formattedDate;
};
