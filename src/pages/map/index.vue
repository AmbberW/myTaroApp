<template>
  <view>
    <text>map</text>
    <map
      id="map"
      style="width: 100%; height: 600px;"
      longitude="113.324520"
      latitude="23.099994"
      scale="14"
      :markers="mapMarkers"
      :polyline="polyline"
      :show-location="true"
      @regionchange="regionchange"
      @markertap="markertap"
    >
      <cover-view slot="callout">
        <cover-view
          v-for="item in mapMarkers.slice(1)"
          :key="item.id"
          :marker-id="item"
          :class="style.customCallout"
        >
          北包包多少遍
        </cover-view>
      </cover-view>
    </map>
  </view>
</template>

<script>
import style from './index.module.css'
import Taro from "@tarojs/taro";
// import { CoverView, Map, View } from '@tarojs/components'
import { CoverView, Map, View } from '@tarojs/components'

const normalCallout = {
  id: 1,
  latitude: 23.098994,
  longitude: 113.32252,
  callout: {
    content: '文本内容',
    color: '#ff0000',
    fontSize: 14,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#000000',
    bgColor: '#fff',
    padding: 5,
    display: 'ALWAYS',
    textAlign: 'center',
  }
}

const customCallout1 = {
  id: 2,
  latitude: 23.097994,
  longitude: 113.32352,
  customCallout: {
    anchorY: 0,
    anchorX: 0,
    display: 'ALWAYS',
  },
}

const customCallout2 = {
  id: 3,
  latitude: 23.096994,
  longitude: 113.32452,
  customCallout: {
    anchorY: 0,
    anchorX: 0,
    display: 'ALWAYS',
  },
}

const customCallout3 = {
  id: 4,
  latitude: 23.095994,
  longitude: 113.32552,
  customCallout: {
    anchorY: 0,
    anchorX: 0,
    display: 'ALWAYS',
  },
}

const customMarkers = [
  customCallout1,
  customCallout2,
  customCallout3,
]

const mapMarkers = [
  normalCallout,
  ...customMarkers
]

export default {
    components:{
        // map:Map
    },
  data() {
    return {
        style,
      mapMarkers:mapMarkers,
      markers: [{
        iconPath: "https://avatars2.githubusercontent.com/u/1782542?s=460&u=d20514a52100ed1f82282bcfca6f49052793c889&v=4",
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 50,
        height: 50
      }],
      polyline: [{
        points: [{
          longitude: 113.3245211,
          latitude: 23.10229
        }, {
          longitude: 113.324520,
          latitude: 23.21229
        }],
        color:"#FF0000DD",
        width: 2,
        dottedLine: true
      }]
    }
  },
  methods: {
    regionchange(e) {
      console.log(e.type)
    },
    markertap(e) {
      console.log("markertap:", e.detail.markerId)
      let latitude = this.mapMarkers[e.detail.markerId-1].latitude;
      let longitude = this.mapMarkers[e.detail.markerId-1].longitude;
      Taro.openLocation({
     latitude,
     longitude,
     scale: 18
   })
    }
  }
}
</script>
