/*
*  该配配置文件是给：开发环境用的
* 本js文件是webpack的核心配置文件，
*   1.里面所配置的是：所有webpack要去做的“任务”，该文件不可随意更改名字。
*   2.所有的配置文件，都必须按照官方要求去写。
*   3.webpack在运行时，会自动读取该文件里的配置
* */

//引入path模块，用于解决路径问题
const {resolve} = require('path');
//引入html-webpack-plugin，用于创建html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// const { NODE_ENV } = process.env

//webpack的配置文件，使用CommonJs语法暴露出去一个对象
module.exports = {
  //配置入口文件所在的位置
  entry: ['./src/index.tsx'],
  //配置webpack的输出位置
  output: {
    path: resolve(__dirname, 'dist'), //输出位置
  },
  mode:'development', //模式的选择
  //所有的loader都要配置在module对象里的rules里
  module: {
    //所有的loader都要配置在这里,loader下载后直接声明使用即可，无需引入。
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      //编译less为style样式
      {
        test: /\.scss$/,//匹配所有.scss文件
        //use里的多个loader，“干活”的顺序是：从右到左的顺序
        use: [
          'sass-loader' // 将sass转换为css
        ]
      },
      //使用eslint检查js语法
      {
        test: /\.js$/,  //匹配js文件
        exclude: /node_modules/,  //排除node_modules文件夹
        enforce: "pre",  //提前加载使用
        use: { //使用eslint-loader去检查
          loader: "eslint-loader"
        }
      },
      //使用babel-loader解析es6语法，但是只能解析一些简单的，例如Promise就不能翻译
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',  // 按需引入需要使用polyfill
                  corejs: { version: 3 }, // 解决一个报错的问题
                  targets: { // 指定兼容性处理哪些浏览器
                    "chrome": "75",
                    "ie": "11",
                  }
                }
              ]
            ],
            cacheDirectory: true, // 开启babel缓存
          }
        }
      },
      //编译ts、tsx文件
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
				exclude: /node_modules/,
			},
      //使用url-loader处理less文件中的图片资源
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              outputPath: 'images', //输出图片的位置
              publicPath: '/images', //控制css引入图片的路径
              name: '[hash:5].[ext]', // 修改文件名称 [hash:8] hash值取8位  [ext] 文件扩展名
              limit: 8192 // 如果图片小于8KB则转为base64
            },
          },
        ],
      },
      //使用html-loader，处理html文件中的img标签
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      },
      //使用file-loader解决其他文件资源的引入问题
      {
        test: /\.(eot|svg|woff|woff2|ttf|mp3|mp4|avi)$/,  // 处理其他资源
        loader: 'file-loader',
        options: {
          outputPath: 'font',
          name: '[hash:5].[ext]'
        }
      }
    ]
  },
  plugins: [
    //实例化一个HtmlWebpackPlugin
    new HtmlWebpackPlugin({
      template: './public/index.html', // 以指定文件为模板创建新的HtML(1. 结构和原来一样 2. 会自动引入打包的资源)
    })
  ],
  resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json'],
		alias: {
			// '@component': path.resolve(__dirname, './src/component'),
			// '@page': path.resolve(__dirname, './src/page'),
			// '@utils': path.resolve(__dirname, './src/utils'),
		},
	},
  stats:{children: false}, //解决使用HtmlWebpackPlugin插件时多余提示的问题
  devServer: {
    open: true, // 自动打开浏览器
    compress: true, // 启动gzip压缩
    port: 3000, // 端口号
    hot: true, // 开启热模替换功能 HMR
    overlay: {
			//当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
			errors: true,
		},
  },
  devtool:'cheap-module-eval-source-map'
};

