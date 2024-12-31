const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUg3aVBaaWNoOGZNeUplbzl3ZHpwTk1qV2RkRE5ETkkrL1RRZ1V1ZjUwcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidjRwSUFybVM4Z2Z0VHBvVnlxL0FaM0tEdGVuMkROa1B3VnN4cEJoQS94MD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzQVBVSk12ek1KUlZkR0tQbFNsaytxZ1VJVCtuSzdGLzVzdmNUU0UwRVdRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUYjVxaVc5emZRdkxlcHg2RkVRSjZNa0h0cFF5a3NsL0d6RDNHUUN1N2tzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFFRzFiZXhnSmxQL1JTK2t5dEVsOHRFd0F0Qm9rdk5wYjA4ZDhxV3Bya0E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im56c2ZjOUlEUmZiN1g2cTljOGFBejk0SkhoaVowUkhTN0djOXlTcFF1aFU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEdnZmpYcWF3czVpSEZpeWh2a3FpMzFnMzZZVEJQYjJXQUthOVVDMFZHVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUU5wL1hpek9vVUlIZlV1bnFlc01OcTJ4OUhjWCtYeTZvcHpWc3RGZnhnWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFYbmZYNnFvMVp0eWZnNjVrUWNDRU1JMWpzQmtQN1IwR25kR29OVmsyTHRrdlViNDVVbzlpTW1tMmRsNnFkR3BQTFBhQlVSOGV1eGF4YmJoa1AzWWh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzcsImFkdlNlY3JldEtleSI6InZxZmgzcGVPUTVDMUVPQ2s5cytpODZsYXZkanJBSVFsQjVhcEVucmZtL009IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODE0NzAxMTY2MUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI0RjQyOEUwOTVBQjAzQzM1MjYyNEE4NUQ5N0ZEOEVCRiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzM1NjU0MzY5fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJiRkpSQTVrYlFJS0hiUlkwY0ZaMEd3IiwicGhvbmVJZCI6IjI0Mjc1ODQzLTk4MTEtNGNiOC05N2MxLTVkNWEzYjliYjE1MiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJGTHpnOXVUbUJVMnQwV1pSdmZsc2dRTVF6SWs9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY2FUOWgybFVrK3BhcXY2OGxjanA3QXFXVVRrPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjFUTlNRUUFLIiwibWUiOnsiaWQiOiIyMzQ4MTQ3MDExNjYxOjE0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6Ik1scyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT3Iyd0tzSEVNLzN6N3NHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiYk1yRnVvU3Z0ZnBIK0lJaytzQlVja3dZTWZPdlpJMXMvYUJwQ0l3bmloVT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiT0oySDVKaUE1ZjJSNEVUK2lnVnVORHg0ZEQrUkF3ZFgxOFBkWkVXbytqMmJDMXlDcWVTaFRvMUxjaE9wbWpnc1ZBSEdIb2VGQmZDMm5oMng1ancyQnc9PSIsImRldmljZVNpZ25hdHVyZSI6InkrQjdqT2dvQlVEOFQvaEdtWkM5VjBTb2FkZk1mMkFzMlJTOXJuV21DU3AzNjRpTC96VXVIYWc2TXhWeW9SRWd3cGQyUUlEU3M4QzZkN0FVRDMvZmdnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODE0NzAxMTY2MToxNEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJXekt4YnFFcjdYNlIvaUNKUHJBVkhKTUdESHpyMlNOYlAyZ2FRaU1KNG9WIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM1NjU0MzY0LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQVBxRSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Lord Draken",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2348147011661",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
