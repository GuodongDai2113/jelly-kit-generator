const { generate, presetPalettes } = require("@ant-design/colors");

const gray = [
  { _id: "", title: "gray-1", color: "#ffffff" },
  { _id: "", title: "gray-2", color: "#fafafa" },
  { _id: "", title: "gray-3", color: "#f5f5f5" },
  { _id: "", title: "gray-4", color: "#f0f0f0" },
  { _id: "", title: "gray-5", color: "#d9d9d9" },
  { _id: "", title: "gray-6", color: "#bfbfbf" },
  { _id: "", title: "gray-7", color: "#8c8c8c" },
  { _id: "", title: "gray-8", color: "#595959" },
  { _id: "", title: "gray-9", color: "#434343" },
  { _id: "", title: "gray-10", color: "#262626" },
  { _id: "", title: "gray-11", color: "#1f1f1f" },
  { _id: "", title: "gray-12", color: "#141414" },
  { _id: "", title: "gray-13", color: "#000000" },
];

gray.forEach((element) => {
  element._id = element.color.replace("#", "g");
});

const border = [
  { _id: "br0001a", title: "border-1", color: "#0000001A" },
  { _id: "br00026", title: "border-2", color: "#00000026" },
  { _id: "br00038", title: "border-3", color: "#00000038" },
  { _id: "br00056", title: "border-4", color: "#00000056" },
  { _id: "spl050f", title: "split-l", color: "#0505050F" },
  { _id: "spdfd1f", title: "split-d", color: "#FDFDFD1F" },
];

const getColors = function (accent) {
  const accents = [];
  try {
    generate(accent).forEach((element, index) => {
      let _id = element.replace("#", "c");
      accents.push({
        _id: _id,
        title: "accent-" + (index + 1),
        color: element,
      });
    });
    const other = [];
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
    return [...gray, ...border, ...accents, ...other];
  } catch (err) {
    console.error("[error]");
  }
};

module.exports = { getColors };
