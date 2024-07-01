/**
 * 按钮设置
 */
const button = {
  button_typography_typography: "custom",
  button_typography_font_size: { unit: "px", size: 14, sizes: [] },
  button_typography_font_weight: "600",
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
    unit: "em",
    top: "0.25",
    right: "0.25",
    bottom: "0.25",
    left: "0.25",
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
    top: "0.75",
    right: "1.5",
    bottom: "0.75",
    left: "1.5",
    isLinked: false,
  },
};

/**
 * 表单设置
 */
const form = {
  form_label_color: "#434343",
  form_label_typography_typography: "custom",
  form_label_typography_font_weight: "600",
  form_field_typography_typography: "custom",
  form_field_text_color: "#8c8c8c",
  form_field_border_border: "solid",
  form_field_border_width: {
    unit: "px",
    top: "1",
    right: "1",
    bottom: "1",
    left: "1",
    isLinked: true,
  },
  form_field_border_color: "#0000001A",
  form_field_border_radius: {
    unit: "em",
    top: "0.25",
    right: "0.25",
    bottom: "0.25",
    left: "0.25",
    isLinked: true,
  },
  form_field_focus_text_color: "#262626",
  form_field_focus_border_border: "solid",
  form_field_focus_border_width: {
    unit: "px",
    top: "1",
    right: "1",
    bottom: "1",
    left: "1",
    isLinked: true,
  },
  form_field_focus_border_color: "#00000056",
  form_field_padding: {
    unit: "em",
    top: "0.75",
    right: "0.75",
    bottom: "0.75",
    left: "0.75",
    isLinked: true,
  },
  form_field_typography_font_size: {
    unit: "px",
    size: 14,
    sizes: [],
  },
};

module.exports = { button, form };
