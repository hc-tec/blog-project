module.exports = {
  
  publicPath: process.env.NODE_ENV === 'production'
    ? '/production-sub-path/'
    : '/',

  /* 输出文件目录：在npm run build时，生成文件的目录名称 */
  outputDir: 'dist',

  /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
  assetsDir: 'assets',

  /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
  filenameHashing: true,

  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    /*
    mental_about: {
      entry: 'src/mental_about/index.js',
      template: 'public/mental_about.html',
      filename: 'mental_about.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    mental_equip: {
      entry: 'src/mental_equip/index.js',
      template: 'public/mental_equip.html',
      filename: 'mental_equip.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
     */
  },
  //ESLint
  lintOnSave: true,

  devServer: {
    /* 自动打开浏览器 */
    open: true,
    /* 设置为0.0.0.0则所有的地址均能访问 */
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: false
  },

  configureWebpack: {
    resolve: {
      alias: {
        // 启用 runtime 模式
        vue$: "vue/dist/vue.esm.js",
      }
    }
  },
}
