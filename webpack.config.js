const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const resolve = dir => path.join(__dirname, dir)
// 配置cdn
const PUBLIC_PATH = '/'

module.exports = (_, argv = { mode: 'development', analyz: false }) => {
  const isProduction = argv.mode === 'production'
  return {
    devtool: isProduction ? 'hidden-source-map' : 'cheap-module-eval-source-map',
    performance: {
      hints: isProduction ? 'warning' : false,
    },
    output: {
      filename: `${isProduction ? '[name].[hash]' : '[name]'}.js`, // 输出文件名，[name]表示入口文件js名
      chunkFilename: '[chunkhash].js',
      path: resolve('dist'), // 输出文件路径
      publicPath: isProduction ? PUBLIC_PATH : '/',
    },
    resolve: {
      extensions: ['.vue', '.js', '.json'],
      alias: {
        // 创建 import/require 的别名
        vue$: 'vue/dist/vue.esm.js',
        '@': resolve('src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|vue)$/,
          enforce: 'pre',
          include: [resolve('src')],
          use: {
            loader: 'eslint-loader',
          },
        },
        {
          test: /\.vue$/,
          use: 'vue-loader',
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: { minimize: isProduction, attrs: ['img:src', 'link:href'] },
            },
          ],
        },
        {
          test: /\.less$/,
          use: [isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader'], // 编译顺序从右往左
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
        {
          test: /favicon\.ico$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[hash].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.*)?$/,
          loader: 'url-loader',
          exclude: /favicon\.png$/,
          options: {
            limit: 10000, // 图片小于10000字节时以base64的方式引用
          },
        },
      ],
    },
    optimization: {
      runtimeChunk: {
        name: 'runtime',
      },
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'libs',
            test: /node_modules/,
            priority: 10,
            chunks: 'initial', // 只打包初始时依赖的第三方
          },
          iview: {
            name: 'iview',
            test: /node_modules\/iview/,
            priority: 20,
          },
          styles: {
            name: 'styles',
            test: /\.less$/,
            enforce: true,
          },
        },
      },
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
    plugins: [
      argv.analyz ? new BundleAnalyzerPlugin() : () => {},
      new CleanWebpackPlugin(['dist']), // 传入数组,指定要删除的目录
      new VueLoaderPlugin(),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebPackPlugin({
        template: './index.html', // 以/src目录下index.html文件为模板生成dist/index.html文件
        filename: './index.html',
      }),
      new MiniCssExtractPlugin({
        filename: isProduction ? '[contenthash].css' : '[name].css',
        chunkFilename: isProduction ? '[contenthash].css' : '[id].css',
      }),
      new ScriptExtHtmlWebpackPlugin({
        inline: /runtime\..*\.js$/,
      }),
    ],
    devServer: {
      open: false,
      contentBase: resolve('dist'), // 开发服务运行时的文件根目录
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      progress: true,
      host: 'localhost', // 主机地址
      port: 8082, // 端口号
      historyApiFallback: true,
      overlay: true,
      // stats: 'errors-only',
      proxy: {
        '/api/': {
          target: 'https://easy-mock.com/mock/598e8ab1a1d30433d85edb45',
          changeOrigin: true,
          secure: false,
          cookieDomainRewrite: 'localhost',
        },
      },
    },
  }
}
