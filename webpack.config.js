const path = require('path')
// path是node.js内置的,用来处理路径的
// path.join()方法用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是”/“，Windows系统是”\“
// path.resolve()方法用于将相对路径转为绝对路径。
const HtmlWebpackPlugin = require('html-webpack-plugin') // 生成html插件

const ExtractTextPlugin = require('extract-text-webpack-plugin') // 生成css插件

const CleanWebpackPlugin = require('clean-webpack-plugin')
// 每次生成的文件名称都是不一样的,解决了缓存问题,但是bundle文件夹里的东西越来越多,这个插件就是用来清理的

module.exports = {
  // entry为入口,webpack从这里开始编译
  entry: [
    'babel-polyfill',
    path.join(__dirname, './src/index.js')
  ],
  // [
  //   'babel-polyfill',
  //   path.join(__dirname, './src/index.js') // __dirname 是node.js的全局属性,代表当前路径 注意啦是__不是_两个下划线
  // ],
  // output为输出 path代表路径 filename代表文件名称
  output: {
    path: path.join(__dirname, 'bundle'), // 打包名称一直一样很容易造成缓存问题,添加hash值每次生成的都是不同的的文件名
    filename: 'bundle.[hash:8].js',
    chunkFilename: '[name].[chunkhash:8].js'
    // (chunk:被entry所依赖的额外的代码块,可以包含一个或多个文件) 指定好生成文件的名字,
    // 以及想抽取哪些入口js文件的公共代码,webpack会自动帮我们合并好
  },
  // module是配置所有模块要经过什么处理
  // test:处理什么类型的文件,use:用什么,include:处理这里的,exclude:不处理这里的
  module: {
    rules: [{
      test: /\.js|jsx$/,
      use: ['babel-loader'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader', 'less-loader']
      })
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'url-loader', // 编译图片
        options: {
          limit: 8192  // 8k一下的转义为base64
        }
      }]
    }]
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',  // 打包后的文件名
      template: path.join(__dirname, './src/index.html')  // 要打包文件的路径
    }),
    new ExtractTextPlugin({
      filename: 'index.css'
    }),
    new CleanWebpackPlugin(['bundle'])
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'common',
          chunks: 'all' // chunk : all,async,inital三选一作为插件作用的chunk范围
        },
        vendorForThird: {
          test: /[\\/]third-party[\\/]/,
          name: 'thirdPart',
          chunks: 'all' // chunk : all,async,inital三选一作为插件作用的chunk范围
        }
      }
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'bundle'),  // 启动路径
    host: 'localhost',  // 域名
    port: 8018  // 端口号
  },
  devtool: ''
}
