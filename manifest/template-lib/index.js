const fs = require("fs-extra");
const path = require("path");
const { readJson, writeJson } = require("../utils");

const templates = {
    async kit2template(jsonPath, title, type) {
      const jsonData = await readJson(jsonPath);
      const template = {
        content: [],
        page_settings: [],
        version: "0.4",
        title,
        type,
      };
      if (jsonData.hasOwnProperty("content")) {
        template.content = jsonData.content;
      }
      return template;
    },
    async template2kit(jsonPath) {
      const jsonData = await readJson(jsonPath);
      const template = {
        content: [],
        settings: {},
        metadata: [],
      };
      if (jsonData.hasOwnProperty("content")) {
        template.content = jsonData.content;
      }
      if (jsonData.hasOwnProperty("page_settings")) {
        template.settings = jsonData.page_settings;
      }
      return template;
    },
    getTemplateType(dirName) {
      return dirName.toLowerCase().replace(/\s+/g, "-");
    },
    async getTemplates() {
      try {
        const templateFiles = await fs.promises.readdir("./templates");
        const tps = {};
        await Promise.all(
          templateFiles.map(async (file) => {
            const filePath = path.join("./templates", file);
            const fileStats = await fs.promises.stat(filePath);
            if (fileStats.isDirectory()) {
              const type = this.getTemplateType(file);
              tps[type] = [];
              const subFiles = await fs.promises.readdir(filePath);
              await Promise.all(
                subFiles.map(async (subFile) => {
                  const fileSubPath = path.join(filePath, subFile);
                  const subFileStats = await fs.promises.stat(fileSubPath);
                  if (subFileStats.isFile()) {
                    const safeSubFileName = path.basename(subFile, ".json");
                    tps[type].push({
                      title: `${file} ${safeSubFileName}`,
                      file: subFile,
                    });
                  }
                })
              );
            }
          })
        );
  
        return tps;
      } catch (error) {
        console.error("Error reading templates:", error);
        throw error;
      }
    },
    async getKit() {
      try {
        const tp = await this.getTemplates();
        let index = 0
        const kit = {}
        for (const key in tp) {
          if (Object.hasOwnProperty.call(tp, key)) {
            index+=1
            const element = tp[key];
            element.forEach(element => {
              
            });
            console.log(element);
            let location = ""
            if (key != 'loop-item') {
              location = key.replace(/-.*/, '')
            }
            kit[index] = {
              title:element.title,
              doc_type:key,
              location:location,
            }
          }
        }
        return kit;
      } catch (error) {
        console.log(error);
        return {}
      }
    },
  };