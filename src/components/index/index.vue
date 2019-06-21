<template>
  <div class="vindex">
    <scroll class="index-cont">
      <div class="indexBox clearfix">
        <slider class="slider-wrapper clearfix"
         v-if="banners.length"
         :loop="true"
         :autoplay="true">
            <div v-for="item in banners">
              <a :href="item.url">
              <img :src="item.mobileImg" alt="">
              <span v-html="item.title"></span>
              </a>
            </div>
        </slider>
        <!-- MV首播 -->
        <div class="mvbox firstshow">
          <div class="titlebox clearfix">
            <h3 class="btitle">MV首播</h3>
            <div class="changebox fr clearfix" @click="changeVideoBtn('fv')">
              <em class="cbtn"></em>
              换一换
            </div>
          </div>
          <div class="videobox">
            <div class="videoul">
              <ul class="vbox  clearfix">
                <li v-for="item in fv" class="videoli">
                  <router-link :to="`/dplayer?videoId=`+item.videoId">
                    <img :src="item.image" class="vimg">
                  </router-link>
                  <div class="video-tbox">
                    <router-link class="video-title omit" :to="`/dplayer?videoId=`+item.videoId">{{item.title}}</router-link>
                    <p class="video-name omit">{{item.subTitle}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 娱乐 -->
        <div class="mvbox recshow">
           <div class="titlebox clearfix">
            <h3 class="btitle">娱乐</h3>
            <div class="changebox fr clearfix" @click="changeVideoBtn('recv')">
              <em class="cbtn"></em>
              换一换
            </div>
          </div>
          <div class="videobox">
            <div class="videoul">
              <ul class="vbox  clearfix">
                <li v-for="item in recv" class="videoli">
                  <a href="#">
                    <img :src="item.image" class="vimg" ref="vimg">
                  </a>
                  <div class="video-tbox">
                    <a class="video-title omit" href="#">{{item.title}}</a>
                    <p class="video-name omit">{{item.subTitle}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 热播推荐 -->
        <div class="mvbox remshow">
          <div class="titlebox clearfix">
            <h3 class="btitle">热播推荐</h3>
            <div class="changebox fr clearfix" @click="changeVideoBtn('remv')">
              <em class="cbtn"></em>
              换一换
            </div>
          </div>
          <div class="videobox">
            <div class="videoul">
              <ul class="vbox  clearfix">
                <li v-for="item in remv" class="videoli">
                  <a href="#">
                    <img :src="item.image" class="vimg" ref="vimg">
                  </a>
                  <div class="video-tbox">
                    <a class="video-title omit" href="#">{{item.title}}</a>
                    <p class="video-name omit">{{item.subTitle}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 音乐现场 -->
        <div class="mvbox liveshow">
          <div class="titlebox clearfix">
            <h3 class="btitle">音乐现场</h3>
            <div class="changebox fr clearfix" @click="changeVideoBtn('lv')">
              <em class="cbtn"></em>
              换一换
            </div>
          </div>
          <div class="videobox">
            <div class="videoul">
              <ul class="vbox  clearfix">
                <li v-for="item in lv" class="videoli">
                  <a href="#">
                    <img :src="item.image" class="vimg" ref="vimg">
                  </a>
                  <div class="video-tbox">
                    <a class="video-title omit" href="#">{{item.title}}</a>
                    <p class="video-name omit">{{item.subTitle}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 猜你喜欢 -->
        <div class="mvbox guesslike">
          <div class="titlebox clearfix">
            <h3 class="btitle">猜你喜欢</h3>
            <div class="changebox fr clearfix" @click="changeVideoBtn('glv')">
              <em class="cbtn"></em>
              换一换
            </div>
          </div>
          <div class="videobox">
            <div class="videoul">
              <ul class="vbox  clearfix">
                <li v-for="item in glv" class="videoli">
                  <a href="#">
                    <img :src="item.image" class="vimg" ref="vimg">
                  </a>
                  <div class="video-tbox">
                    <a class="video-title omit" href="#">{{item.title}}</a>
                    <p class="video-name omit">{{item.subTitle}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 猜你喜欢结束 -->
        <div class="footer">
            Copyright © 2016 yinyuetai.com
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import axios from "axios"
import Slider from '@/base/slider/slider'
import Scroll from '@/base/scroll/scroll'
import Loading from '@/base/loading/loading'
import {url as gsburl,isError} from '@/api/getSliderBanner';
import {url as gfvurl} from '@/api/getFirstVideo'
import {url as grecvurl} from '@/api/getRecVideo'
import {url as gremvurl} from '@/api/getRemVideo'
import {url as glvurl} from '@/api/getLiveVideo'
import {url as gglvurl} from '@/api/getGuessLikeVideo'
import createVideoS from "@/common/js/videos.js"
export default {
  data(){
    return{
      banners:[],
      fv:[],
      recv:[],
      remv:[],
      lv:[],
      glv:[],
      originfv:[],
      originrecv:[],
      originremv:[],
      originlv:[],
      originglv:[],
      videoscurrent:{fv:0,recv:0,remv:0,lv:0,glv:0}
    }
  },
  methods:{
    getSliderBanner(){
      this.$http.jsonp(gsburl).then(res=>{
        if(res.body.error==isError){
          this.banners=res.body.bigPics;
        }
      })
    },
    getFirstVideo(){
      this.$http.jsonp(gfvurl).then(res=>{
        if(res.body.error==isError){
          this.originfv=res.body.videos;
          this.fv=this._normalizeVideos(res.body.videos,this.videoscurrent.fv);
        }
      })
    },
    getRecVideo(){
      this.$http.jsonp(grecvurl).then(res=>{
        if(res.body.error==isError){
          this.originrecv=res.body.details;
          this.recv=this._normalizeVideos(res.body.details,this.videoscurrent.recv);
        }
      })
    },
    getRemVideo(){
       this.$http.jsonp(gremvurl).then(res=>{
        if(res.body.error==isError){
          this.originremv=res.body.details;
          this.remv=this._normalizeVideos(res.body.details,this.videoscurrent.remv);
        }
      })
    },
    getLiveVideo(){
       this.$http.jsonp(glvurl).then(res=>{
        if(res.body.error==isError){
          this.originlv=res.body.details;
          this.lv=this._normalizeVideos(res.body.details,this.videoscurrent.lv);
        }
      })
    },
    getGuessLikeVideo(){
      this.$http.jsonp(gglvurl).then(res=>{
        if(res.body.error==isError){
          this.originglv=res.body.video;
          this.glv=this._normalizeVideos(res.body.video,this.videoscurrent.glv);
          console.log(this.glv)
        }
      })
    },
    //取整高度
    quzhenggaodu(){
        for(var i=0;i<this.$refs.vimg.length;i++){
          this.$refs.vimg[i].style.height=Math.ceil(this.$refs.vimg[i].offsetWidth/1.77)+"px"
        }
    },
    _normalizeVideos(list,current){
    let ret =[];
    var start=current*6;
    var end=(current+1)*6;
    for(var i=start;i<end;i++)
    {
      ret.push(createVideoS(list[i]))
    }
    return ret;
    },
    changeVideoBtn(c){
        this.videoscurrent[c]++
        this.videoscurrent[c]=this.videoscurrent[c]%5
        console.log(this.videoscurrent[c])
        this.quzhenggaodu()
    }
  },
  created(){
    this.$nextTick(function () {
      this.getSliderBanner()
      this.getFirstVideo()
      this.getRecVideo()
      this.getRemVideo()
      this.getLiveVideo()
      this.getGuessLikeVideo()
    })
  },
  mounted(){
    this.$nextTick(function () {
       setTimeout(()=> {
      this.quzhenggaodu()
      },500)
    })
  },
  components:{
    Slider,
    Scroll,
    Loading
  },
  watch:{
      videoscurrent:{
          handler(val,oldval){
            var originInfo="";
            for(var key in val)
            {
              originInfo="origin"+key
              console.log(this[originInfo])
              this[key]=this._normalizeVideos(this[originInfo],this.videoscurrent[key])
            }
          },
          deep:true
      }
  }
}

</script>
<style scoped lang="stylus">
    @import "~@/common/stylus/variable";
    @import "~@/common/stylus/mixin"
    .clearfix::before,.clearfix::after
        content: ""
        height: 0
        display: block
        line-height: 0
        clear: both
        visibility: hidden
    .vindex
        width 100%
        height: calc(100% - 6.8rem)
        position fixed
        top 6.8rem
        min-width 320px
        bottom 0
        .index-cont
            height: 100%
            overflow: hidden
            .indexBox
                .slider-wrapper
                    position: relative
                    width: 100%
                    overflow: hidden
                .titlebox
                    height: 4rem
                    line-height: 4.5rem
                    padding: 0 0.64rem
                    font-size: 1.2rem
                    color: #4b4c4d
                    box-sizing :border-box
                    .btitle
                        font-weight bold
                        display inline
                    .changebox
                        display inline
                        font-size: 1rem
                        margin-right 1rem
                        text-align center
                        line-height 2rem
                        height 2rem
                        margin-top 22px
                        .cbtn
                            background: url("../../common/image/cbtn.png") no-repeat transparent
                            width: 1rem
                            height: 1rem
                            background-size: contain
                            vertical-align: middle
                            display: inline-block
                            font-style: normal
                            font-weight: normal
                            box-sizing border-box
                .videobox
                    width 100%
                    overflow hidden
                    .videoul
                        border-bottom 0.5rem solid #f3f5f7
                        .videoli
                            float left
                            width 49.5%
                            padding-right 5px
                            padding-left 10px
                            padding-top 6px
                            padding-bottom 0px
                            box-sizing border-box
                            height auto
                            a
                                color:#333
                            .vimg
                                width:99%
                                height 100%
                                background-size cover
                            .video-tbox
                                padding-left 10%
                                width 100%
                                height 60px
                                box-sizing border-box
                                .video-title
                                    display block
                                    color #000
                                    padding-top 10px
                                    padding-bottom 10px
                                .video-name
                                    color: #b7b7b7
                                    font-size : 0.8rem
                                    height:1rem
                                    line-height:1rem
                                .omit
                                    text-overflow: ellipsis
                                    white-space: nowrap
                                    overflow: hidden
                        .videoli:nth-child(2n)
                            float left
                            width 49.5%
                            padding-left 5px
                            padding-right 10px
                            box-sizing border-box
                .footer
                    background-color: #ffffff;
                    padding: 1rem 0.5rem;
                    margin-top: 0.5rem;
                    color: #666666;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                    font-size: 0.6rem;
                    margin-bottom: 2rem;
</style>