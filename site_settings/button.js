const config = require("../config");
const { setColor } = require("./global-colors");

const button = {
  button_typography_typography: "custom",
  button_typography_font_size: { unit: "em", size: 0.875, sizes: [] },
  button_typography_font_weight: config.fontWeight,
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
    unit: config.borderRadius.unit,
    top: config.borderRadius.size,
    right: config.borderRadius.size,
    bottom: config.borderRadius.size,
    left: config.borderRadius.size,
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
button.button_text_color = setColor('button_text_color',"Gray-1")
button.button_background_color = setColor('button_background_color',"Accent")
button.button_border_color = setColor('button_border_color',"Accent")
button.button_hover_text_color = setColor('button_hover_text_color',"Gray-1")
button.button_hover_background_color = setColor('button_hover_background_color',"Secondary")
button.button_hover_border_color = setColor('button_hover_border_color',"Secondary")

module.exports = button;