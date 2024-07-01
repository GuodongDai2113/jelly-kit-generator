const {writeJsonSync,createZip} = require('./utils')
const config = require('./config');
const site_settings = require("./site_settings");
const manifest = require("./manifest");

writeJsonSync(config.getDistPath("site-settings.json"), site_settings)
writeJsonSync(config.getDistPath("manifest.json"), manifest)
createZip(config.distPath.path,config.getDistPath("kit.zip"))

