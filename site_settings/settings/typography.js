const config = require("../../config");
/**
 * 排版设置
 */
const body = {
  body_typography_typography: "custom",
  body_typography_font_family: config.fontFamily,
  body_color: config.colors.text,
  body_typography_font_size: { unit: "em", size: 1, sizes: [] },
  paragraph_spacing: { unit: "em", size: 1.5, sizes: [] },
  body_typography_line_height: { unit: "em", size: 1.5, sizes: [] },
};

const titles = {
  h1_color: "#000000E0",
  h1_typography_typography: "custom",
  h1_typography_font_size: { unit: "em", size: 2, sizes: [] },
  h1_typography_font_weight: "600",
  h1_typography_line_height: { unit: "em", size: 1.2, sizes: [] },
  h2_color: "#000000A6",
  h2_typography_typography: "custom",
  h2_typography_font_size: { unit: "em", size: 2, sizes: [] },
  h2_typography_font_weight: "600",
  h2_typography_line_height: { unit: "em", size: 1.3, sizes: [] },
  h3_color: "#000000A6",
  h3_typography_typography: "custom",
  h3_typography_font_size: { unit: "em", size: 1.75, sizes: [] },
  h3_typography_font_weight: "600",
  h3_typography_line_height: { unit: "em", size: 1.3, sizes: [] },
  h4_color: "#000000A6",
  h4_typography_typography: "custom",
  h4_typography_font_size: { unit: "em", size: 1.5, sizes: [] },
  h4_typography_font_weight: "600",
  h4_typography_line_height: { unit: "em", size: 1.4, sizes: [] },
  h5_color: "#000000A6",
  h5_typography_typography: "custom",
  h5_typography_font_size: { unit: "em", size: 1.125, sizes: [] },
  h5_typography_font_weight: "600",
  h5_typography_line_height: { unit: "em", size: 1.4, sizes: [] },
  h6_color: "#000000A6",
  h6_typography_typography: "custom",
  h6_typography_font_size: { unit: "em", size: 1, sizes: [] },
  h6_typography_font_weight: "600",
  h6_typography_line_height: { unit: "em", size: 1.4, sizes: [] },
};

module.exports = { body, titles };
