import { format } from "date-fns";
import { ja } from "date-fns/locale";

export const formatDateWithWeekday = (date: Date): string => {
  return format(date, "yyyy年MM月dd日(E)", { locale: ja });
};

export const formatDateToYYYYMM = (date: Date): string => {
  return format(date, "yyyy年MM月", { locale: ja });
};
