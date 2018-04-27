# pretty
物业管理系统前端

## 项目访问地址
- http://112.74.57.49/
- 5月以后可访问 http://www.microcn.top/

## 基本命令
- 项目本地构建: npm install
- 项目本地启动: npm run dev

- 项目打包: npm run build
- 项目打包备注: 打包会生成一个 index_prod.html 文件, 一个 dist 文件夹
- 项目上线: 把index_prod.html、和dist文件一起放在服务器的 /usr/local/nginx/html 文件夹下即可
- 项目访问路径: 112.74.57.49 或者 microcn.top

## 技术概览
- 基础框架 Vue + Webpack + iView
- Http请求 axios

## 项目部署生产配置
- A.修改并增加Nginx配置 (nginx.conf)
```
    location / {
        root  html;
        index  index.html index.htm index_prod.html;
    }

    location ^~ /property/ {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass http://localhost:8080;
    }
```
- B.修改 iview-cli 创建的项目配置
```
1.webpack.base.config.js (增加: publicPath: './')
    {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            use: ['css-loader?minimize', 'autoprefixer-loader'],
            fallback: 'style-loader',
            publicPath: './'
        })
    },
2.webpack.prod.config.js (修改: publicPath: './dist/')
    output: {
        publicPath: './dist/',
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].chunk.js'
    },
```