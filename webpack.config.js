const Encore = require("@symfony/webpack-encore");
const path = require('path');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'prod');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath("public/build")
    // public path used by the web server to access the output path
    .setPublicPath("/build")

    .cleanupOutputBeforeBuild()

    .disableSingleRuntimeChunk()

    .enablePostCssLoader()


    /*
     * ENTRY CONFIG
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */

    .enableSourceMaps(Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .configureBabel((config) => {
        config.plugins.push("@babel/plugin-proposal-class-properties");
    })
    // enables @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })

    .addEntry("app", "./assets/js/index.tsx")
    // enables Sass/SCSS support
    .enableSassLoader()
    // uncomment if you use TypeScript
    .enableTypeScriptLoader()

    // enable react
    .enableReactPreset()

// uncomment to get integrity="..." attributes on your script & link tags
// requires WebpackEncoreBundle 1.4 or higher
//.enableIntegrityHashes(Encore.isProduction())

// uncomment if you're having problems with a jQuery plugin
//.autoProvidejQuery()
;

module.exports = Encore.getWebpackConfig();

