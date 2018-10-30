// Babel
import babel from "rollup-plugin-babel";
// 用于告诉rollup如何查找外部模块(node_modules) 如npm
import resolve from "rollup-plugin-node-resolve";
// 启动浏览器服务
import serve from "rollup-plugin-serve";
// 页面自动刷新功能
import livereload from 'rollup-plugin-livereload'
// 代码压缩
import { uglify } from "rollup-plugin-uglify";
// 代码替换, 用于区别生产/开发环境
import replace from 'rollup-plugin-replace';
// 用于将commonJs转为可用内容
import commonjs from "rollup-plugin-commonjs";
// 用于css合并进页面
import postcss from 'rollup-plugin-postcss';
// 用于支持新的css属性
import cssnext from 'postcss-cssnext';
// 用于压缩css
import cssnano from 'cssnano';

export default {
    input: "src/main.js",
    output: {
        file: './dist/bundle.js',
        format: 'iife',
        name: 'test'
    },
    plugins:  [ 
        resolve({
            jsnext: true,   // 该属性是指定将Node包转换为ES2015模块
            // main 和 browser 属性将使插件决定将那些文件应用到bundle中
            main: true,
            browser: true,
        }),
        commonjs(),
        babel({
            exclude: 'node_modules/**'
        }),
        replace({
           ENV: JSON.stringify(process.env.NODE_ENV || "development") 
        }),
        postcss({
            extensions: ['.css'],
            plugins: [
                cssnext({
                    warnForDuplicates: false
                }), // 向前兼容css
                cssnano(), // css代码压缩
            ]
        }),
        uglify(),   // js压缩代码
        serve({
            open: true, //是否打开浏览器
            contentBase: './', // 入口html文件的位置
            historyApiFallback: true, // Set to true to return index.html instead of 404
            host: 'localhost',
            port: 10001,
            //set headers
            headers: {
                'Access-Control-Allow-Origin': '*',
                foo: 'bar'
            }
        }),
        livereload(),   // 页面自动刷新
    ]
}

