# pretty
物业管理系统前端

---

## 项目访问地址
- 目前项目地址 http://112.74.57.49/
- 5月中旬以后可访问 http://www.microcn.top/

## 基本命令
- 项目本地构建: npm install
- 项目本地启动: npm run dev

- 项目打包: npm run build
  - 打包生成文件:  一个index_prod.html 文件, 一个 dist 文件夹
  - 上线需知: 把打包生成的文件放在本项目服务器的 /usr/local/nginx/html 目录下

## 技术概览
- 基础框架: Vue + Webpack + iView
- Http请求: Axios
- 本地服务器: Node
- 线上服务器: Nginx

## 项目开发须知
> 整个项目分为三块: 综合管理模块/综合业务模块/资费管理模块
- 页面分别对应
   - 综合管理: src/views/manage/*
   - 综合业务: src/views/business/*
   - 资费管理: src/views/tariff/*
- 其他页面
    - 工具组件: src/views/components/*
    - 页面模板: src/views/template/*
        - 管理平台有个基础模板,下边给了三个嵌套后的模板
        - simple-view.vue 空模板,也就是基础模板
        - paging-view.vue 分页模板,只有查看功能
        - paging-manage.vue 分页模板,里边包含表格数据修改功能

## 项目部署生产配置
- 配置Nginx
    - 修改配置(nginx.conf)
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

- 修改 iview-cli 创建的项目配置
    - 修改webpack.base.config.js文件
        > (增加: publicPath: './')
    ```
    {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            use: ['css-loader?minimize', 'autoprefixer-loader'],
            fallback: 'style-loader',
            publicPath: './'
        })
    },
    ```
    - 修改webpack.prod.config.js文件
        > (修改: publicPath: './dist/')
    ```
    output: {
        publicPath: './dist/',
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].chunk.js'
    },
    ```
