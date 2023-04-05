interface DiaryData {
  // id: number;
  title: string;
  content: string;
}

interface BalanceData {
  // id: number;
  title: string | null;
  category: string | null;
  balanceDirection: "income" | "expense";
  amount: number;
}

interface DiaryBalanceData {
  date: Date;
  diary: DiaryData;
  balances: BalanceData[];
}
