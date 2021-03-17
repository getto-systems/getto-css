/* eslint-disable */

module.exports = {
    findEntries,
    findHtmlFiles,
}

function findEntries() {
    return {
        ...["avail/move-to-latest-version", "avail/not-found"].reduce(toEntry, {}),
        ...findHtmlFiles()
            .map((file) => file.replace("/", "").replace(/\.html$/, ""))
            .reduce(toEntry, {}),
    }
}

function findHtmlFiles() {
    const fs = require("fs")
    const path = require("path")

    const root = path.join(__dirname, "./public/dist")
    return gatherFiles(root).map((file) => file.replace(root, ""))

    function gatherFiles(dir) {
        const files = []
        fs.readdirSync(dir, { withFileTypes: true }).forEach((file) => {
            if (file.isDirectory()) {
                if (isGatherDirectory(file.name)) {
                    gatherFiles(path.join(dir, file.name)).forEach((file) => {
                        files.push(file)
                    })
                }
            }
            if (file.isFile()) {
                if (file.name.endsWith(".html")) {
                    files.push(path.join(dir, file.name))
                }
            }
        })
        return files

        function isGatherDirectory(name) {
            const target = path.join(dir, name).replace(root, "")
            switch (target) {
                case "/coverage":
                case "/storybook":
                case "/css":
                case "/fonts":
                    return false

                default:
                    return true
            }
        }
    }
}

function toEntry(acc, name) {
    const path = require("path")

    acc[name] = toForegroundPath(name)
    return acc

    function toForegroundPath(file) {
        return toPath("foreground", file)
    }
    function toPath(type, file) {
        return path.join(__dirname, "./lib/x_main", toEntryPath(file), `${type}.ts`)
    }
    function toEntryPath(file) {
        return file.replaceAll("-", "_")
    }
}
