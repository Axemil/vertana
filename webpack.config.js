const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

// 1. import default from the plugin module
const createStyledComponentsTransformer = require('typescript-plugin-styled-components')
  .default;
// 2. create a transformer;
// the factory additionally accepts an options object which described below
const styledComponentsTransformer = createStyledComponentsTransformer();

module.exports = (env, { mode }) => {
  const server = process.env.NODE_ENV;
  const bundle = process.env.APP_BUNDLE;

  const appConstants = {
    VI_BLOG_BASE_URL: '"/blog"',
    VI_NEWS_BASE_URL: '"/news-and-events"',
    VI_BLOG_API_BASE_URL:
      (server === 'local' && "'http://virtanadev.local/'") ||
      (server === 'staging' && "'https://virtana.staging.wpengine.com/'") ||
      (server == 'production' && "'https://www.virtana.com/'"),

    VI_GRAPHQL_BASE_URL:
      (server === 'local' && "'http://virtanadev.local/graphql'") ||
      (server === 'staging' &&
        "'https://virtana.staging.wpengine.com/graphql'") ||
      (server == 'production' && "'https://www.virtana.com/graphql'"),

    VI_BLOG_DEBUG_MODE:
      (server === 'local' && 'true') ||
      (server === 'staging' && 'true') ||
      (server == 'production' && 'false'),

    // VI_TAG_MANAGER_ID: "'GTM-T5BNKXJ'",
    VI_TAG_MANAGER_ID: "'GTM-WLGXBBJ'",
  };

  const plugins = [
    new webpack.DefinePlugin(appConstants),
    // new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    // 	template: "./src/assets/html/index.html",
    // }),
  ];
  if (mode === 'production') {
    plugins.push(new BundleAnalyzerPlugin());
  }

  const config = {
    entry:
      (bundle === 'main' && './src/main.tsx') ||
      (bundle === 'post' && './src/post.tsx'),
    resolve: {
      alias: {
        components: resolve(__dirname, 'src/components'),
        containers: resolve(__dirname, 'src/containers'),
        app: resolve(__dirname, 'src/app'),
        common: resolve(__dirname, 'src/common'),
        assets: resolve(__dirname, 'src/assets'),
        pages: resolve(__dirname, 'src/pages'),
        util: resolve(__dirname, 'src/util'),
        hooks: resolve(__dirname, 'src/hooks'),
        queries: resolve(__dirname, 'src/queries'),
        gql: resolve(__dirname, 'src/gql'),
      },
      extensions: ['.ts', '.tsx', '.js'],
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    output: {
      filename:
        (bundle === 'main' && 'main.bundle.js') ||
        (bundle === 'post' && 'post.bundle.js'),
      path: resolve(__dirname, '../virtana-wpx-child-theme/js'),
      publicPath: '/',
    },
    devtool: mode === 'development' ? 'inline-source-map' : false,
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            plugins: ['babel-plugin-styled-components'],
          },
        },
        {
          test: /\.css$/,
          // exclude: /node_modules/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.woff$/,
          use: ['url-loader'],
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack', 'url-loader'],
        },
        {
          test: /\.jpg$/,
          use: ['file-loader'],
        },
      ],
    },
    plugins,
  };
  console.log(bundle, mode, config, plugins, appConstants);

  return config;
};
