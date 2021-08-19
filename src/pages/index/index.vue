<template>
  <view class="index">
    <button
      type="primary"
      data-router="Lottery"
      @tap="handleRoute"
    >
      抽奖
    </button>
    <button
      type="primary"
      data-router="Share"
      @tap="handleRoute"
    >
      分享
    </button>
    <button
      type="primary"
      data-router="SignIn"
      @tap="handleRoute"
    >
      签到
    </button>
    <component
      :is="currentTabComponent"
      v-if="currentTabComponent"
    />
  </view>
</template>

<script>
import "./index.scss";
import Lottery from "../lottery/index";
import Share from "../share/index";
import SignIn from '../signIn/index';


export default {
    components: {
        Lottery: Lottery,
        Share:Share,
        SignIn:SignIn
    },
    data() {
        return {
            msg: "",
            currentTabComponent:''
        };
    },
    created() {
        console.log("sjkghdjghs");
    },
    methods:{
        handleRoute(e){
            console.log(e.target.dataset.router)
            this.currentTabComponent = e.target.dataset.router
        }
    }
};
</script>
