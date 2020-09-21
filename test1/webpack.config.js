const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { AutoWebPlugin } = require('web-webpack-plugin');

const autoWebPlugin = new AutoWebPlugin('Pages', {
    template: './template.html',
    postEntrys: ['./common.css'],
    commonsChunk: {
        name: 'common',// 提取出公共代码 Chunk 的名称
    },
})

module.exports = {
    entry: autoWebPlugin.entry({

    }),
    output: {
        filename: '[name]_[chunkhash:8].js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                // 用正则去匹配要用该 loader 转换的 CSS 文件
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                // 排除 node_modules 目录下的文件，
                // 该目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换
                exclude: path.resolve(__dirname, 'node_modules'),
            },
        ]
    },
    plugins: [
        autoWebPlugin,
        new MiniCssExtractPlugin({
            filename: `[name]_[contenthash:8].css`,
        }),
    ]


};