const path = require("path");
const rootDir = __dirname.replace('config','');

// 套件模板库路径
module.exports = {
  lib: {
    wpContent: path.join(rootDir, "manifest", "wp-content-lib"),
    postPath: path.join(rootDir, "manifest", "wp-content-lib", "post"),
    pagePath: path.join(rootDir, "manifest", "wp-content-lib", "page"),
    template: path.join(rootDir, "manifest", "template-lib"),
    taxonomies: path.join(rootDir, "manifest", "taxonomies-lib"),
  },
  dist: {
    wpContent: path.join(rootDir, "dist", "wp-content"),
    postPath: path.join(rootDir, "dist", "wp-content", "post"),
    pagePath: path.join(rootDir, "dist", "wp-content", "page"),
    template: path.join(rootDir, "dist", "templates"),
    taxonomies: path.join(rootDir, "dist", "taxonomies"),
    siteSettings: path.join(rootDir, "dist", "site-settings.json"),
    manifest: path.join(rootDir, "dist", "manifest.json"),
  },
};
