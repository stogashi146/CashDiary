interface CashBalanceData {
  id?: number;
  diaryId?: number;
  cashBalanceCategoryId?: number;
  title: string | null;
  incomeExpenseType: "income" | "expense";
  amount: number;
}
