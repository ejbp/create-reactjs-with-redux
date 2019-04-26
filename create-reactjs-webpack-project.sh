#!/bin/bash

#functions
function printInfo {
   echo -e "\033[1;92m$1\033[0m$2"
}

function printError {
   echo -e "\033[1;31m$1\033[0m$2"
}

#######Script Start

#validate if we have a project path
if [ "$#" -ne 1 ]; then
    printError "Please add project path argument."
fi

#Global vars definition
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
DEST_DIR=$1

if [ -d "$DEST_DIR" ]; then
  printError "Output directory $DEST_DIR already exists. " "Do you want to proceed [y/N]?"
  read proceed 
  proceed=`echo $proceed| tr '[A-Z]' '[a-z]'`

  if [ "$proceed" != "y" ]; then
    printError "Script was canceled by user."
    exit 1
  fi

fi


printInfo "Creating dir " "$DEST_DIR..."
#create main dirs
mkdir -p $DEST_DIR && cd $_
mkdir -p src

#init project
printInfo "Initing " "react project..."
npm init -y

printInfo "Adding webpack scripts to package.json..."
sed -i -e '/"scripts": {/a\' -e '    "build-dev": "cross-env NODE_ENV=development webpack --progress --colors",' package.json
sed -i -e '/"scripts": {/a\' -e '    "build-prod": "cross-env NODE_ENV=production webpack --progress --colors",' package.json
sed -i -e '/"scripts": {/a\' -e '    "build": "yarn build-prod",' package.json
sed -i -e '/"scripts": {/a\' -e '    "start": "webpack-dev-server --progress --colors --config webpack.config.js",' package.json

#install webpack packages
printInfo "Installing " "webpack modules..."
npm i --save-dev \
  webpack \
  webpack-cli \
  webpack-dev-server \
  html-webpack-plugin \
  clean-webpack-plugin \
  hard-source-webpack-plugin \
  terser-webpack-plugin \
  copy-webpack-plugin \
  webpack-bundle-analyzer \
  circular-dependency-plugin \
  prettier-webpack-plugin \
  prettier \
  autoprefixer \
  optimize-css-assets-webpack-plugin \
  mini-css-extract-plugin \
  html-loader \
  babel-loader \
  css-loader \
  postcss-loader \
  yml-loader \
  sass-loader \
  style-loader \
  svg-inline-loader \
  url-loader \
  file-loader \
  cross-env
  
#installing babel dependencies
printInfo "Installing " "babel modules..."
npm i --save-dev \
  @babel/core \
  @babel/preset-env \
  @babel/preset-react \
  @babel/plugin-transform-react-jsx \
  @babel/plugin-syntax-dynamic-import \
  @babel/plugin-transform-regenerator \
  @babel/plugin-transform-modules-commonjs \
  @babel/plugin-syntax-import-meta \
  @babel/plugin-transform-runtime \
  @babel/plugin-proposal-class-properties \
  @babel/plugin-proposal-json-strings \
  babel-plugin-dynamic-import-webpack \
  browserslist \
  babel-eslint \
  @babel/polyfill

##cat <<EOT > .babelrc
##{
##  "presets": ["@babel/preset-env", "@babel/preset-react"]
##}
##EOT

#installing react dependencies
printInfo "Installing " "react modules..."

npm i --save-dev \
  prop-types 

npm i --save \
  react \
  react-dom \
  whatwg-fetch \
  classnames \
  @material-ui/core \
  @material-ui/icons \
  react-router \
  rxjs \
  redux \
  redux-actions \
  connected-react-router \
  react-redux \
  redux-persist \
  redux-logger \
  redux-promise-middleware \
  redux-thunk \
  redux-observable \
  lodash.get \
  reselect 

#Copy Structure
cp -a $SCRIPT_DIR/_root/. $DEST_DIR/

printInfo "\nDone.\n" "1. Go to $DEST_DIR\n2. run 'yarn start'\n3. Open your browser at http://localhost:8080"

