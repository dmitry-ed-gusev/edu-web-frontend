const path = require('path');

module.exports = {
    entry: [
        './src/js/index.js' // source js files (path in the current folder)
    ],
    output: {
        filename: './js/bundle.js' // compiled / assembled js bundle (path in the folder <dist>)
    },
    devtool: "source-map", // development tools - source mapping for debug
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src/js'), // absolute path
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    plugins: [
    ]
};
