const { generate, presetPalettes } = require("@ant-design/colors");
const config = require("../config");
const __globals__ = {};

const systemColors = [
  { _id: "primary", title: "Primary", color: config.primaryColor },
  { _id: "secondary", title: "Secondary", color: config.secondaryColor },
  { _id: "text", title: "Text", color: config.textColor },
  { _id: "accent", title: "Accent", color: config.accentColor },
];

const gray = [
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

const border = [
  { _id: "br0001a", title: "Border-1", color: "#0000001A" },
  { _id: "br00026", title: "Border-2", color: "#00000026" },
  { _id: "br00038", title: "Border-3", color: "#00000038" },
  { _id: "br00056", title: "Border-4", color: "#00000056" },
];

const accents = [];

if (config.accentExpansion) {
  generate(config.accentColor).forEach((element, index) => {
    let _id = element.replace("#", "c");
    accents.push({
      _id: _id,
      title: "Accent-" + (index + 1),
      color: element,
    });
  });
}

const other = [];

if (config.otherExpansion) {
  for (const key in presetPalettes) {
    if (key != "grey") {
      presetPalettes[key].forEach((element, index) => {
        let _id = element.replace("#", "p");
        other.push({
          _id: _id,
          title: key + "-" + (index + 1),
          color: element,
        });
      });
    }
  }
}

function getColors() {
  return {
    system_colors: [...systemColors],
    custom_colors: [...gray, ...border, ...accents, ...other],
  };
}

function getColorByTitle(title) {
  const { system_colors, custom_colors } = getColors();
  for (const element of system_colors) {
    if (element.title == title) {
      return element;
    }
  }
  for (const element of custom_colors) {
    if (element.title == title) {
      return element;
    }
  }
  return {};
}

function setColor(element,colorTitle) {
  const color = getColorByTitle(colorTitle);
  __globals__[`${element}`] = `globals/colors?id=${color._id}`;
  return color.color
}

function getGlobals(){
  return __globals__
}

module.exports = { getColors, getColorByTitle, getGlobals,setColor};
