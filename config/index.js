const config = {
  projectName: 'myTaroApp',
  date: '2021-3-22',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: ['@mps/mps-taro-plugin/dist/MpsRuntimeTaroPlugin',  
            ['@mps/mps-taro-plugin/dist/MpsBusinessTaroPlugin', {  
                commonChunks: ['app'],   
                addCommonStyle: true,  
              }
            ],
            ['@mps/mps-taro-plugin/dist/MpsExportTaroPlugin',{
              entry:{
                'options/index':['./options/index.js']
              }
            }]
  ],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'vue',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    webpackChain(chain,webpack){
      chain.merge({
        entry:{
          'options/index':['./options/index.js']
        }
      })
    }
    // webpackChain(chain,webpack){
    //   chain.optimization.splitChunks({
    //     cacheGroups: {
    //         default: false,
    //         vendors: {
    //             name: 'chunk-vendors',
    //             test(module) {
    //                 const resource = module.resource;
    //                 if (resource && resource.endsWith('.js')&&resource.includes('/options/')) {
    //                   console.log('resource-----',resource)
    //                     return true;
    //                 }
    //                 return false;
    //             },
    //             chunks: 'all',
    //             filename: '[name].bundle.js'
    //         }
    //     }
    //   });
    // }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    esnextModules: ['taro-ui'],
    // webpackChain(chain,webpack){
    //   chain.entry('index')
    //          .add('./src/options/index.js')
    //          .end()
    //       .output
    //         .filename('[name].bundle.js')
    // }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
