const fs = require("fs");
const path = require("path");

const isProduction = (() => {
  return `${process.argv[2]}`.replace(/^--/, "") === "production";
})();

const version = (() => {
  if (!isProduction) {
    return {
      all: ["xxx.xxx.xxx"],
      current: "xxx.xxx.xxx",
    };
  }

  const current = (() => {
    const file = path.join(__dirname, "../.release-version");
    const content = fs.readFileSync(file, "utf8");
    return content.replace(/\s/, "");
  })();

  const all = (() => {
    const file = path.join(__dirname, "../.versions.txt");
    const content = fs.readFileSync(file, "utf8");
    const versions = content.split("\n").filter((version) => version != "");
    if (versions.length === 0) {
      return [current];
    };
    return versions.reverse();
  })();

  return {
    all,
    current,
  };
})();

const config = {
  isProduction,
  version,
};
const data = "export const config = " + JSON.stringify(config, null, "  ");

console.log(data);

fs.writeFileSync(path.join(__dirname, "../src/config.js"), data);
