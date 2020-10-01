const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const basePath = __dirname;
const distPath = '../dist';

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist',
        compress: true,
        port: 9000,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    process.env.NODE_ENV === 'production' 
                        ? 'style-loader' 
                        : MiniCssExtractPlugin.loader,
                    'css-loader?url=false',
                    'sass-loader',
                ],
            },
            {
                test: /\.handlebars$/,
                loader: 'handlebars-loader'
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            outputPath: './',
                            useRelativePath: false,
                            context: 'src'
                        }          
                    },                
                ]
            },
            {
                loader: 'image-webpack-loader',
                options: {
                    mozjpeg: {
                      progressive: true,
                    },
                    // optipng.enabled: false will disable optipng
                    optipng: {
                      enabled: true,
                    },
                    pngquant: {
                      quality: [0.65, 0.90],
                      speed: 4
                    },
                    gifsicle: {
                      interlaced: false,
                    },
                    // the webp option will enable WEBP
                    webp: {
                      quality: 75
                    }
                  }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)/,
                use: [
                    'file-loader'
                ]
            },     
            {
                test: /\.html$/,
                use : [
                    'html-loader'
                ]
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'App',
            template: './src/index.handlebars',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
              }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        })
    ]
}