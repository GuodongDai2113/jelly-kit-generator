const config = require("../config");
const { setColor } = require("./global-colors");

const form = {
  form_label_typography_typography: "custom",
  form_label_typography_font_weight: config.fontWeight,
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
    unit: config.borderRadius.unit,
    top: config.borderRadius.size,
    right: config.borderRadius.size,
    bottom: config.borderRadius.size,
    left: config.borderRadius.size,
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
  form_field_padding: {
    unit: "em",
    top: "0.75",
    right: "0.75",
    bottom: "0.75",
    left: "0.75",
    isLinked: true,
  },
};
form.form_label_color = setColor('form_label_color',"Primary")
form.form_field_text_color = setColor('form_field_text_color',"Text")
form.form_field_background_color = '#00000000'
form.form_field_border_color = setColor('form_field_border_color',"Border-1")
form.form_field_focus_text_color = setColor('form_field_focus_text_color',"Primary")
form.form_field_focus_border_color = setColor('form_field_focus_border_color',"Border-4")

module.exports = form;