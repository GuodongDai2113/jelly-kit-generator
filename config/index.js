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
  kitName: "Versailles Kit",
  // 套件描述
  description: "由Jelly Kit Generator 自动生成",
  // 套件颜色
  primaryColor: "#141414",
  secondaryColor: "#68C4CA",
  textColor: "#595959",
  accentColor: "#0A3C66",
  // 是否开启重点颜色拓展
  accentExpansion: true,
  // 是否开启其他颜色拓展
  otherExpansion: false,
  // 全局字体
  fontFamily: "Noto Sans",
  fontWeight: "600",
  customFont: true,
  // 圆角
  borderRadius: {
    size: "6",
    unit: "px",
  },
  paths,
};
// module.exports = {
//   // 套件名称
//   kitName: "Versailles Kit",
//   // 套件描述
//   description: "由Jelly Kit Generator 自动生成",
//   // 套件颜色
//   primaryColor: "#141414",
//   secondaryColor: "#30cfd0",
//   textColor: "#595959",
//   accentColor: "#330867",
//   // 是否开启重点颜色拓展
//   accentExpansion: true,
//   // 是否开启其他颜色拓展
//   otherExpansion: false,
//   // 全局字体
//   fontFamily: "Roboto",
//   fontWeight: "600",
//   customFont: true,
//   // 圆角
//   borderRadius: {
//     size: "6",
//     unit: "px",
//   },
//   paths,
// };
