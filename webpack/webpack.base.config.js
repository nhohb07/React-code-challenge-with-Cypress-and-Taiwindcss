const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');

const Dotenv = require('dotenv-webpack');

const APP_DIR = path.resolve(__dirname, '../src');

module.exports = (env, argv) => {
  const { ENVIRONMENT } = env;
  const WEBPACK_MODE = argv.mode;

  return merge([
    {
      node: { fs: 'empty' },
      watchOptions: {
        ignored: ['webpack/**', 'public/**', 'node_modules/**', 'dist/**', 'server/**'],
        aggregateTimeout: 300,
        poll: 1000,
      },

      entry: {
        main: ['@babel/polyfill', `${APP_DIR}/index.tsx`],
      },

      output: {
        filename: WEBPACK_MODE === 'development' ? '[name].bundle.js' : '[name].[hash:8].bundle.js',
        chunkFilename:
          WEBPACK_MODE === 'development'
            ? '[name].chunk.bundle.js'
            : '[name].[hash:8].chunk.bundle.js',
        path: path.resolve(__dirname, '..', 'dist'),
        publicPath: '/',
        pathinfo: false,
      },

      // Enable sourcemaps for debugging webpack's output.
      devtool: 'eval-cheap-source-map',

      resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
        mainFields: ['browser', 'main', 'module'],
        plugins: [new TsconfigPathsPlugin()],
      },
      module: {
        rules: [
          // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
          {
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true,
                },
              },
            ],
          },
          // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
          {
            enforce: 'pre',
            test: /\.(js|jsx)$/,
            loader: 'source-map-loader',
            exclude: [path.join(process.cwd(), 'node_modules')],
          },
          {
            test: /\.(js|jsx)$/,
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
              },
            ],
          },
          {
            test: /\.(scss|css)$/,
            use: [
              WEBPACK_MODE === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: { sourceMap: WEBPACK_MODE === 'development' },
              },
              {
                loader: 'postcss-loader',
                options: { sourceMap: WEBPACK_MODE === 'development' },
              },
            ],
          },
          {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: 'assets/fonts/',
                },
              },
            ],
          },
          {
            test: /\.(ico|png|jpg|jpeg|gif|webp)?$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: './',
                },
              },
            ],
          },
        ],
      },
      plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new ForkTsCheckerNotifierWebpackPlugin({ title: 'React Typescript Code Base' }),
        new HtmlWebpackPlugin({
          template: './src/index.html',
          filename: './index.html',
          chunksSortMode: 'none',
          minify:
            WEBPACK_MODE === 'development'
              ? false
              : {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
        }),
        new webpack.DefinePlugin({
          'process.env.ENVIRONMENT': JSON.stringify(ENVIRONMENT),
        }),
        new CopyWebpackPlugin({
          patterns: [
            {
              from: 'src/assets',
            },
          ],
        }),
        new Dotenv({
          path: ENVIRONMENT ? `.env.${ENVIRONMENT}` : '.env.dev',
        }),
      ],
    },
  ]);
};
