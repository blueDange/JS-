// 导出配置
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path') //路径管理模块
module.exports = {
  // npx webpack 命令: 会自动打包这个文件
  // 入口,  默认值 ./src/index.js
  entry: './src/index3.js',
  // 出口: 打包后的文件相关信息
  output: {
    // 打包后的文件名, 默认是 main.js
    filename: 'bundle.js',
    // 设置文件存储的目录路径
    path: path.resolve(__dirname, 'dist'),
    clean: true, //打包后, 清理之前的遗留代码
  },
  // 当前的开发模式, 不设置的话, 打包时有警告
  // none代表暂时忽略, 其他选项可以看官方文档 的配置部分
  mode: 'none',
  //插件: 为webpack提供额外的功能
  plugins: [
    // 自动生成 index.html 的插件: html-webpack-plugin
    // 先安装: npm i html-webpack-plugin
    // 生成的html中, 会自动引入打包出来的js 文件
    new HtmlWebpackPlugin({ title: '我是题目' }),
  ],
  // 开发服务器: 类似 live server 插件
  // 安装: npm i -D webpack-dev-server
  // 在 package.json 中配置开启命令
  devServer: {
    static: './dist', // 指定静态文件目录, 即index.html 所在
    hot: true, //开启热更新
  },
  module: {
    // 规则:
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        // 正则验证:  以 .css 结尾的文件
        // 即: scss 或 css 都行
        test: /\.s?css$/i, // s? :这个 s 有没有都行
        // 使用这些加载器: 加载器是有序的, 必须按下方书写
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
}
