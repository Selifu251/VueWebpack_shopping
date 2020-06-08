const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname,'dist')
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.(scss|sass)/,
                use: [{
                    loader: 'style-loader'
                },{
                    loader: 'css-loader'
                },{
                    loader: 'postcss-loader',
                    options: {
                        plugin: function(){
                            return [
                                require('precss'),
                                require('autoprefixer')
                            ];
                        }
                    }
                },{
                    loader: 'sass-loader'
                }]
            }
        ]
    },

}