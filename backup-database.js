const { execute } = require("@getvim/execute");
const dotenv = require("dotenv").config();
const cron = require("node-cron");
const fs = require("fs");
const username = process.env.DB_USER;
const database = process.env.DATABASE;
const password = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
var path = require("path");

const backup = () => {
  const date = new Date();
  const today = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}-${date.getHours()}-${date.getMinutes()}`;
  const backupFile = `backup-${today}.zip`;
  execute(
    `PGPASSWORD=${password} pg_dump -U ${username} -h ${dbHost} -p ${dbPort} -f ${backupFile} -F t -d ${database}`
  )
    .then(async () => {
      console.log(`Backup created successfully`);
      uploadBackup(backupFile);
    })
    .catch((err) => {
      console.log(err);
    });
};
const uploadBackup = (backupFile) => {
  execute(`./test.sh ${backupFile}`)
    .then(() => {
      fs.unlinkSync(path.resolve(__dirname, backupFile));
    })
    .catch((err) => {
      console.log(err);
    });
};

const startSchedule = () => {
  cron.schedule(
    "1 * * * * *",
    () => {
      backup();
    },
    {}
  );
};

module.exports = {
  startSchedule,
};
