const fs = require("fs");
const path = require("path");
const config = require("../../config");
const { copyJson } = require("../../utils");

const templates = {};

// 同步读取目录内容
const dirs = fs.readdirSync(__dirname);
let templateIndex = 666;
dirs.forEach((dirName) => {
  const dirPath = path.join(__dirname, dirName);
  // 同步获取文件的状态
  const stats = fs.statSync(dirPath);
  if (stats.isDirectory()) {
    const files = fs.readdirSync(dirPath);
    files.forEach((fileName) => {
      const filePath = path.join(dirPath, fileName);
      const targetFilePath = path.join(
        config.paths.dist.template,
        `${templateIndex}.json`
      );
      copyJson(filePath, targetFilePath);
      console.log("[消息] 复制json : " + filePath);
      templates[templateIndex] = {
        title: fileName.replace(".json", ""),
        doc_type: dirName,
        thumbnail: false,
        location: dirName,
      };
      templateIndex += 1;
    });
  }
});
module.exports = templates;
