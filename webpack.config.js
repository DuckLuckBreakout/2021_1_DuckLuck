const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');


module.exports = (env) => {
    const envConfig = {};

    if (env.dev) {
        envConfig['SERVER_HOST'] = 'http://localhost:8080';
    } else {
        envConfig['SERVER_HOST'] = 'https://meetyapp.ru';
    }

    return {
        entry: ["regenerator-runtime/runtime.js", "./ozon/src/main.js"],
        mode: "development",
        optimization: {
            minimizer: [new UglifyJsPlugin({ test: /\.js(\?.*)?$/i,}),
                        new CssMinimizerPlugin()],
        },
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, './ozon/src/dist'),
        },
        module: {
            rules: [{
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                options: {
                    helperDirs: [path.join(__dirname, '/ozon/src/utils/hbs-helpers')],
                },
                exclude: /(node_modules)/
            },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            "plugins": [
                                [
                                    "@babel/plugin-proposal-class-properties"
                                ]
                            ],
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                minimize: true,
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        [
                                            "postcss-preset-env",
                                            "postcss-size",
                                        ],
                                    ],
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [
                        "style-loader",
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                // Prefer `dart-sass`
                                implementation: require("sass"),
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new webpack.EnvironmentPlugin({
                SERVER_HOST: envConfig.SERVER_HOST,
            }),
            new MiniCssExtractPlugin(),
            new CssMinimizerPlugin(),
        ]
    }
}
