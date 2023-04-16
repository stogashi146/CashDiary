import * as SQLite from "expo-sqlite";

const DB_NAME = "cashdiary.db";
const db = SQLite.openDatabase(DB_NAME);

export const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS diary (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        title TEXT,
        content TEXT
      );`,
      [],
      () => {
        console.log("diary table created");
      },
      (error) => {
        console.log(error);
        return false;
      }
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS cash_balance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        diary_id INTEGER,
        title TEXT,
        cash_balance_category_id INTEGER,
        balance_type TEXT,
        amount INTEGER,
      );`,
      [],
      () => {
        console.log("cash_balance table created");
      },
      (error) => {
        console.log(error);
        return false;
      }
    );
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS cash_balance_category (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
      );`,
      [],
      () => {
        console.log("cash_balance_category table created");
      },
      (error) => {
        console.log(error);
        return false;
      }
    );
  });
};

// ユーザーを全て取得する関数
export const fetchDiary = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "PRAGMA table_info(diary)",
      [],
      (_, { rows }) => {
        console.log(rows);
        console.log("select result:" + JSON.stringify(rows._array));
      },
      () => {
        console.log("select error");
        return false;
      }
    );
  });
};
