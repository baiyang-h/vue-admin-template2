const path = require('path');
module.exports = {

    css: {
        loaderOptions: {
            scss: {
                //全局样式
                prependData: `@import "~@/styles/variables.scss";`
            }
        }
    },

    configureWebpack: {
        resolve: {
            alias: {
                styles: path.resolve(__dirname, './src/styles'),
                assets: path.resolve(__dirname, './src/assets'),
                api: path.resolve(__dirname, './src/api'),
                layout: path.resolve(__dirname, './src/layout'),
                store: path.resolve(__dirname, './src/store'),
                router: path.resolve(__dirname, './src/router'),
                utils: path.resolve(__dirname, './src/utils'),
                views: path.resolve(__dirname, './src/views'),
            },
        },
    },

    devServer: {
        before: require('./mock/mock-server')
    }
}