import { useEffect, useState } from "react";

export const useCalcAmountSummary = (balances: CashBalanceData[]) => {
  const [calculatedAmountSummary, setCalculatedAmountSummary] =
    useState<AmountSummaryData>({
      expense: 0,
      income: 0,
      total: 0,
      directionType: "zero",
    });

  const calcAmountSummary = () => {
    let expense = 0;
    let income = 0;
    balances.forEach((balance) => {
      if (balance.incomeExpenseType === "expense") {
        expense += balance.amount;
      } else {
        income += balance.amount;
      }
    });

    setCalculatedAmountSummary({
      expense,
      income,
      total: income - expense,
      directionType: getDirectionType(income, expense),
    });
  };

  // directionTypeを判定する
  const getDirectionType = (income: number, expense: number) => {
    if (income - expense > 0) {
      return "plus";
    } else if (income - expense < 0) {
      return "minus";
    } else {
      return "zero";
    }
  };

  useEffect(() => {
    calcAmountSummary();
  }, [balances]);

  return { calculatedAmountSummary };
};
