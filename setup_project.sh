#!/usr/bin/env bash
###############################################################################
#
#   Init script for JS / FrontEnd project (simple)
#
#   Created:  Dmitrii Gusev, 01.01.2021
#   Modified: Dmitrii Gusev, 02.01.2021
#
###############################################################################

# -- create directories structure
BASE_SITE_DIR=$1

if [[ -z ${BASE_SITE_DIR} ]]; then
    echo "Provided empty project name! ${BASE_SITE_DIR}"
    exit -1
fi

echo "Creating project module: ${BASE_SITE_DIR}"

mkdir -p ${BASE_SITE_DIR}/dist
mkdir -p ${BASE_SITE_DIR}/src/{favicon,html,fonts,img,js,scss,uploads}
mkdir -p ${BASE_SITE_DIR}/src/html/{includes,views}
#mkdir -p "${BASE_SITE_DIR}/src/fonts"
#mkdir -p "${BASE_SITE_DIR}/src/html/includes"
#mkdir -p "${BASE_SITE_DIR}/src/html/views"
#mkdir -p "${BASE_SITE_DIR}/src/img"
#mkdir -p "${BASE_SITE_DIR}/src/js"
#mkdir -p "${BASE_SITE_DIR}/src/scss"
#mkdir -p "${BASE_SITE_DIR}/src/uploads"

# -- init node project and generates package.json file
cd ${BASE_SITE_DIR}
npm init

# -- install webpack (the latest) + CLI + dev server and save it as development dependency
npm install webpack webpack-cli webpack-dev-server clean-webpack-plugin del-cli --save-dev

# -- install additional webpack modules
#npm install copy-webpack-plugin html-webpack-plugin --save-dev

# -- install babel - JavaScript compiler - development dependency
npm install babel-core babel-preset-env babel-loader --save-dev

# -- install jquery (required by most of sites) - project dependency
npm install jquery --save

# -- CSS tools
#npm install node-sass sass-loader css-loader mini-css-extract-plugin --save-dev

# -- install bootstrap and required dependencies
#npm install bootstrap jquery popper.js --save

# -- go back to the root directory
cd ..
