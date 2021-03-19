# 待辦清單 (todo list)

## 環境建置與需求 (prerequisites)
#### 環境
- Node.js 10.15.0

#### 框架、模板
- express 4.17.1
- bootstrap 4.6.0
- express-handlebars 5.2.1

#### 資料庫
- MySQL 8.0.23

#### 套件
- bcryptjs 2.4.3
- body-parser 1.19.0
- connect-flash 0.1.1
- dotenv 8.2.0
- express-session 1.17.1
- method-override 3.0.0
- mysql2 2.2.5
- passport 0.4.1
- passport-facebook 3.0.0
- passport-local 1.0.0
- sequelize 6.5.0
- sequelize-cli 6.2.0

## 安裝與執行 (installation and execution)
1. 選定一個資料夾，用來存放本專案。開啟終端機，移動至該資料夾，下載本專案
```
git clone https://github.com/Flora2020/todo-sequelize.git
```
2. 移動至本專案資料夾
```
cd todo-sequelize
```
3. 安裝套件
```
npm install
```
4. 在 MySQL 建立 todo_sequelize 資料庫
```
drop database if exists todo_sequelize;
create database todo_sequelize;
```
5. 啟動伺服器
```
node app.js
```
6. 若終端機出現下列字樣，代表伺服器成功啟動
```
express is listening on http://localhost:3000
```
7. 打開瀏覽器，於網址列輸入
```
http://localhost:3000
```
8. 建立種子資料
```
npx sequelize db:seed:all
```

## 功能 (features)
- 註冊
- 登出
- 登入，登入後可使用下列功能
  - 瀏覽所有待辦清單
  - 瀏覽一筆待辦清單
  - 新增一筆待辦清單
  - 編輯一筆待辦清單
  - 刪除一筆待辦清單

## 預覽圖 (preview image)
![This is a preview image.](https://github.com/Flora2020/images/blob/main/todo-sequelize.jpg?raw=true "This is a preview image.")