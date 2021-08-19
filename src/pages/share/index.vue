<template>
  <view :class="style.share">
    <view :class="style.shareContent">
      <view :class="style.shareTitle">
        {{ titel }}
      </view>
      <view :class="style.shareSubTitle">
        {{ subTitle }}
      </view>
      <view :class="style.bannerImg" />
      <view :class="style.shareList">
        <view
          v-for="(item, index) in list"
          :key="index"
          :class="style.listItem"
        >
          <view :class="style.itemIcon">
            <image
              :class="style.iconImage"
              :src="item.picture"
              mode="scaleToFill"
            />
          </view>
          <view :class="style.itemcontent">
            <view :class="style.name">
              {{ item.name }}
            </view>
            <view :class="style.subName">
              {{ item.subName }}
            </view>
            <view :class="style.label">
              <view
                v-for="(i, labelIndex) in item.label"
                :key="labelIndex"
                :class="style.labelItem"
              >
                {{ i }}
              </view>
            </view>
            <view :class="style.text">
              {{ item.text }}
            </view>
          </view>
          <button
            v-if="btnType === 'share'"
            open-type="share"
            :class="style.itemShare"
            size="mini"
            type="warn"
            :plain="true"
          >
            <view :class="style.itemShare">
              {{ item.btnText }}
            </view>
          </button>
          <view
            v-if="btnType !== 'share'"
            :id="`share_${item.id}`"
            :data-index="index"
            :data-clipboard-text="`${shareUrl}?id=${item.id}`"
            :class="style.itemShare"
            @tap="handleShare"
          >
            {{ item.btnText }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import Share from "./share.json";
import style from "./index.module.css";
import Clipboard from "clipboard";
import Taro from "@tarojs/taro";
export default {
    name: "Share",
    props: {
        shareAllow: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            style,
            titel: "分享组件标题",
            subTitle: "--副标题--",
            list: [],
            // btnType:'',
            shareUrl: "https://baidu.com",
            clipboard: "",
        };
    },
    computed: {
        btnType() {
            return process.env.TARO_ENV !== "h5" && this.shareAllow
                ? "share"
                : "";
        },
    },
    created() {
        this.list = Share.list.concat(Share.list);
        // this.btnType = process.env.TARO_ENV==='h5'&&this.shareAllow?'':'share';
    },
    methods: {
        handleShare(event) {
            const item = this.list[event.target.dataset.index];
            if (this.shareAllow) {
                if (process.env.TARO_ENV === "h5") {
                    this.clipboard = new Clipboard(`#share_${item.id}`);
                    this.clipboard.on("success", (e) => {
                        Taro.showToast({
                            title: "分享链接已复制到剪贴板！",
                            icon: "success",
                            duration: 2000,
                        });
                    });
                    this.clipboard.on("error", (e) => {
                        Taro.showToast({
                            title: "复制分享链接失败",
                            icon: "none",
                            duration: 2000,
                        });
                    });
                }
            } else {
                Taro.showToast({
                    title: "请先检查是否符合分享条件",
                    icon: "none",
                    duration: 2000,
                });
            }
        },
    },
    onShareAppMessage(from, target, webViewUrl) {
        console.log("from", from);
    },
};
</script>
