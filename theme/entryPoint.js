/* eslint-disable */

module.exports = {
    findEntries,
    findHtmlFiles,
    toEntryName,
    toEntryPath,
}

function findEntries() {
    return [
        ...findUpdateEntries().map((entry) => `/update${entry}`),
        ...findHtmlFiles().map((entry) => `/theme${entry}`),
    ]
}

function findUpdateEntries() {
    return ["/moveToLatestVersion"]
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

function toEntryName(file) {
    return file.replace("/", "").replace(/\.html$/, "")
}
function toEntryPath(file) {
    if (file.startsWith("/theme/docs/")) {
        return "/theme/docs"
    }
    return file.replace(/\.html$/, "")
}
