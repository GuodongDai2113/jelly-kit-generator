const { getColors, getGlobals,setColor } = require("./global-colors");
const { systemTypography, getTypographys } = require("./typography");
const button = require("./button");
const form = require("./form");
const { readCssSync } = require("../utils");
const config = require("../config");

const colors = getColors();
const settings = {
  template: "default",
  system_colors: colors.system_colors,
  custom_colors: colors.custom_colors,
  link_normal_color: setColor('link_normal_color',"Accent"),
  link_hover_color: setColor('link_hover_color',"Secondary"),
  system_typography: systemTypography,
  custom_typography: [],
  default_generic_fonts: "Sans-serif",
  page_title_selector: "h1.entry-title",
  hello_footer_copyright_text: "All rights reserved",
  activeItemIndex: 1,
  viewport_md: 768,
  viewport_lg: 1025,
  __globals__: getGlobals(),
  ...getTypographys(),
  ...button,
  ...form,
  custom_css: readCssSync("./config/custom.min.css"),
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
};

const siteSettings = {
  content: [],
  settings,
  metadata: [],
};

function getSiteSettings(site) {
  if (!site) {
    return siteSettings
  }else{
    return {
      content: [],
      settings:site,
      metadata: [],
    }
  }
}

module.exports = siteSettings;
