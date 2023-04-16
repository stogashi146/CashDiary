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
              date TEXT,
              title TEXT,
              content TEXT
            );`
          );
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS cash_balance (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              diary_id INTEGER,
              title TEXT,
              cash_balance_category_id INTEGER,
              balance_type TEXT,
              amount INTEGER
            );`
          );
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS cash_balance_category (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT
            );`
          );
        },
        (error) => {
          setError(error.message);
        },
        () => {
          setCreatedSuccess(true);
        }
      );
    };

    initializeDatabase();
  }, []);

  return { createdSuccess, error };
};
