// craco.config.js
const path = require("path");
const CracoAlias = require("craco-alias");


module.exports = {
    style: {
        postcss: {
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
            ],
        },
    },
    webpack: {
        configure: webpackConfig => {
            const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
                ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
            );

            webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
            return webpackConfig;
        },
        alias: {
            'Tailwind': path.resolve(__dirname, "tailwind.config.js"),
            '~': path.resolve(__dirname, 'src/')
        }
    },
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: "tsconfig",
                baseUrl: "./src",
                tsConfigPath: './tsconfig.extend.json'
                // see in examples section
            }
        }
    ]
}