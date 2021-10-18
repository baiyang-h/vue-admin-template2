const path = require('path');
module.exports = {

    // publicPath: 'BASE_URL - 会和 vue.config.js 中的 publicPath 选项相符，即你的应用会部署到的基础路径',

    lintOnSave: false,

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
                libs: path.resolve(__dirname, './src/libs'),
                views: path.resolve(__dirname, './src/views'),
                config: path.resolve(__dirname, './src/config'),
            },
        },
    },

    devServer: {
        before: require('./mock/mock-server'),

        proxy: {
            '/food': {
                target: 'http://10.100.49.141:4000',
                ws: true,
                changeOrigin: true,
            },
        }
    }
}
