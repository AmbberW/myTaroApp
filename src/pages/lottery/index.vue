<template>
  <view :class="style.container">
    <view :class="style.content">
      <view :class="style.title">
        抽奖标题
      </view>
      <view :class="style.subtitle">
        --抽奖副标题--
      </view>
      <view :class="style.subtitle">
        {{ rules }}
      </view>
      <view :class="style.box">
        <view
          v-for="item in itemList.slice(0, 4)"
          :key="item.id"
          :class="style.item"
        >
          <view
            :class="[
              style.itemborder,
              animationID == item.id ? style.borderanimation : '',
            ]"
          >
            <view :class="style.itemcontent">
              <view
                :style="{
                  backgroundImage: `url(${item.image})`,
                  width: '100%',
                  height: '100%',
                  backgroundSize: '100% 100%',
                }"
              />
            </view>
          </view>
        </view>
        <view
          :class="style.item"
          @tap="handleClick"
        >
          <view :class="style.itemborder">
            <view :class="style.itemcontent">
              <view
                :class="[
                  style.contentbtn,
                  disable ? style.btndisable : '',
                ]"
              >
                <view :class="style.disabletext">
                  {{
                    disable ? "今日机会用完了" : "开始抽奖"
                  }}
                </view>
              </view>
            </view>
          </view>
        </view>
        <view
          v-for="item in itemList.slice(4)"
          :key="item.id"
          :class="style.item"
        >
          <view
            :class="[
              style.itemborder,
              animationID == item.id ? style.borderanimation : '',
            ]"
          >
            <view :class="style.itemcontent">
              <view
                :style="{
                  backgroundImage: `url(${item.image})`,
                  width: '100%',
                  height: '100%',
                  backgroundSize: '100% 100%',
                }"
              />
            </view>
          </view>
        </view>
        <view
          v-if="showPrize"
          :class="style.result"
          @tap="handlePrizeClick"
        >
          <view :class="style.resulttext">
            恭喜获得奖品
          </view>
          <view
            :style="{ backgroundImage: `url(${prize.image})` }"
            :class="[style.resultimage]"
          />
          <view :class="style.resulttext">
            {{ prize.text }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import style from "./index.module.css";
import lotteryJson from "./lottery.json";
import Taro from "@tarojs/taro";
import { checkAuthority } from "../../utils/checkAuthority.js";
export default {
    name: "Lottery",
    data() {
        return {
            style: style,
            itemList: [],
            itemIDList: [],
            animationID: "",
            showPrize: false,
            animationExcute: false,
            prize: "",
            fixedInterval: 1, //0代表抽奖次数不受每天控制，1代表每天，7代表每周
            num: 3, //每天的抽奖次数
            total: 20, //全部的抽奖机会
            duration: ["2021-8-1", "2021-8-30"], //活动时间
            disable: true,
        };
    },
    computed: {
        rules() {
            let s = `抽奖活动时间：${this.duration[0]}~${this.duration[1]}。`;
            if (this.fixedInterval) {
                s += `每${this.fixedInterval}天有${this.num}次抽奖机会，累计共有${this.total}次抽奖机会。`;
            } else {
                s += `共有${this.total}次抽奖机会。`;
            }
            return s;
        },
    },
    created() {
        this.itemList = lotteryJson.itemList;
        this.dealAnimationList();
        this.disable = !checkAuthority.call(this);
    },
    methods: {
        //奖品数据处理
        dealAnimationList() {
            let idList = lotteryJson.itemList.map((item) => {
                return { id: item.id, probability: item.probability };
            });
            let final = idList.splice(3, 1);
            this.itemIDList = idList
                .slice(0, 4)
                .concat(idList.slice(4).reverse(), final);
        },
        handleClick(e) {
            if (this.disable || this.animationExcute) return;
            const finalIndex = parseInt(this.controlRandom() / 0.125);
            this.prize = this.itemList.filter((item) => {
                return item.id === this.itemIDList[finalIndex].id;
            })[0];
            this.saveLottery();
            this.animationExcute = true;
            this.callAnimation(finalIndex);
        },
        //存储相关抽奖记录
        saveLottery() {
            let day = new Date().toLocaleDateString();
            let num = Taro.getStorageSync(day) ? Taro.getStorageSync(day) : 0;
            Taro.setStorageSync(day, ++num);
            let count = Taro.getStorageSync("total")
                ? Taro.getStorageSync("total")
                : 0;
            Taro.setStorageSync("total", ++count);
        },
        //动画效果
        callAnimation(finalIndex) {
            let arr = this.itemIDList.concat(
                this.itemIDList,
                this.itemIDList.slice(0, finalIndex + 1)
            );
            this.aninamtionTimeFunc(arr, 50).then(
                (resolve) => {
                    setTimeout(() => {
                        this.showPrize = true;
                        this.animationExcute = false;
                        this.disable = !checkAuthority.call(this);
                    }, 500);
                },
                (err) => {}
            );
        },
        //链式调用，九宫格依次增加闪烁效果
        aninamtionTimeFunc(arr, interval) {
            return arr.reduce((p, item, index) => {
                return p.then(() => {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            this.animationID = item.id;
                            resolve();
                        }, interval + index * 30);
                    });
                });
            }, Promise.resolve());
        },
        //根据奖品概率控制random返回值
        controlRandom() {
            let p = Math.random();
            let n = Math.random() / 8;
            let finalRandom = 0;
            let sum = 0;
            for (let index = 0; index < this.itemIDList.length; index++) {
                sum = this.itemIDList
                    .slice(0, index + 1)
                    .reduce((sum, item) => {
                        return sum + item.probability;
                    }, 0);
                if (p < sum) {
                    finalRandom = index * 0.125 + n;
                    break;
                }
            }
            return finalRandom;
        },
        //点击奖品
        handlePrizeClick() {
            this.prize = null;
            this.showPrize = false;
            this.animationID = "";
        },
    },
};
</script>