const fse = require("fs-extra");
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

module.exports = {
  readJsonSync: (jsonPath) => {
    try {
      const data = fse.readFileSync(jsonPath, "utf8");
      console.log("[消息] 读取json : " + jsonPath);
      return JSON.parse(data);
    } catch (error) {
      console.error(`[error] failed to read json : ${jsonPath}`, error);
      throw error;
    }
  },

  writeJsonSync: (jsonPath, data) => {
    try {
      const minifiedData = JSON.stringify(data);
      fse.writeFileSync(jsonPath, minifiedData, "utf8");
      console.log("[消息] 写入json : " + jsonPath);
    } catch (error) {
      console.error(`[error] failed to write json : ${jsonPath}`, error);
      throw error;
    }
  },

  readCssSync(filePath) {
    try {
      const css = fs.readFileSync(filePath, "utf8");
      return css;
    } catch (err) {
      console.error(
        "[error] An error occurred while reading the CSS file:",
        err
      );
      return "";
    }
  },

  writeXmlSync(filePath, xml) {
    try {
      const xmlString = xml.end({ pretty: true });
      fse.writeFileSync(filePath, xmlString, "utf8");
      console.log("[消息] 写入 xml : " + filePath);
    } catch (error) {
      console.error(`[error] failed to write xml : ${filePath}`, error);
      throw error;
    }
  },
  formatDate() {
    // 获取当前时间
    const now = new Date();

    // 获取年份、月份、日期、小时、分钟和秒
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // 月份从0开始，所以要加1
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    // 格式化为"YYYY-MM-DD HH:MM:SS"
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  },
  createZip(folderPath, outputPath) {
    // 确保输出文件夹路径存在
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 创建输出文件流
    const output = fs.createWriteStream(outputPath);
    const archive = archiver("zip", {
      zlib: { level: 9 }, // 设置压缩级别
    });

    // 监听所有 archive 数据已写入文件时的关闭事件
    output.on("close", () => {
      console.log(`[消息] 压缩完成 文件大小: ${archive.pointer()} bytes`);
    });

    // 捕获警告（警告不会停止压缩）
    archive.on("warning", (err) => {
      if (err.code !== "ENOENT") {
        throw err;
      }
    });

    // 捕获错误
    archive.on("error", (err) => {
      throw err;
    });

    // 通过管道方法将档案数据存档到文件
    archive.pipe(output);

    // 追加文件夹中的所有内容
    archive.directory(folderPath, false);

    // 完成归档文件
    archive.finalize();
  },
  copyJson: function (source, target) {
    const data = fse.readFileSync(source, "utf8");
    const jsonData = JSON.parse(data);
    const minifiedData = JSON.stringify(jsonData);
    fse.writeFileSync(target, minifiedData, "utf8");
  },
};
