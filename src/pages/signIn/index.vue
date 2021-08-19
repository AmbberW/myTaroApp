<template>
  <view :class="style.signIn">
    <view :class="style.title">
      {{ title }}
    </view>
    <view :class="style.subTitle">
      {{ subTitle }}
    </view>
    <view :class="style.subscribe">
      您已经连续签到
    </view>
    <view :class="style.day">
      <view :class="style.dayNum">
        {{ resultfulDay }}
      </view>
      <view :class="style.dayUnit">
        天
      </view>
    </view>
    <view :class="style.container">
      <view
        v-for="(list,i) in totalList"
        :key="i"
        :class="style.travel"
      >
        <template v-for="(item,index) in totalList[i]">
          <view
            v-if="i*splitNum+index===0"
            :key="index"
            :class="style.travelFirst"
          >
            <view :class="item.centerClassname">
              +1
            </view>
            <view :class="style.itemtext">
              {{ i*splitNum+index+1 }}天
            </view>
          </view>
          <view
            v-else
            :key="index"
            :class="style.travelItem"
          >
            <view
              v-if="i%2===0&&index!==0"
              :class="item.lineClassname"
            />
            <view :class="item.centerClassname">
              +1
            </view>
            <view
              v-if="i%2===1&&index!==0"
              :class="item.lineClassname"
            />
            <view :class="style.itemtext">
              {{ i*splitNum+index+1 }}天
            </view>
          </view>
        </template>
      </view>
    </view>
    <view :class="style.signBtn">
      <view
        :class="style.btn"
        @tap="handleSignIn"
      >
        签到
      </view>
    </view>
  </view>
</template>
<script>
import style from './index.module.css'
export default {
    data(){
        return {
            style,
            title:'签到标题',
            subTitle:'--连续签到满7天可获现金奖励--',
            resultfulDay:6,
            totalDay:12,
            splitNum:5,
            totalList:[]
        }
    },
    created(){
        this.totalList = this.getClassName()
    },
    methods:{
        getClassName(){
            let i = Math.ceil(this.totalDay/this.splitNum);
            let tempArr = [];
            let temp = new Array(this.totalDay).fill({
                lineClassname:`${this.style.line}`,
                centerClassname:`${this.style.itemcenter}`
            },0,this.resultfulDay)
            .fill({
                lineClassname:`${this.style.line} ${this.style.unactive}`,
                centerClassname:`${this.style.itemcenter} ${this.style.unactive}`
            },this.resultfulDay,this.totalDay)
            temp = this.addConcatClass(temp)
            for(let j=0;j<i-1;j++){
                tempArr.push(temp.slice(j*this.splitNum,(j+1)*this.splitNum))
            }
            tempArr.push(temp.slice((i-1)*this.splitNum,this.totalDay));
            return tempArr;
        },
        addConcatClass(arr){
            return arr.map((item,index)=>{
                if(index>0){
                    if(index%this.splitNum===0&&index/this.splitNum%2===1){
                        return {
                            lineClassname:item.lineClassname,
                            centerClassname:`${item.centerClassname} ${this.style.concatItemRight}`
                        }
                    }else if(index%this.splitNum===0&&index/this.splitNum%2===0){
                        return {
                            lineClassname:item.lineClassname,
                            centerClassname:`${item.centerClassname} ${this.style.concatItemLeft}`
                        }
                    }else{
                        return item;
                    }
                }else{
                    return item;
                }
            })
        },
        handleSignIn(){
            this.resultfulDay++;
            this.totalList = this.getClassName()
        }
    }
    
}
</script>
<style lang="scss">
</style>