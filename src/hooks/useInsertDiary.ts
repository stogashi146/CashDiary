import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { DB_NAME } from "../../config/database";

const db = SQLite.openDatabase(DB_NAME);

type useDiaryInsertType = {
  diaryInsertedSuccess: boolean;
  error: string;
  insertDiary: (diary: DiaryData, balances: CashBalanceData[]) => void;
};

export const useInsertDiary = (): useDiaryInsertType => {
  const [diaryInsertedSuccess, setDiaryInsertedSuccess] = useState(false);
  const [error, setError] = useState("");

  const insertDiary = (diary: DiaryData, balances: CashBalanceData[]) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO diary (date, title, content) VALUES (?, ?, ?)",
        [diary.date, diary.title, diary.content],
        (tx, result) => {
          const insertedId = result.insertId;
          console.log(`Inserted ID: ${insertedId}`);
          if (!insertedId) {
            return;
          }
          // 家計簿を登録する
          console.log(balances);

          {
            balances.map((balance) => {
              console.log(balance);

              tx.executeSql(
                "INSERT INTO cash_balance (diary_id, title, balance_type, amount) VALUES (?, ?, ?, ?, ?)",
                [
                  insertedId,
                  balance.title,
                  balance.incomeExpenseType,
                  balance.amount,
                ],
                (tx, result) => {
                  console.log("Cash balance record inserted successfully");
                },
                (error) => {
                  console.log(`Error inserting cash balance record: ${error}`);
                  return false;
                }
              );
            });
          }
        },
        (error) => {
          console.log(`Error inserting diary record: ${error}`);
          return false;
        }
      );
    });
  };

  return { insertDiary, diaryInsertedSuccess, error };
};
