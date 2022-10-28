// 导出配置
// webpack.config.js

const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')  // 路径管理模块

module.exports = {
    // npx webpack 命令: 会自动打包这个文件
    // 入口,  默认值 ./src/index.js
    entry: './src/index2.js',
    // 出口: 打包后的文件相关信息
    output: {
        // 打包出来的文件名, 默认是main.js
        filename: 'bundle.js',
        // 设置文件的存储目录路径
        path: path.resolve(__dirname, 'dist'),
        clean: true,  // 打包后,清理之前的遗留代码
    },
    // 当前的开发模式,不设置的话, 打包会有警告,
    // node代表暂时忽略,其它选项可以看官方文档配置的
    mode: 'none',
    // 插件: 为webpack提供额外的功能
    plugins: [
        // 自动生成index.html 的插件: html-webpack-plugin
        // 先安装: npm i html-webpack-plugin
        new HtmlWebpackPlugin(),
    ],
}