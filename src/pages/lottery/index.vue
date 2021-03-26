<template>
  <view :class="style.container">
    <view :class="style.content">
      <view :class="style.title">抽奖标题</view>
      <view :class="style.subtitle">--抽奖副标题--</view>
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
        <view :class="style.item" @tap="handleClick">
          <view :class="style.itemborder">
            <view :class="style.itemcontent">
              <view :class="style.contentbtn">
                <text>开始抽奖</text>
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
      </view>
    </view>
  </view>
</template>
<script>
import style from "./index.module.css";
import lotteryJson from "./lottery.json";
export default {
  name: "Lottery",
  data() {
    return {
      style: style,
      itemList: [],
      itemIDList: [],
      animationID: "",
    };
  },
  created() {
    this.itemList = lotteryJson.itemList;
    this.dealAnimationList();
  },
  mounted() {
    console.log(lotteryJson);
    console.log("aaaaa");
  },
  methods: {
    dealAnimationList() {
      let idList = lotteryJson.itemList.map((item) => {
        return item.id;
      });
      let final = idList.splice(3, 1);
      this.itemIDList = idList
        .slice(0, 4)
        .concat(idList.slice(4).reverse(), final);
      console.log(this.itemIDList);
    },
    handleClick(e) {
      this.aninamtionTimeFunc(this.itemIDList, 300);
    },
    aninamtionTimeFunc(arr, interval) {
      arr.reduce((p, item) => {
        return p.then(() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              this.animationID = item;
              resolve();
            }, interval);
          });
        });
      }, Promise.resolve());
    },
  },
};
</script>