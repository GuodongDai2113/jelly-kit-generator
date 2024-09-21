const fs = require("fs");
const builder = require("xmlbuilder");
const path = require("path");
const readlineSync = require('readline-sync');

const { generate, presetPalettes } = require("@ant-design/colors");
const {
  readCssSync,
  writeJsonSync,
  createZip,
  formatDate,
  writeXmlSync,
} = require("./utils");


const kitConfigTemplate = {
  kitName: "Versailles Kit",
  description: "由 Jelly Kit Generator 自动生成",
  primaryColor: "#141414",
  secondaryColor: "#1f1f1f",
  textColor: "#595959",
  accentColor: "#0054a2",
  accentExpansion: false, // 是否开启重点颜色拓展
  otherExpansion: false, // 是否开启其他颜色拓展
  fontFamily: "Poppins",
  fontWeight: "600",
  borderRadius: 6,
  container_width: 1140,
};


let kitConfig = {};

function askForInput(prompt, defaultValue) {
  const answer = readlineSync.question(`${prompt} [Default is ${defaultValue}]: `);
  return answer.trim() === '' ? defaultValue : answer;
}

// 同步配置过程
function configureKit() {
  kitConfig.kitName = askForInput('Kit Name', kitConfigTemplate.kitName);
  kitConfig.primaryColor = askForInput('Primary Color', kitConfigTemplate.primaryColor);
  kitConfig.secondaryColor = askForInput('Secondary Color', kitConfigTemplate.secondaryColor);
  kitConfig.textColor = askForInput('Text Color', kitConfigTemplate.textColor);
  kitConfig.accentColor = askForInput('Accent Color', kitConfigTemplate.accentColor);
  kitConfig.accentExpansion = askForInput('Accent extension', String(kitConfigTemplate.accentExpansion)) === 'true';
  kitConfig.otherExpansion = askForInput('Other Extensions (true/false)', String(kitConfigTemplate.otherExpansion)) === 'true';
  kitConfig.fontFamily = askForInput('Font Family', kitConfigTemplate.fontFamily);
  kitConfig.fontWeight = askForInput('Font Weight', kitConfigTemplate.fontWeight);
  kitConfig.borderRadius = parseInt(askForInput('Border Radius', String(kitConfigTemplate.borderRadius)), 10);
  kitConfig.container_width = parseInt(askForInput('Container Width', String(kitConfigTemplate.container_width)), 10);

  // 打印配置结果
  console.log('\n最终配置为:', kitConfig);
}

// 开始配置过程
configureKit();

const GRAY = [
  { _id: "gffffff", title: "Gray-1", color: "#ffffff" },
  { _id: "gfafafa", title: "Gray-2", color: "#fafafa" },
  { _id: "gf5f5f5", title: "Gray-3", color: "#f5f5f5" },
  { _id: "gf0f0f0", title: "Gray-4", color: "#f0f0f0" },
  { _id: "gd9d9d9", title: "Gray-5", color: "#d9d9d9" },
  { _id: "gbfbfbf", title: "Gray-6", color: "#bfbfbf" },
  { _id: "g8c8c8c", title: "Gray-7", color: "#8c8c8c" },
  { _id: "g595959", title: "Gray-8", color: "#595959" },
  { _id: "g434343", title: "Gray-9", color: "#434343" },
  { _id: "g262626", title: "Gray-10", color: "#262626" },
  { _id: "g1f1f1f", title: "Gray-11", color: "#1f1f1f" },
  { _id: "g141414", title: "Gray-12", color: "#141414" },
  { _id: "g000000", title: "Gray-13", color: "#000000" },
];

const BORDER = [
  { _id: "br0001a", title: "Border-1", color: "#0000001A" },
  { _id: "br00026", title: "Border-2", color: "#00000026" },
  { _id: "br00038", title: "Border-3", color: "#00000038" },
  { _id: "br00056", title: "Border-4", color: "#00000056" },
];

const globalColor = {
  system_colors: [],
  custom_colors: [],
  __globals__: {},
  colors: {},
  initFlag: 0,
  init() {
    this.system_colors = [
      { _id: "primary", title: "Primary", color: kitConfig.primaryColor },
      { _id: "secondary", title: "Secondary", color: kitConfig.secondaryColor },
      { _id: "text", title: "Text", color: kitConfig.textColor },
      { _id: "accent", title: "Accent", color: kitConfig.accentColor },
    ];
    this.custom_colors = [];
    this.custom_colors.push(...GRAY);
    this.custom_colors.push(...BORDER);
    this.initAccentColors();
    this.initOtherColors();
    this.initFlag = 1;
  },
  initAccentColors() {
    if (!kitConfig.accentExpansion) {
      return;
    }

    generate(kitConfig.accentColor).forEach((element, index) => {
      let _id = element.replace("#", "c");
      this.custom_colors.push({
        _id: _id,
        title: "Accent-" + (index + 1),
        color: element,
      });
    });
  },
  initOtherColors() {
    if (!kitConfig.otherExpansion) {
      return;
    }
    for (const key in presetPalettes) {
      if (key != "grey") {
        presetPalettes[key].forEach((element, index) => {
          let _id = element.replace("#", "p");
          this.custom_colors.push({
            _id: _id,
            title: key + "-" + (index + 1),
            color: element,
          });
        });
      }
    }
  },
  getColorByTitle(title) {
    for (const element of this.system_colors) {
      if (element.title == title) {
        return element;
      }
    }
    for (const element of this.custom_colors) {
      if (element.title == title) {
        return element;
      }
    }
    return {};
  },
  setGlobalColor(element, colorTitle) {
    if (!this.initFlag) {
      this.init();
    }
    const color = this.getColorByTitle(colorTitle);
    this.__globals__[`${element}`] = `globals/colors?id=${color._id}`;
    return color;
  },
};

const typography = {
  system_typography: [],
  body_typography: {},
  heading_typography: {},
  init() {
    const typographyList = ["primary", "secondary", "text", "accent"];
    typographyList.forEach((element) => {
      this.system_typography.push({
        _id: element,
        title: element.charAt(0).toUpperCase() + element.slice(1),
        typography_typography: "custom",
        typography_font_family: kitConfig.fontFamily,
        typography_font_weight: kitConfig.fontWeight,
      });
    });
    this.initTypography();
  },
  getTypography(
    element,
    colorTitle,
    size,
    sizeUnit,
    lineHeight,
    lineHeightUnit
  ) {
    const typography = {};

    const color = globalColor.setGlobalColor(`${element}_color`, colorTitle);
    // 颜色配置
    typography[`${element}_color`] = color.color;

    // 字体大小配置
    typography[`${element}_typography_typography`] = "custom";
    typography[`${element}_typography_font_size`] = {
      unit: sizeUnit,
      size: size.pc,
      sizes: [],
    };
    typography[`${element}_typography_font_size_tablet`] = {
      unit: sizeUnit,
      size: size.tablet,
      sizes: [],
    };
    typography[`${element}_typography_font_size_mobile`] = {
      unit: sizeUnit,
      size: size.mobile,
      sizes: [],
    };

    // 字体重量配置
    if (element !== "body") {
      typography[`${element}_typography_font_weight`] = kitConfig.fontWeight;
    }

    // 行高配置
    typography[`${element}_typography_line_height`] = {
      unit: lineHeightUnit,
      size: lineHeight,
      sizes: [],
    };

    return typography;
  },

  initTypography() {
    this.body_typography = {
      paragraph_spacing: { unit: "em", size: 1.5, sizes: [] },
      body_typography_font_family: kitConfig.fontFamily,
      link_normal_color: globalColor.setGlobalColor(
        "link_normal_color",
        "Accent"
      ).color,
      link_hover_color: globalColor.setGlobalColor(
        "link_hover_color",
        "Secondary"
      ).color,
    };
    this.heading_typography = {
      ...this.getTypography(
        "body",
        "Text",
        { pc: 1, tablet: 1, mobile: 0.875 },
        "rem",
        1.5,
        "em"
      ),
      ...this.getTypography(
        "h1",
        "Primary",
        { pc: 3, tablet: 2.75, mobile: 2.5 },
        "em",
        1.2,
        "em"
      ),
      ...this.getTypography(
        "h2",
        "Primary",
        { pc: 2, tablet: 1.875, mobile: 1.75 },
        "em",
        1.3,
        "em"
      ),
      ...this.getTypography(
        "h3",
        "Primary",
        { pc: 1.75, tablet: 1.625, mobile: 1.5 },
        "em",
        1.3,
        "em"
      ),
      ...this.getTypography(
        "h4",
        "Primary",
        { pc: 1.5, tablet: 1.375, mobile: 1.25 },
        "em",
        1.4,
        "em"
      ),
      ...this.getTypography(
        "h5",
        "Primary",
        { pc: 1.25, tablet: 1.125, mobile: 1.125 },
        "em",
        1.4,
        "em"
      ),
      ...this.getTypography(
        "h6",
        "Primary",
        { pc: 1, tablet: 1, mobile: 1 },
        "em",
        1.5,
        "em"
      ),
    };
  },
};

const button = {
  settings: {},
  init() {
    this.settings = {
      button_typography_typography: "custom",
      button_typography_font_size: { unit: "rem", size: 0.875, sizes: [] },
      button_typography_font_weight: "500",
      button_border_border: "solid",
      button_border_width: {
        unit: "px",
        top: "1",
        right: "1",
        bottom: "1",
        left: "1",
        isLinked: true,
      },
      button_border_radius: {
        unit: 'px',
        top: kitConfig.borderRadius,
        right: kitConfig.borderRadius,
        bottom: kitConfig.borderRadius,
        left: kitConfig.borderRadius,
        isLinked: true,
      },
      button_hover_border_border: "solid",
      button_hover_border_width: {
        unit: "px",
        top: "1",
        right: "1",
        bottom: "1",
        left: "1",
        isLinked: true,
      },
      button_padding: {
        unit: "em",
        top: "1",
        right: "2.5",
        bottom: "1",
        left: "2.5",
        isLinked: false,
      },
    };
    this.settings["button_text_color"] = globalColor.setGlobalColor(
      "button_text_color",
      "Gray-1"
    ).color;
    this.settings["button_background_color"] = globalColor.setGlobalColor(
      "button_background_color",
      "Accent"
    ).color;
    this.settings["button_border_color"] = globalColor.setGlobalColor(
      "button_border_color",
      "Accent"
    ).color;
    this.settings["button_hover_text_color"] = globalColor.setGlobalColor(
      "button_hover_text_color",
      "Gray-1"
    ).color;
    this.settings["button_hover_background_color"] = globalColor.setGlobalColor(
      "button_hover_background_color",
      "Secondary"
    ).color;
    this.settings["button_hover_border_color"] = globalColor.setGlobalColor(
      "button_hover_border_color",
      "Secondary"
    ).color;
  },
};

const form = {
  settings: {},
  init() {
    this.settings = {
      form_label_typography_typography: "custom",
      form_label_typography_font_weight: kitConfig.fontWeight,
      form_field_border_border: "solid",
      form_field_border_width: {
        unit: "px",
        top: "1",
        right: "1",
        bottom: "1",
        left: "1",
        isLinked: true,
      },
      form_field_border_radius: {
        unit: 'px',
        top: kitConfig.borderRadius,
        right: kitConfig.borderRadius,
        bottom: kitConfig.borderRadius,
        left: kitConfig.borderRadius,
        isLinked: true,
      },
      form_field_focus_border_border: "solid",
      form_field_focus_border_width: {
        unit: "px",
        top: "1",
        right: "1",
        bottom: "1",
        left: "1",
        isLinked: true,
      },
    };
    this.settings["form_label_color"] = globalColor.setGlobalColor(
      "form_label_color",
      "Primary"
    ).color;
    this.settings["form_field_text_color"] = globalColor.setGlobalColor(
      "form_field_text_color",
      "Text"
    ).color;
    this.settings["form_field_background_color"] = "#00000000";
    this.settings["form_field_border_color"] = globalColor.setGlobalColor(
      "form_field_border_color",
      "Border-1"
    ).color;
    this.settings["form_field_focus_text_color"] = globalColor.setGlobalColor(
      "form_field_focus_text_color",
      "Primary"
    ).color;
    this.settings["form_field_focus_border_color"] = globalColor.setGlobalColor(
      "form_field_focus_border_color",
      "Border-4"
    ).color;
  },
};

globalColor.init();
typography.init();
button.init();
form.init();

const settings = {
  template: "default",
  system_colors: globalColor.system_colors,
  custom_colors: globalColor.custom_colors,
  system_typography: typography.system_typography,
  custom_typography: [],
  default_generic_fonts: "Sans-serif",
  page_title_selector: "h1.entry-title",
  hello_footer_copyright_text: "All rights reserved",
  activeItemIndex: 1,
  viewport_md: 768,
  viewport_lg: 1025,
  __globals__: globalColor.__globals__,
  ...typography.body_typography,
  ...typography.heading_typography,
  ...button.settings,
  ...form.settings,
  custom_css: readCssSync("./custom.min.css"),
  container_padding: {
    unit: "em",
    top: "1",
    right: "1",
    bottom: "1",
    left: "1",
    isLinked: true,
  },
  space_between_widgets: {
    column: "1",
    row: "1",
    isLinked: true,
    unit: "em",
    size: 1,
  },
  container_width:{ unit: "px", size: kitConfig.container_width, sizes: [] } ,
};

const siteSettings = {
  content: [],
  settings: settings,
  metadata: [],
};

const wpContent = {
  posts: [],
  pages: [],
  createRSSFeed() {
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
  },
  addItem(rssFeed, id, title, content, type) {
    rssFeed
      .ele("item")
      .ele("title", title)
      .up()
      .ele("link")
      .up()
      .ele("pubDate")
      .up()
      .ele("description")
      .up()
      .ele("content:encoded")
      .cdata(content)
      .up()
      .ele("excerpt:encoded")
      .cdata("")
      .up()
      .ele("wp:post_id")
      .cdata(id)
      .up()
      .ele("wp:comment_status")
      .cdata("closed")
      .up()
      .ele("wp:ping_status")
      .cdata("closed")
      .up()
      .ele("wp:post_name")
      .cdata(title.replace(" ", "-").toLowerCase())
      .up()
      .ele("wp:status")
      .cdata("publish")
      .up()
      .ele("wp:post_parent")
      .cdata("0")
      .up()
      .ele("wp:menu_order", "0")
      .up()
      .ele("wp:post_type")
      .cdata(type)
      .up()
      .ele("wp:post_password")
      .cdata("")
      .up()
      .ele("wp:is_sticky", "0")
      .up();
  },
  processFilesSync(dirPath, distPath, rssFeed) {
    try {
      const ids = [];
      const files = fs.readdirSync(dirPath);
      let id_index = 999;
      files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        if (filePath.endsWith(".html")) {
          try {
            const data = fs.readFileSync(filePath, "utf8");
            console.log(`[消息] 加载文件: ${file}`);
            id_index += 1;
            const id = id_index;
            ids.push(id);
            this.addItem(
              rssFeed,
              id,
              file.replace(".html", ""),
              data,
              path.basename(distPath)
            );
          } catch (err) {
            console.log(`[错误] 无法加载文件 : ${file}`);
            console.log(err);
          }
        }
      });
      writeXmlSync(
        path.join(distPath, path.basename(distPath) + ".xml"),
        rssFeed
      );
      return ids;
    } catch (err) {
      console.log("无法扫描目录: " + err);
    }
  },
  init() {
    const postRssFeed = this.createRSSFeed();
    const pageRssFeed = this.createRSSFeed();
    this.posts = this.processFilesSync('./wp-content/post', './dist/wp-content/post', postRssFeed);
    this.pages = this.processFilesSync('./wp-content/page', './dist/wp-content/page', pageRssFeed);
  },
};

wpContent.init();

const manifest = {
  name: "jelly-kit",
  title: kitConfig.kitName,
  description: kitConfig.description,
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
  templates: [],
  taxonomies: [],
  content: { page: [], "e-landing-page": [] },
  "wp-content": {
    post: wpContent.posts,
    page: wpContent.pages,
    nav_menu_item: [],
  },
};

writeJsonSync("./dist/site-settings.json", siteSettings);
writeJsonSync("./dist/manifest.json", manifest);
createZip('./dist', `G:/01.Website/${kitConfig.kitName}.zip`);


