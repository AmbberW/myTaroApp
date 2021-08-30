var lotteryConfig = {
    data:{
        title:'标题',
        subTitle:'--副标题--',
        fixedInterval: 1, //0代表抽奖次数不受每天控制，1代表每天，7代表每周
        num: 3, //每天的抽奖次数
        total: 20, //全部的抽奖机会
        duration: ["2021-8-1", "2021-9-30"], //活动时间
    },
    getPrizeList:{
        func:null,
        key:''
    }
}
var shareConfig = {
    data:{
        titel: "分享组件标题",
        subTitle: "--副标题--",
        shareUrl: "https://baidu.com",
    },
    getShareList:{
        func:null,
        key:''
    }

}
var signConfig = {
    data:{
        title:'签到标题',
        subTitle:'--连续签到满7天可获现金奖励--',
        totalDay:12,
        splitNum:5,
    },
    getResultfulDay:{
        func:null,
        key:'',
        defaultVal:3
    },
    handleSignTap:{
        func:null,
        key:''
    }
}
var currentTabComponent = '';
const signInit = function(option){
    currentTabComponent='SignIn';
    signConfig = Object.assign(option,signConfig);
}
const lotteryInit = function(option){
    currentTabComponent='Lottery';
    lotteryConfig = Object.assign(option,lotteryConfig);
}
const shareInit = function(option){
    currentTabComponent='Share';
    shareConfig = Object.assign(option,shareConfig)
}
export {
    currentTabComponent,
    lotteryConfig,
    shareConfig,
    signConfig,
    signInit,
    lotteryInit,
    shareInit
}