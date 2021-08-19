import Taro from '@tarojs/taro';
function checkTime(startTime, endTime) {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    const now = new Date().getTime();
    console.log(now >= start && now <= end)
    return now >= start && now <= end;
}
function checkInterval(startTime, interval) {
    if (interval === 0) return true;
    const dayms = 24 * 60 * 60 * 1000;
    const now = new Date().getTime();
    const start = new Date(startTime).getTime();
    let gap = parseInt((now - start) / dayms);
    console.log(gap % interval === 0)
    return gap % interval === 0
}
function checkCountAndNum(num, count) {
    let day = new Date().toLocaleDateString();
    let n = Taro.getStorageSync(day) || 0
    let c = Taro.getStorageSync('total') || 0;
    console.log(n < num && c < count)
    return n < num && c < count;
}
export function checkAuthority(duration = this.duration, interval = this.fixedInterval, num = this.num, count = this.total) {
    if (this == window || this == undefined) console.error("输入正确参数")
    return checkTime(duration[0], duration[1]) && checkInterval(duration[0], interval) && checkCountAndNum(num, count)
}