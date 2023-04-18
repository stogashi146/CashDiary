import * as SQLite from "expo-sqlite";
import { DB_NAME } from "../../config/database";

const db = SQLite.openDatabase(DB_NAME);

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

export const insertDiary = (diary: DiaryData) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO diary (date, title, content) VALUES (?, ?, ?)",
      [diary.date, diary.title, diary.content],
      () => {
        console.log("diary insert success");
        return true;
      },
      (tx, error) => {
        console.log("diary insert error", error);
        return false;
      }
    );
  });
};

// ユーザーを全て取得する関数
export const fetchAllDiaryRecord = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM diary",
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

// diaryテーブルの全てのデータを削除する
export const deleteAllDiary = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "delete from diary",
      [],
      () => {
        console.log("delete success");
        return true;
      },
      (tx, error) => {
        console.log("delete error", error);
        return false;
      }
    );
  });
};

// 全テーブルを削除する
export const deleteAllTable = () => {
  db.transaction((tx) => {
    tx.executeSql("drop table diary");
    tx.executeSql("drop table cash_balance");
    tx.executeSql("drop table cash_balance_category");
  });
};
