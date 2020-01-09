const path = require('path');
const nodeExcternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackconfig = {
    target: "node",
    mode: "development",
    entry: {
        server: path.join(__dirname, 'src/index.js')
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "./bundle")
    },
    devtool:'eval-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: { loader: "babel-loader" },
                exclude: [path.join(__dirname, '/node_modules')]
            },
        ]
    },
    externals: [nodeExcternals()],
    plugins: [
        new CleanWebpackPlugin()
    ],
    node: {
        console: true,
        global: true,
        process: true,
        Buffer: true,
        __filename: true,
        __dirname: true,
        setTmmediate: true,
        path: true
    }
}

module.exports = webpackconfig;

// const path = require('path');
// module.exports = {
//     entry: {
//         server: path.join(__dirname, '1.js')
//     },
//     output: {
//         path: path.join(__dirname, "./dist")
//     }
// }