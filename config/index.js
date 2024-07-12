const paths = require("./paths");
const fs = require("fs");

Object.values(paths.dist).forEach((dirPath) => {
  if (!fs.existsSync(dirPath)) {
    if (dirPath.indexOf('.json') == -1) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`[消息] 创建文件夹: ${dirPath}`);
    }
  }
});

module.exports = {
  // 套件名称
  kitName: "Template Kit",
  // 套件描述
  description: "由Jelly Kit 自动生成\n",
  // 套件颜色
  primaryColor: "#010101",
  secondaryColor: "#fbbc05",
  textColor: "#414141",
  accentColor: "#4285f4",
  // 是否开启重点颜色拓展
  accentExpansion: true,
  // 是否开启其他颜色拓展
  otherExpansion: false,
  // 全局字体
  fontFamily: "Roboto",
  fontWeight: "700",
  customFont: true,
  // 圆角
  borderRadius: {
    size: "0",
    unit: "px",
  },
  paths,
};
