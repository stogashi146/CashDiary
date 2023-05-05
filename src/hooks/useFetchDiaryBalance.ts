import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { DB_NAME } from "../../config/database";

const db = SQLite.openDatabase(DB_NAME);

type useFetchDiaryType = {
  fetchedDiary: DiaryData | undefined;
  fetchedBalances: CashBalanceData[] | undefined;
  fetchSuccess: boolean;
  fetchError: string;
  fetchDiaryBalanceDetail: (diaryId: number) => void;
};

export const useFetchDiaryBalance = (): useFetchDiaryType => {
  const [fetchedDiary, setFetchedDiary] = useState<DiaryData>();
  const [fetchedBalances, setFetchedBalances] = useState<CashBalanceData[]>();
  const [fetchSuccess, setFetchSuccess] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const fetchDiaryBalanceDetail = (diaryId: number) => {
    if (!diaryId) {
      return;
    }
    db.transaction(
      (tx) => {
        // DiaryテーブルからdiaryIdに一致するレコードを取得するクエリ
        const query = `
        SELECT * FROM diary
        WHERE id = ${diaryId}
        LIMIT 1
      `;
        tx.executeSql(query, [], (_, { rows: { _array } }) => {
          // console.log(_array);
          setFetchedDiary(_array[0]); // Diaryテーブルの最初のレコードをセット
        });

        // CashBalanceテーブルからdiaryIdに一致するレコードを取得するクエリ
        const query2 = `
          SELECT * FROM cash_balance
          WHERE diary_id = ${diaryId}
        `;
        tx.executeSql(query2, [], (_, { rows: { _array } }) => {
          const fetchBalances = _array;

          fetchBalances.map((balance) => {
            renameKey(balance, "income_expense_type", "incomeExpenseType");
          });

          setFetchedBalances(_array);
        });
      },
      (error) => {
        setFetchError(`${error.code} ${error.message}`);
        console.log("Transaction error: ", error);
      },
      () => setFetchSuccess(true)
    );
  };

  const renameKey = (object: any, oldKey: string, newKey: string) => {
    // オブジェクトに古いキーが存在するかを確認
    if (Object.prototype.hasOwnProperty.call(object, oldKey)) {
      // 新しいキーに古いキーの値を代入
      object[newKey] = object[oldKey];
      // 古いキーを削除
      delete object[oldKey];
    }
  };

  return {
    fetchDiaryBalanceDetail,
    fetchedDiary,
    fetchedBalances,
    fetchSuccess,
    fetchError,
  };
};
