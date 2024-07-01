const fs = require('fs');
const path = require("path");

const config = {
  // 套件名称
  kitName: "Versailles Network",

  // 套件描述
  description: "由Jelly Kit 自动生成\n",

  // 套件颜色
  colors: {
    primary: "#000000",
    secondary: "#131313",
    text: "#8c8c8c",
    accent: "#bff061",
  },

  // 全局字体
  fontFamily: "Open Sans",

  // 套件模板库路径
  libPath: {
    wpContent: path.join(__dirname, "manifest", "wp-content-lib"),
    postPath: path.join(__dirname, "manifest", "wp-content-lib", "post"),
    pagePath: path.join(__dirname, "manifest", "wp-content-lib", "page"),
    template: path.join(__dirname, "manifest", "template-lib"),
    taxonomies: path.join(__dirname, "manifest", "taxonomies-lib"),
  },

  // 输出路径
  distPath: {
    path:path.join(__dirname, "dist"),
    wpContent: path.join(__dirname, "dist", "wp-content"),
    postPath: path.join(__dirname, "dist", "wp-content", "post"),
    pagePath: path.join(__dirname, "dist", "wp-content", "page"),
    template: path.join(__dirname, "dist", "templates"),
    taxonomies: path.join(__dirname, "dist", "taxonomies"),
  },
  getDistPath(fileName){
    return path.join(this.distPath.path, fileName)
  }
};
const allPaths = {...config.libPath, ...config.distPath}

Object.values(allPaths).forEach(dirPath => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`[消息] 创建文件夹: ${dirPath}`);
  } else {
    // console.log(`Directory already exists: ${dirPath}`);
  }
});

module.exports = config;
