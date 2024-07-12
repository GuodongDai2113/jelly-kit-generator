const config = require("../config");
const { getColorByTitle,getGlobals} = require("./global-colors");

const systemTypography = [
  {
    _id: "primary",
    title: "Primary",
    typography_typography: "custom",
    typography_font_family: config.fontFamily,
    typography_font_weight: config.fontWeight,
  },
  {
    _id: "secondary",
    title: "Secondary",
    typography_typography: "custom",
    typography_font_family: config.fontFamily,
    typography_font_weight: config.fontWeight,
  },
  {
    _id: "text",
    title: "Text",
    typography_typography: "custom",
    typography_font_family: config.fontFamily,
    typography_font_weight: "400",
  },
  {
    _id: "accent",
    title: "Accent",
    typography_typography: "custom",
    typography_font_family: config.fontFamily,
    typography_font_weight: config.fontWeight,
  },
];

function getTypography(element, colorTitle, size, sizeUnit, lineHeight, lineHeightUnit) {
    const color = getColorByTitle(colorTitle);
    const typography = {};

    // 颜色配置
    typography[`${element}_color`] = color.color;
    getGlobals()[`${element}_color`] = `globals/colors?id=${color._id}`;

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
        typography[`${element}_typography_font_weight`] = config.fontWeight;
    }

    // 行高配置
    typography[`${element}_typography_line_height`] = {
        unit: lineHeightUnit,
        size: lineHeight,
        sizes: [],
    };

    return typography;
}

const customTypography = {
    paragraph_spacing: { unit: "em", size: 1.5, sizes: [] },
    body_typography_font_family: config.fontFamily,
    ...getTypography("body", "Text", { pc: 1, tablet: 1, mobile: 1 }, "em", 2, "em"),
    ...getTypography("h1", "Primary", { pc: 2.5, tablet: 2.25, mobile: 2 }, "em", 1.2, "em"),
    ...getTypography("h2", "Primary", { pc: 2, tablet: 1.875, mobile: 1.75 }, "em", 1.3, "em"),
    ...getTypography("h3", "Primary", { pc: 1.75, tablet: 1.625, mobile: 1.5 }, "em", 1.3, "em"),
    ...getTypography("h4", "Primary", { pc: 1.5, tablet: 1.375, mobile: 1.25 }, "em", 1.4, "em"),
    ...getTypography("h5", "Primary", { pc: 1.25, tablet: 1.125, mobile: 1.125 }, "em", 1.4, "em"),
    ...getTypography("h6", "Primary", { pc: 1, tablet: 1, mobile: 1 }, "em", 1.5, "em")
};

function getTypographys() {
    return customTypography


}
module.exports = {systemTypography,getTypographys};
