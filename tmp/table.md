以下は、上記のテーブル定義に論理名を追加したマークダウン形式の表です。

### diary 日記

| Column  | Type                        | 論理名     |
| ------- | --------------------------- | ---------- |
| id      | INTEGER PRIMARY KEY AUTOINCREMENT | ID         |
| date    | TEXT                        | 日付       |
| title   | TEXT                        | タイトル   |
| content | TEXT                        | 内容       |

### cash_balance 収支

| Column                   | Type                        | 論理名               |
| ------------------------ | --------------------------- | -------------------- |
| id                       | INTEGER PRIMARY KEY AUTOINCREMENT | ID                   |
| diary_id                 | INTEGER                     | 日記ID             |
| title                    | TEXT                        | タイトル             |
| cash_balance_category_id | INTEGER                     | カテゴリID         |
| income_expense_type      | TEXT                        | 収支タイプ           |
| amount                   | INTEGER                     | 金額                 |

### cash_balance_category　収支カテゴリー

| Column | Type                        | 論理名       |
| ------ | --------------------------- | ------------ |
| id     | INTEGER PRIMARY KEY AUTOINCREMENT | ID           |
| name   | TEXT                        | カテゴリ名     |