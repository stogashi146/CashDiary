import { format } from "date-fns";
import { ja } from "date-fns/locale";

export const formatDateWithWeekday = (date: Date): string => {
  return format(date, "yyyy年MM月dd日(E)", { locale: ja });
};

// 文字列YYYY-MM-DDを受け取って、日付と曜日を返す関数
export const formatDateStringWithWeekday = (date: string): string => {
  const dateObj = new Date(date);
  return format(dateObj, "yyyy年MM月dd日(E)", { locale: ja });
};

export const formatDateToYYYYMM = (date: Date): string => {
  return format(date, "yyyy年MM月", { locale: ja });
};

export const formatDateToYYYYMMDD = (date: Date): string => {
  return format(date, "yyyy-MM-dd", { locale: ja });
};

// 文字列をDate型に変換する関数
export const parseDate = (date: string): Date => {
  return new Date(date);
};
