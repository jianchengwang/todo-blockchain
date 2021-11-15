var dotenv = require('dotenv');
var fs = require('fs');
const { resolve } = require('path');

export function getDotEnv() {
  const rootPath = resolve(__dirname, "../");
  const dotenvFile = resolve(rootPath, `./.env.${process.env.NODE_ENV}`);
  // 加载.env*文件  默认加载.env文件
  return dotenv.config({
    path: fs.existsSync(dotenvFile)
      ? dotenvFile
      : resolve(rootPath, `./.env`),
  }).parsed;
}

export function getGlobal() {
  
}