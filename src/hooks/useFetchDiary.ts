import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { DB_NAME } from "../../config/database";

const db = SQLite.openDatabase(DB_NAME);

type useFetchDiaryType = {
  fetchDiaries: DiaryData[];
  diaryFetchSuccess: boolean;
  fetchDiaryError: string;
  fetchAllDiary: () => void;
};

export const useFetchDiary = (): useFetchDiaryType => {
  const [diaryFetchSuccess, setDiaryFetchSuccess] = useState(false);
  const [fetchDiaries, setFetchDiaries] = useState<DiaryData[]>([]);
  const [fetchDiaryError, setFetchDiaryError] = useState("");

  const fetchAllDiary = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM diary",
        [],
        (_, { rows }) => {
          setDiaryFetchSuccess(true);
          setFetchDiaries(rows._array);
        },
        (_, error) => {
          console.log("select error");
          setDiaryFetchSuccess(false);
          setFetchDiaryError(error.message);
          return false;
        }
      );
    });
  };

  return { fetchAllDiary, fetchDiaries, diaryFetchSuccess, fetchDiaryError };
};
