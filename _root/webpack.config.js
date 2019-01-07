const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CircularDependencyPlugin = require('circular-dependency-plugin')
const PrettierPlugin = require("prettier-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//Paths variables definition
const sourcePath = path.join(__dirname, 'src');
const webSourcePath = path.join(__dirname, 'src', 'web');
const webTemplatePath = path.join(__dirname, '_web', "templates");
const assetPath = path.join(webTemplatePath, "assets");

const devMode = process.env.NODE_ENV !== 'production';

const PORT = process.env.PORT || 8080;
const DIST_DIR = path.resolve(__dirname, 'web', 'dist');

const generalConfig = {
  entry: {
    index: ['@babel/polyfill', 'whatwg-fetch', path.resolve(webSourcePath, 'public-path.js'), path.resolve(webSourcePath, 'index.js')]
  },
  output: {
    path: DIST_DIR,
    filename: '[name].[chunkhash].bundle.js',
    chunkFilename: '[name].[chunkhash].bundle.js',
    sourceMapFilename: '[name].[chunkhash].bundle.map',
    publicPath: "/"
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'], 
    alias: {
      src: path.resolve(__dirname, 'src/'),
      src_web: path.resolve(__dirname, 'src/web/'),
    },
    modules: [
      sourcePath, 
      path.resolve(__dirname, 'node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: /node_modules\/(query-string|strict-uri-encode|tinode-sdk|AsyncStorage)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(md|yml)$/,
        use: {
          loader: 'yml-loader'
        },
        exclude: [
          path.resolve(__dirname, "node_modules"),
        ]
      },
      {
        test: /\.(css|scss)$/,
        exclude: [
          path.resolve(__dirname, "node_modules"),
        ],
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              sourceMap: true,
              minimize: true
            }  
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('postcss-cssnext')({ browsers: ['last 50 versions'] }),
                require('cssnano')({preset: 'default'})
              ]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      /*
      { //For node_modules that are not prepared for css-loader modules localIdentName
        test: /\.(css|scss)$/,
        include: [
          /node_modules\/react-circular-progressbar\/dist/
        ],
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: false,
              minimize: false
            }  
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      */
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        include: assetPath,
        exclude: [
          path.resolve(__dirname, "node_modules"),
          path.join(assetPath, "images", "raw"),
        ],
        use: {
            loader: 'url-loader',
            options: { 
                limit: 10000, // Convert images < ~10kb to base64 strings
                name: 'assets/images/[name].[ext]'
            },
        }
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        include: [
          
        ],
        use: {
            loader: 'url-loader',
            options: { 
                limit: 10000, // Convert images < ~10kb to base64 strings
            },
        }
      },
      {
        test: /\.(mp3|ogg|wav)$/,
        use: {
            loader: 'file-loader',
            options: { 
                limit: 10000, // Convert images < ~10kb to base64 strings
                name: 'assets/audio/[name].[ext]'
            },
        },
        include: assetPath
      },
      {
        test: /\.html$/,
        exclude: [
          path.resolve(__dirname, "node_modules"),
        ],
        use: [{
            loader: "html-loader",
            options: {
              minimize: true,
              attrs: [':img-src']
            }
        }]
      }
    ],
  },
  
  context: __dirname, // string (absolute path!),

  plugins: [
    
    new CleanWebpackPlugin([DIST_DIR]),

    //new ExtractTextPlugin(path.resolve(__dirname, 'public/styles/app.css')),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    }),

    new HtmlWebpackPlugin({   
        title: 'TITLE_CHANGE_ME_AT_WEBPACK_CONFIG',
        filename: 'index.html',
        template: path.join(webTemplatePath, 'index.html')
    }),

    new webpack.HashedModuleIdsPlugin(),

    new CopyWebpackPlugin([
      { from: assetPath, to: 'assets' }
    ]),

    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /node_modules/,
      // add errors to webpack instead of warnings
      failOnError: false,
      // allow import cycles that include an asyncronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      allowAsyncCycles: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
    })

  ]
};

const devConfig = {
  mode: 'development',
  devtool: '#source-map', //eval
  devServer: {
    //contentBase: [path.join(__dirname, 'public')], // boolean | string | array, static file location
    port: PORT,
    https: true, // true for self-signed, object for cert authority
    compress: true, // enable gzip compression
    host: "0.0.0.0",
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: false, // hot module replacement. Depends on HotModuleReplacementPlugin
    https: false, // true for self-signed, object for cert authority
    noInfo: false, // only errors & warns on hot reload
    // ...
  }
};


const prodConfig = {
  mode: 'production',

  optimization: {
    minimize: true,
    namedModules: true,
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
          commons: {
            name: "commons",
            chunks: "initial",
            minChunks: 2,
            priority: 0
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
      }
    },
    minimizer: [
      new UglifyJsWebpackPlugin({
        cache: false,
        parallel: true, // uses all cores available on given machine
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
      })
   ],
  },

};


//Building Config

let config = undefined;
const global_vars = {}
/*const global_vars = {
  'BUILD_TYPE': JSON.stringify(process.env.BUILD_TYPE),
  'BUILD_TYPE_OPTIONS': {
    TV: JSON.stringify('tv')
  },
};
*/

if (devMode) {

  config = {
    ...generalConfig,
    ...devConfig
  };
  
  config.plugins.push(
    new webpack.DefinePlugin({
      ...global_vars,
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__DEV__': 1,
      '__PROD__': 0
    })
  );

  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  );

  //config.plugins.push(new BundleAnalyzerPlugin());
  //config.devtool = "cheap-module-eval-source-map"
  config.devtool = "inline-source-map"

}else {  
  config = {
    ...generalConfig,
    ...prodConfig
  }

  config.plugins.push(
    new webpack.DefinePlugin({
      ...global_vars,
      'process.env.NODE_ENV': JSON.stringify('production'),
      '__DEV__': 0,
      '__PROD__': 1
    })
  );

  config.plugins.push(
    new PrettierPlugin({
      printWidth: 100,               // Specify the length of line that the printer will wrap on.
      tabWidth: 2,                  // Specify the number of spaces per indentation-level.
      useTabs: false,               // Indent lines with tabs instead of spaces.
      semi: true,                   // Print semicolons at the ends of statements.
      encoding: 'utf-8',            // Which encoding scheme to use on files
    })
  );
  
  config.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
  config.plugins.push(new webpack.HashedModuleIdsPlugin());  
  //config.plugins.push(new BundleAnalyzerPlugin());

  config.devtool = "hidden-source-map"
}

module.exports = config;
