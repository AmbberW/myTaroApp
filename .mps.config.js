module.exports = {
    mps: {
        business: {// 业务的路由，  
            pages: ['/pages/index/index'],
        },
        publish: {
            weapp: {
                "mpsHome": "/dist/weapp",// 要发布的目录  
                "name": "@mps/weapp-taro-feature",//包名  
                "version": "0.0.1"
            },
        }
    },
}