const fs = require("fs");
const path = require("path");

const isProduction = (() => {
  return `${process.argv[2]}`.replace(/^--/, "") === "production";
})();

const version = (() => {
  const file = path.join(__dirname, "../.release-version");
  const content = fs.readFileSync(file, "utf8");
  return content.replace(/\s/, "");
})();

const config = {
  isProduction,
  version,
};
const data = "export const config = " + JSON.stringify(config, null, "  ");

console.log(data);

fs.writeFileSync(path.join(__dirname, "../src/config.js"), data);
