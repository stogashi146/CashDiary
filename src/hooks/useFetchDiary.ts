// import * as SQLite from "expo-sqlite";
// import { useEffect, useState } from "react";
// import { DB_NAME } from "../../config/database";

// const db = SQLite.openDatabase(DB_NAME);

// type useFetchDiaryType = {
//   fetchDiaries: DiaryBalanceData[];
//   diaryFetchSuccess: boolean;
//   fetchDiaryError: string;
//   fetchAllDiary: () => void;
// };

// export const useFetchDiary = (): useFetchDiaryType => {
//   const [diaryFetchSuccess, setDiaryFetchSuccess] = useState(false);
//   const [fetchDiaries, setFetchDiaries] = useState<DiaryBalanceData[]>([]);
//   const [fetchDiaryError, setFetchDiaryError] = useState("");

//   const fetchAllDiary = () => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         `SELECT
//           d.id,
//           d.date,
//           d.title AS title,
//           SUM(CASE WHEN c.balance_type = 'income' THEN c.amount ELSE -c.amount END) AS total
//         FROM diary AS d
//         LEFT JOIN cash_balance AS c ON d.id = c.diary_id
//         GROUP BY d.id`,
//         [],
//         (_, { rows }) => {
//           console.log("rows", rows._array);

//           setDiaryFetchSuccess(true);
//           setFetchDiaries(rows._array);
//         },
//         (_, error) => {
//           console.log("error", error);
//           setDiaryFetchSuccess(false);
//           setFetchDiaryError(error.message);
//           return false;
//         }
//       );
//     });
//   };

//   return { fetchAllDiary, fetchDiaries, diaryFetchSuccess, fetchDiaryError };
// };
