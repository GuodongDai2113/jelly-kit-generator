const { formatDate } = require("../utils");
const config = require("../config");
const plugins = require("../config/plugins");
const templates = require("./template-lib");
const wpContent = require("./wp-content-lib");

// wpContent.postInit();
// wpContent.pageInit();
// taxonomies.init();

const manifest = {
  name: "jelly-kit",
  title: config.kitName,
  description: config.description,
  author: "JellyDai",
  version: "2.0",
  elementor_version: "3.21.6",
  created: formatDate(),
  thumbnail: false,
  site: "",
  "site-settings": [
    "global-colors",
    "global-typography",
    "theme-style-typography",
    "theme-style-buttons",
    "theme-style-images",
    "theme-style-form-fields",
    "settings-background",
    "settings-layout",
    "settings-lightbox",
    "settings-page-transitions",
    "settings-custom-css",
    "settings-woocommerce",
  ],
  // plugins,
  // templates: templates,
  // taxonomies: { post: taxonomies.post, nav_menu_item: [] },
  // taxonomies: { post: [], nav_menu_item: [] },
  // content: { page: [], "e-landing-page": [] },
  // "wp-content" : {
  //   post: wpContent.posts,
  //   page: wpContent.pages,
  //   nav_menu_item: [],
  // },
};

module.exports = manifest;
