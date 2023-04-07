const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin();

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
const generatedHash = Math.random().toString(36).replace(/[^a-z0-9]+/g, '').substr(2, 8);

module.exports = {
    mode: isProduction ? 'production' : 'development',
    bail: isProduction,
    devtool: isDevelopment ? 'cheap-module-source-map' : 'source-map',
    entry: ['react-hot-loader/patch', './src/index.tsx'],
    output: {
        path: path.join(__dirname, 'build'),
        filename: isProduction
            ? 'js/bundle.[name].[contenthash:8].js'
            : 'js/bundle.[name].[fullhash:8].js',
        chunkFilename: isProduction
            ? 'js/[name].[contenthash:8].chunk.js'
            : 'js/[name].[fullhash:8].chunk.js'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'build'),
        },
        open: true,
        hot: true,
        port: 1339,
        historyApiFallback: true
    },
    optimization: {
        minimize: isProduction,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: { comments: false },
                },
                extractComments: false,
            })
        ],
        splitChunks: {
            chunks: 'all',
            name: false
        },
        runtimeChunk: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'ts-loader'
                }
            },
            {
                test: /.(css|scss)$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 2 }
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: { outputStyle: 'expanded' }
                        }
                    }
                ]
            },
            {
                test: /.(bmp|jpg|jpeg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(eot|woff|woff2|svg|ttf|otf)([\?]?.*)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                    }
                }
            },
            {
                test: /\.svg$/,
                use: [
                    '@svgr/webpack',
                    {
                        loader: 'svg-url-loader',
                        options: {
                            limit: 10000,
                            name: 'img/[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', 'json'],
        alias: {
            "src": path.join(__dirname, "src"),
            'react-dom': '@hot-loader/react-dom',
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, './public/index.html'),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: false,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: 'public',
                    globOptions: {
                        ignore: ['**/index.html', '**/config.js']
                    }
                },
                {
                    from: 'public/config.js',
                    to: path.join(__dirname, `build/config.${generatedHash}.js`)
                }
            ]
        }),
        new HtmlWebpackTagsPlugin({
            tags: [`config.${generatedHash}.js`],
            append: false,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.[contenthash:8].css',
            chunkFilename: 'css/[id].[contenthash:8].css'
        }),
        gitRevisionPlugin,
        new webpack.DefinePlugin({
            'GIT_VERSION': JSON.stringify(gitRevisionPlugin.version()),
            'GIT_COMMITHASH': JSON.stringify(gitRevisionPlugin.commithash()),
            'GIT_BRANCH': JSON.stringify(gitRevisionPlugin.branch())
        }),
        new Dotenv({
            path: './.env',
            safe: true,
            allowEmptyValues: true,
            systemvars: true,
            silent: true,
            defaults: false
        }),
        isDevelopment && new CaseSensitivePathsPlugin(),
        isProduction && new webpack.NoEmitOnErrorsPlugin()
    ].filter(Boolean)
};
