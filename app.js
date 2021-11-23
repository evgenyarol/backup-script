const express = require("express");
const app = express();
const { startSchedule } = require("./backup-database");

startSchedule();

app.listen(3000, () => {
  console.log("Сервер ожидает подключения...");
});
