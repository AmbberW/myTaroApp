<template>
  <view class="index">
    <!-- <button
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
    </button> -->
    
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
import * as Config from '../../options/index'
// import MapMini from '../map/index.vue'


export default {
    components: {
        Lottery: Lottery,
        Share:Share,
        SignIn:SignIn,
        // MapMini:MapMini,
    },
    data() {
        return {
            msg: "",
            // currentTabComponent:'',
            Config,
        };
    },
    computed:{
      currentTabComponent(){
        console.log(this.Config.currentTabComponent)
        return this.Config.currentTabComponent
      }
    },
    // created() {
    //     console.log("sjkghdjghs");
    //     this.Config.signInit({a:1})
    //     console.log(this.Config.currentTabComponent)
    // },
    methods:{
        handleRoute(e){
            console.log(e.target.dataset.router)
            this.currentTabComponent = e.target.dataset.router
        }
    }
};
</script>
