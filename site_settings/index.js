const { getColors } = require("./settings/color");
const { body, titles } = require("./settings/typography");
const { button, form } = require("./settings/components");
const { globals } = require("./settings/globals");
const { readCssSync } = require("../utils");
const config = require("../config");

// 生成系统颜色
const generateSystemColors = (colors) => [
  { _id: "primary", title: "Primary", color: colors.primary },
  { _id: "secondary", title: "Secondary", color: colors.secondary },
  { _id: "text", title: "Text", color: colors.text },
  { _id: "accent", title: "Accent", color: colors.accent },
];

// 生成系统排版
const generateSystemTypography = (fontFamily) => [
  {
    _id: "primary",
    title: "Primary",
    typography_typography: "custom",
    typography_font_family: fontFamily,
    typography_font_weight: "600",
  },
  {
    _id: "secondary",
    title: "Secondary",
    typography_typography: "custom",
    typography_font_family: fontFamily,
    typography_font_weight: "600",
  },
  {
    _id: "text",
    title: "Text",
    typography_typography: "custom",
    typography_font_family: fontFamily,
    typography_font_weight: "400",
  },
  {
    _id: "accent",
    title: "Accent",
    typography_typography: "custom",
    typography_font_family: fontFamily,
    typography_font_weight: "600",
  },
];

const settings = {
  content: [],
  settings: {
    template: "default",
    system_colors: generateSystemColors(config.colors),
    custom_colors: getColors(config.colors.accent),
    system_typography: generateSystemTypography(config.fontFamily),
    custom_typography: [],
    default_generic_fonts: "Sans-serif",
    page_title_selector: "h1.entry-title",
    hello_footer_copyright_text: "All rights reserved",
    activeItemIndex: 19,
    viewport_md: 768,
    viewport_lg: 1025,
    __globals__: globals,
    ...body,
    ...titles,
    ...button,
    ...form,
    custom_css: readCssSync('./site_settings/settings/custom.min.css'),
    link_normal_color: "#1890ff",
    link_hover_color: "#0969DA",
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
  },
  metadata: [],
};

module.exports = settings;
