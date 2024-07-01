const {writeJsonSync} = require("../../utils");
const config = require("../../config");
const category = [
  {
    term_id: 31,
    name: "Industry News",
    slug: "industry-news",
    taxonomy: "category",
    description: "",
    parent: 0,
  },
  {
    term_id: 1,
    name: "Product Blog",
    slug: "product-blog",
    taxonomy: "category",
    description: "",
    parent: 0,
  },
];

const taxonomies = {
  post: [],
  init() {
    this.post.push("category");
    writeJsonSync(config.distPath.taxonomies + '/category.json',category)
  },
};

module.exports = taxonomies;
