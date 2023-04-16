interface CashBalanceData {
  id: number;
  diaryId: number;
  cashBalanceCategoryId: number;
  title: string | null;
  category: string | null;
  incomeExpenseType: "income" | "expense";
  amount: number;
}
