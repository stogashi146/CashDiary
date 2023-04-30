interface AmountSummaryData {
  expense: number;
  income: number;
  total: number;
  // totalがプラスかマイナスか０かを判定する
  directionType: "plus" | "minus" | "zero";
}
