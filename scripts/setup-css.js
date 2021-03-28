/* eslint-disable */
const path = require("path")
const fs = require("fs")

const postcss = require("postcss")

const autoprefixer = require("autoprefixer")
const postcssImport = require("postcss-import")
const customMedia = require("postcss-custom-media")
const customSelectors = require("postcss-custom-selectors")

const CleanCss = require("clean-css")

compile({
    source: path.join(__dirname, "../css/resources/site.css"),
    output: path.join(__dirname, "../public/dist/css/site.css"),
    plugins: [postcssImport(), autoprefixer()],
})
compile({
    source: path.join(__dirname, "../css/getto.css"),
    output: path.join(__dirname, "../artifact/dist/getto.css"),
    plugins: [postcssImport(), customMedia(), customSelectors(), autoprefixer()],
})

function compile({ source, output, plugins }) {
    fs.readFile(source, (_err, css) => {
        postcss(plugins)
            .process(css, { from: source, to: output })
            .then((postcssResult) => {
                process.chdir(path.dirname(source))

                const result = new CleanCss({ level: 2 }).minify(postcssResult.css)
                if (result.errors.length > 0) {
                    console.error(result.errors)
                    process.exit(1)
                }
                if (result.warnings.length > 0) {
                    console.error(result.warnings)
                }

                console.log(`${source} -> ${output}`)
                fs.writeFile(output, result.styles, () => true)
            })
    })
}
