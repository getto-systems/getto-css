module.exports = () => ({
  plugins: [
    require("postcss-import")({
      "plugins": [
        require("stylelint")({
          "config": {
            "extends": "stylelint-config-standard",
            "rules": {
              "at-rule-empty-line-before": null,
              "property-no-unknown": null,
              "declaration-empty-line-before": null,
              "custom-property-empty-line-before": null,
            }
          }
        })
      ]
    }),
    require("postcss-utilities")({}),
    require("postcss-custom-properties")({}),
    require("postcss-apply")({}),
    require("postcss-calc")({}),
    require("postcss-custom-media")({}),
    require("postcss-nested")({}),
    require("postcss-color-gray")({}),
    require("pixrem")({}),

    require("autoprefixer")({}),
    require("csswring")({}),

    require("postcss-reporter")({"clearMessages": true})
  ]
})
