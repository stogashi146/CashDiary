import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { DB_NAME } from "../../config/database";

const db = SQLite.openDatabase(DB_NAME);

type UseInitDatabaseType = {
  createdSuccess: boolean;
  error: string;
};

export const useInitDatabase = (): UseInitDatabaseType => {
  const [createdSuccess, setCreatedSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const initializeDatabase = () => {
      db.transaction(
        (tx) => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS diary (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              date TEXT NOT NULL,
              title TEXT NOT NULL DEFAULT '',
              content TEXT NOT NULL DEFAULT ''
            );`
          );
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS cash_balance (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              diary_id INTEGER NOT NULL,
              title TEXT DEFAULT '',
              cash_balance_category_id INTEGER NOT NULL,
              income_expense_type TEXT NOT NULL,
              amount INTEGER NOT NULL DEFAULT 0,
              FOREIGN KEY (diary_id) REFERENCES diary(id),
              FOREIGN KEY (cash_balance_category_id) REFERENCES cash_balance_category(id)
            );`
          );
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS cash_balance_category (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL
            );`
          );
        },
        (error) => {
          setError(error.message);
        },
        () => {
          console.log("database created");
          setCreatedSuccess(true);
        }
      );
    };

    initializeDatabase();
  }, []);

  return { createdSuccess, error };
};
