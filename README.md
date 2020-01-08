## nodejs服务
### 配置nodemon启动
```
安装依赖 
npm install @babel/core  @babel/node  @babel/preset-env  babel-loader  babel-node -S

package.json
"start": "nodemon --exec babel-node ./src/index.js"

.babelrc
{
    "presets":[
      [
        "@babel/preset-env",
        {
          "targets":{
            "node":"current"
          }
        }
      ]
    ]
  }
```

### koa2框架

### webpack配置
```
npm install webpack webpack-cli -D
npm install clean-webpack-plugin webpack-node-externals @babel/core @babel/node @babel/preset-env babel-loader cross-env -D
```