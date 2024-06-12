const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: {
        popup: path.resolve('src/popup/popup.tsx'),
        background: path.resolve('src/background.ts'),
        content: path.resolve('src/content.ts'),
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.tsx?$/,
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                ],
            },]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve("src/static"),
                    to: path.resolve("dist")
                }
            ]
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            crypto: false
        }
    },
    output: {
        filename: '[name].js',
        path: path.resolve('dist')
    }
}