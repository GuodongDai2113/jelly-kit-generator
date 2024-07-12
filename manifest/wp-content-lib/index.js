const builder = require("xmlbuilder");
const { writeXmlSync } = require("../../utils");
const fs = require("fs");
const path = require("path");
const config = require("../../config");

const createRSSFeed = () => {
  return builder
    .create("rss", { version: "1.0", encoding: "UTF-8" })
    .att("version", "2.0")
    .att("xmlns:excerpt", "http://wordpress.org/export/1.2/excerpt/")
    .att("xmlns:content", "http://purl.org/rss/1.0/modules/content/")
    .att("xmlns:wfw", "http://wellformedweb.org/CommentAPI/")
    .att("xmlns:dc", "http://purl.org/dc/elements/1.1/")
    .att("xmlns:wp", "http://wordpress.org/export/1.2/")
    .ele("channel")
    .ele("wp:wxr_version", "1.2")
    .up();
};

const addItem = (rssFeed, id, title, content, type) => {
  rssFeed
    .ele("item")
    .ele("title", title).up()
    .ele("link").up()
    .ele("pubDate").up()
    .ele("description").up()
    .ele("content:encoded").cdata(content).up()
    .ele("excerpt:encoded").cdata("").up()
    .ele("wp:post_id").cdata(id).up()
    .ele("wp:comment_status").cdata("closed").up()
    .ele("wp:ping_status").cdata("closed").up()
    .ele("wp:post_name").cdata(title.replace(" ", "-").toLowerCase()).up()
    .ele("wp:status").cdata("publish").up()
    .ele("wp:post_parent").cdata("0").up()
    .ele("wp:menu_order", "0").up()
    .ele("wp:post_type").cdata(type).up()
    .ele("wp:post_password").cdata("").up()
    .ele("wp:is_sticky", "0").up();
};

const processFilesSync = (dirPath, distPath, rssFeed) => {
  try {
    const ids = [];
    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      if (filePath.endsWith('.html')) {
        try {
          const data = fs.readFileSync(filePath, 'utf8');
          console.log(`[消息] 加载文件: ${file}`);
          const id = ++wpContent._id_index;
          ids.push(id);
          addItem(rssFeed, id, file.replace('.html', ''), data,path.basename(distPath));
        } catch (err) {
          console.log(`[错误] 无法加载文件 : ${file}`);
          console.log(err);
        }
      }
    });
    writeXmlSync(path.join(distPath, path.basename(distPath)+'.xml'), rssFeed);
    return ids;
  } catch (err) {
    console.log("无法扫描目录: " + err);
  }
};

const wpContent = {
  _id_index: 999,
  posts: [],
  pages: [],
  postRssFeed: createRSSFeed(),
  pageRssFeed: createRSSFeed(),
  
  postInit() {
    this.posts = processFilesSync(config.paths.lib.postPath, config.paths.dist.postPath, this.postRssFeed);
  },
  pageInit() {
    this.pages = processFilesSync(config.paths.lib.pagePath, config.paths.dist.pagePath, this.pageRssFeed);
  }
};

module.exports = wpContent;
