module.exports = {
    entry: './src/index.js',
    output: {
        path: '/build',
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                //处理ES6语法
                test: /\.js$/,
                //loader babel
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                //处理.vue文件
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        alias: { 'vue': 'vue/dist/vue.js' }
    }
};