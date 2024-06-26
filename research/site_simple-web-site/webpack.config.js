const path = require('path');
const fs = require("fs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
//const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
//const cssnano = require("cssnano");

function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map((item) => {
        const parts = item.split(".");
        const name = parts[0];
        const extension = parts[1];
        return new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
            inject: false,
        });
    });
}

const htmlPlugins = generateHtmlPlugins("./src/html/views");

const config = {
    entry: ["./src/js/index.js", "./src/scss/style.scss"], // source js files (relative path in the current project folder)
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "./js/bundle.js", // compiled / assembled js bundle (relative path in the folder <./dist>)
    },
    devtool: "source-map", // development tools - source mapping for debug
    mode: "production",
    optimization: {
        minimizer: [
            new TerserPlugin({
                //sourceMap: true,
                extractComments: true,
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                include: path.resolve(__dirname, "src/scss"),
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            url: false,
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                include: path.resolve(__dirname, "src/html/includes"),
                use: ["raw-loader"],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./css/style.bundle.css",
        }),

        /*
        new OptimizeCSSAssetsPlugin({
            cssProcessor: cssnano,
            cssProcessorOptions: {
                map: { inline: false, annotation: true },
                discardComments: { removeAll: true },
                safe: true,
            },
            canPrint: true,
        }),
        */

        new CopyPlugin({
            patterns: [
                {
                    from: "./src/fonts",
                    to: "./fonts",
                },
                {
                    from: "./src/favicon",
                    to: "./favicon",
                },
                {
                    from: "./src/img",
                    to: "./img",
                },
                {
                    from: "./src/uploads",
                    to: "./uploads",
                },
            ],
        }),
    ].concat(htmlPlugins),
};

module.exports = (env, argv) => {
    if (argv.mode === "production") {
        config.plugins.push(new CleanWebpackPlugin());
    }
    return config;
};
