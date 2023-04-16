import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { DB_NAME } from "../../config/database";

const db = SQLite.openDatabase(DB_NAME);

type useDiaryInsertType = {
  diaryInsertedSuccess: boolean;
  error: string;
  insertDiary: (diary: DiaryData) => void;
};

export const useInsertDiary = (): useDiaryInsertType => {
  const [diaryInsertedSuccess, setDiaryInsertedSuccess] = useState(false);
  const [error, setError] = useState("");

  const insertDiary = (diary: DiaryData) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO diary (date, title, content) VALUES (?, ?, ?)",
        [diary.date, diary.title, diary.content],
        (_, result) => {
          console.log("diary insert success", result);
          setDiaryInsertedSuccess(true);
        },
        (_, error) => {
          console.log("diary insert error", error);
          setError(error.message);
          setDiaryInsertedSuccess(false);
          return false;
        }
      );
    });
  };

  return { insertDiary, diaryInsertedSuccess, error };
};
