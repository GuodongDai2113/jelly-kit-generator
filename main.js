const fs = require('fs');
const config = require("./config");
const { writeJsonSync, createZip } = require("./utils");

const siteSettings = require("./site_settings");
const manifest = require("./manifest");

writeJsonSync(config.paths.dist.siteSettings, siteSettings);
writeJsonSync(config.paths.dist.manifest, manifest);
// createZip('./dist', `./dist/${config.kitName}.zip`);
createZip('./dist', `G:/01.Website/${config.kitName}.zip`);
