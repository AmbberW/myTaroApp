<template>
  <view class="index">
    <text>{{ msg }}</text>
    <lottery />
  </view>
</template>

<script>
import "./index.scss";
import Lottery from "../lottery/index";

export default {
  components: {
    Lottery: Lottery,
  },
  data() {
    return {
      msg: "Hello world!cccccc",
    };
  },
  created() {
    console.log("sjkghdjghs");
  },
};
</script>
