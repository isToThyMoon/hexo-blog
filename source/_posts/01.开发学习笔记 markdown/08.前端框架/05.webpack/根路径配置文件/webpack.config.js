---
categories:
  - 01.开发学习笔记 markdown
  - 08.前端框架
  - 05.webpack
  - 根路径配置文件
---
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 需要另外npm安装 webpack不自带
const CleanWebpackPlugin = require('clean-webpack-plugin') // 同上
const path = require('path'); // node.js操作文件的模块 这里的引入是commonJS的语法

const webpack = require('webpack'); // 引入自带webpack模块 如热模块更新功能 webpack.HotModuleReplacementPlugin(),


module.exports = {
    mode: 'production',     //打包模式 影响打包出的文件的组织形式 是否压缩  
    // devtool: cheap-module-eval-source-map,     // 打开sourceMap 将打包文件和源代码建立关系映射(development模式最佳实践 代码错误提示精确只到行 监控其他第三方模块 快速执行)
    // devtool: cheap-module-source-map  // production模式下最佳实践
    //entry: './src/index.js',     // 入口文件 以哪个文件为入口主体打包
    //entry: {
    //    main: './src/index.js'
    //},
    entry: {
       main: './src/index.js',      //打包成两个文件 一个叫main.js 一个叫sub.js 那么output输出名也要作占位符处理
       sub: './src/index.js',
    },

    // output: {                       // 输出设置
    //     filename: 'bundle.js',
    //     path: path.resolve(__dirname, 'dist') // 输出文件的路径（一定是绝对路径） 这里__dirname指webpack.config.js这个文件所在的文件夹 resovle方法返回的是两者结合的路径
    // },

    output: {                       // 输出设置
        publicPath: 'http://cdn.cn',  // 我们打包完成的js可能不会放在服务器同html一起的位置 而是放在cdn中负载均衡加速用户使用。那么加上publicPath 会在注入到html的js地址加上此前缀 更多output值见documentation-configuration中更多配置。
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist') // 输出文件的路径（一定是绝对路径） 这里__dirname指webpack.config.js这个文件所在的文件夹 resovle方法返回的是两者结合的路径
    },

    devServer: {                   // 通过webpack-dev-server起一个服务器
        contentBase: './dist',     //在config文件同文件夹下的dist目录起一个server server。启动后会发现并没有和打包命令一样创建一个dist目录，其实webpack-dev-server是把打包内容放在了内存中提高打包和运行速度。
        open: true,                // 帮助我们自动打开浏览器 打开页面
        proxy: {
            '/api': 'http://localhost:3000' // 接口模拟代理
        },
        hot: true,  // 配合webpack.HotModuleReplacementPlugin()打开热模块更新 当代码发生样式更改时仅直接替换样式而不是重刷整个页面 
        // HML的功能是当你修改了css的内容，server只更新css样式内容，如果之前通过js调用的方式创建了多个关联此样式修改的元素 并不会丢失这些js调用的结果
        hotOnly: true, // 如果HML出了错，server也会帮我们自动刷新一下页面，这里设我true即使hml没有生效(发生错误之类)也不让浏览器自动重新刷新 失效就失效 不做额外处理
    },

    module: {
        rules: [{
            test: /\.(jpg|png|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    // placeholder语法 具体更多占位符写法见WP官方file-loader或url-loader介绍的placeholder部分
                    name: '[name]_[hash].[ext]',   // 表示打包后的图片名和原文件一致 加hash值
                    outputPath: 'images/',   // 输出路径：dist下的images文件夹
                    limit:10240,             // 小于10KB转成base64打包进js 大于10KB按路径打包成单独文件
                }
            }
        },{
            test: /\.(eot|ttf|svg)$/,
            use: {
                loader: 'file-loader',
                options: {
                    // placeholder语法 具体更多占位符写法见WP官方file-loader或url-loader介绍的placeholder部分
                    name: '[name].[ext]',   // 表示打包后的文件名和原文件一致
                    outputPath: 'fonts/',   // 输出路径：dist下的fonts文件夹
                }
            }
        },{
            test: /\.(css)$/,
            use: [
                'style-loader', // 把css挂载到页面的style标签上
                'css-loader',   // 分析多个css文件关系，如果之间有css引入语法 打包成一段css
                'postcss-loader',
            ]
        },{
            test: /\.(scss)$/,
            use: [
                'style-loader', // 把css挂载到页面的style标签上
                // 分析多个css文件关系，如果之间有css引入语法 打包成一段css
                {
                    loader: 'css-loader',
                    options: {
                // js中引入scss文件，scss文件又通过@import这样的css引入语法引入另一个scss文件，这时这个@import可能就不会走之前的两个loader而是直接从css-loader 和style-loader开始走。 importloaders：2这样的语法确保会走之前两个loader打包后在走css-loader 依次从下到上执行所有loader
                        importloaders: 2,
                        modules: true, //打开css模块化 不开启全局
                    }
                },
                'scss-loader',  // 翻译scss语法  loader加载顺序是从下到上 从右到左的
                'postcss-loader', // css兼容的polyfill 需要配合配置文件postcss.config.js添加插件使用
            ]
        },{
            test: /\.js$/,
            exclude: /node_modules/,     // node_modules里的模块不会被翻译
            loader: 'babel-loader',
            options: {                      // 如果配置项过长的话 也可以把这个对象写在根路径下的.babelrc文件里 
                // presets: ['@babel/preset-env']
                // presets: [['@babel/preset-env', {  // preset置参数
                //     targets: {
                //         chrome: '67'
                //     },                  // 看目标浏览器版本是否实现了相关语法 如果没有再翻译相关语法
                //     useBuiltIns: 'useage'   // useage表示只引入使用到的相关类的polyfill 而不是全部引入 导致打包文件过大 也不需要
                // }]]
                presets: [
                    [
                        '@babel/preset-env', {  // preset置参数
                            targets: {
                                chrome: '67'
                            },                  // 看目标浏览器版本是否实现了相关语法 如果没有再翻译相关语法
                            useBuiltIns: 'useage'   // useage表示只引入使用到的相关类的polyfill 而不是全部引入 导致打包文件过大 也不需要
                        }, 
                        '@babel/preset-react'          // react语法的翻译 先翻译react语法 在用@babel/preset-env翻译es6语法。
                    ]
                ],  

                "plugins": [["@babel/plugin-transform-runtime", {  // runtime翻译polyfill语法 不需要每次使用时引入polyfill
                    "core.js": 2,
                    "helpers": true,
                    "regenerator": true,
                    "useESModules": false
                }]]

            }
        },]
    },

    plugins: [
        new HtmlWebpackPlugin({
        template: 'src/index.html'   //打包完成后以此路径的文件为模版生成一个html文件
        }),
        new CleanWebpackPlugin(['dist']), //每次重新打包前将dist目录清空
        new webpack.HotModuleReplacementPlugin(),
    ]

}

