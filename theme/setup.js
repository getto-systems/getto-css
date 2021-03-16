/* eslint-disable */
const fs = require("fs")
const path = require("path")

const entryPoint = require("./entryPoint")

const environmentRoot = path.join(__dirname, "./lib/y_environment")
dump(path.join(environmentRoot, "env.ts"), envContent())
dump(path.join(environmentRoot, "path.ts"), pathContent())

function envContent() {
    const isProduction = process.env.BUILD_ENV == "production"
    const version = (() => {
        if (isProduction) {
            return fs.readFileSync(path.join(__dirname, "../.release-version"), "utf8").trim()
        } else {
            return "dist"
        }
    })()

    const env = {
        version,
        isProduction,

        storageKey: {
            menuExpand: {
                main: "GETTO-CSS-MENU-EXPAND-MAIN",
                docs: "GETTO-CSS-MENU-EXPAND-DOCS",
            },
        },
    }

    return "export const env = " + JSON.stringify(env, null, "    ")
}

function pathContent() {
    const files = ["/storybook/index.html"].concat(entryPoint.findHtmlFiles())
    const docs = files.filter(isDocs)
    return [
        "export type StaticMenuPath =" + toTypeVariant(files),
        "export type StaticContentPath =" + toTypeVariant(docs),
        "export const staticContentPaths: StaticContentPath[] = " + toConstValue(docs),
    ].join("\n")

    function isDocs(file) {
        return file.startsWith("/docs/")
    }

    function toTypeVariant(files) {
        if (files.length === 0) {
            return ' ""'
        }
        const padding = "\n    | "
        return padding + files.map(toStringLiteral).join(padding)
    }
    function toConstValue(files) {
        return JSON.stringify(files, null, "    ")
    }

    function toStringLiteral(file) {
        return `"${file}"`
    }
}

function dump(file, content) {
    console.log(file)
    console.log(content)
    fs.writeFileSync(file, content + "\n")
}
