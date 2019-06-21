<template>
  <div class="channel">
    <Scroll>
    <div class="channel-container">
      <div class="channel-box clearfix">
        <p class="channel-name fl">{{currentChannelTxt}}</p>
        <em class="open-btn fr" @click="showfn"></em>
      </div>
      <transition name="fade">
      <Xscroller v-if="show" class="channelist">
        <ul class="channel-ul clearfix">
          <li class="channelli" v-on:click.stop="changeChannel" ref="cc" v-for="item,index in channelList" :value="index">
            <img v-bind:src="item.picurl" alt="" class="clink">
            <p>{{item.channelname}}</p>
          </li>
        </ul>
      </Xscroller>
      </transition>
    </div>
    <router-view></router-view>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "@/base/scroll/scroll"
import Xscroller from "@/base/Xscroller/Xscroller"
export default {
data(){
  return{
    show:true,
    currentChannelIndex:0,
    currentChannelTxt:"韩流频道",
    channelList:[
      {channelname:"韩流频道",picurl:require('./han.png')},
      {channelname:"华语频道",picurl:require("./hua.png")},
      {channelname:"欧美频道",picurl:require("./oumei.png")},
      {channelname:"日语频道",picurl:require("./ri.png")},
      {channelname:"粉丝聚焦",picurl:require("./fs.png")}
    ]
  }
},
components:{
  Scroll,
  Xscroller
},
methods:{
showfn(){
  this.show = !this.show;
  if(this.show)
  setTimeout(()=>{
    this.$refs.cc[this.currentChannelIndex].classList.add('choose')
  },100)
  },
changeChannel(){
  this.currentChannelIndex=event.target.parentNode.value;
  this.currentChannelTxt=event.target.parentNode.innerText;
  console.log(this.currentChannelIndex)
  for(var i=0;i<this.channelList.length;i++){
    this.$refs.cc[i].classList.remove('choose')
    this.$refs.cc[this.currentChannelIndex].classList.add('choose')
  }
}
},
mounted(){
  this.$refs.cc[0].classList.add('choose')
   this.$router.push({
        path:`/channel/222`
      });
}
}

</script>
<style scoped lang="stylus">
@import "~@/common/stylus/variable";
@import "~@/common/stylus/mixin"
.fade-enter-active, .fade-leave-active {
  height: 6rem
  transition: height .5s;
}
.fade-enter, .fade-leave-to{
  height : 0;
}
.clearfix::before,.clearfix::after
    content: ""
    height: 0
    display: block
    line-height: 0
    clear: both
    visibility: hidden
.channel
    position fixed
    width 100%
    min-width 320px
    top 6.8rem
    height:calc(100% - 6.8rem)
    .channel-container
        position: relative
        width: 100%
        z-index: 100
        .channel-box
            height: 2.68rem
            padding: 0 1.28rem
            background: #fff
            z-index: 99
            .channel-name
                font-size: 0.9rem
                line-height: 2.9rem
                color: #000
            .open-btn
                background: url('./cha.png') no-repeat
                width: 1.2rem
                height: 1.2rem
                background-size: cover
                display: inline-block
                margin-top: 0.9rem
        .channelist
            width: 100%
            overflow: hidden
            transform: translate3d(0, 0, 0)
            background: #f3f5f7
            position: absolute
            left: 0
            top: 2.68rem
            white-space nowrap
            text-align center
            .channel-ul
                position relative
                padding-left 1rem
                height 100%
                display inline-block
                vertical-align: middle;
                .channelli
                    display inline-block
                    margin-right 1.6rem
                    height 100%
                    font-size 0.8rem
                    .clink
                        width: 4.13333rem
                        height: 4.13333rem
                        display: block
                        margin-top: 0.42666rem
                    p
                        color: #8b8a8a
                        line-height: 1.3rem
                        text-align: center
                .choose
                    p
                        color: #000

</style>