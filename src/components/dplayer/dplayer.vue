<template>
 <scroll class="playercont clearfix" :pullUpLoad="true" @pullingUp="pullingUp">
   <div ref="playercont">
   <div id="dplayer" ref="dplayer">
    </div>
    <div class="videocountbox clearfix">
      <div class="fl">
        <a href="javascript:;" class="shareIcon fr"></a>
      </div>
      <p class="comment-count fr">
        <i></i>{{videoStatisInfo.totalComments}}
      </p>
      <p class="keep-count">
        <a href="javascript:;"></a>
        <span>{{videoStatisInfo.totalFavorites}}</span>
      </p>
    </div>
    <div class="videoinfobox">
      <a href="javascript:;" class="" ref="conttoggle"></a>
      <p class="title">{{videoInfo.title}}-{{artists}}</p>
      <div class="clearfix">
        <p class="fl">
          播放
          <span class="views-count">{{videoStatisInfo.totalViews}}</span>
        </p>
        <p class="fr">
          发布时间 : {{videoInfo.pubDate}}
        </p>
      </div>
      <p>发布人 : {{videoInfo.personName}}</p>
      <div class="describe" ref="Infocontent">
        <p v-html="videoInfo.content">
        </p>
      </div>
    </div>
    <div class="recommendBox">
      <h3>播放推荐</h3>
      <ul class="recommend-list recommend-list-cut" ref="recommend">
        <li v-for="item,index in relateVideo">
          <a href="javascript:;">
            <div class="picbox">
              <img :src="item.image" alt="">
            </div>
            <p class="video-name">{{item.mainTitle}}</p>
            <p class="count">
              <span class="countIcon"></span>{{item.totalViews}}
            </p>
          </a>
        </li>
      </ul>
      <div class="recommend-more" ref="more" @click="_toggleRelateVideo">
        <i class="more"></i>
      </div>
    </div>
    <div class="comment-view">
        <div class="comment-header">
          <span class="c-total">
            评论
            <em>({{commentTotal}})</em>
          </span>
          <input type="button" value="写评论" class="comment-btn">
        </div>
        <div class="comment-hot-view" ref="hotview">
          <ul class="comment-list">
            <li v-for="item in hotComment">
              <div class="comment-info">
                <img :src="item.userHeadImg" alt="" class="comment-user-avatar">
                <div class="comment-figure">
                  <p class="comment-user-name">{{item.userName}}</p>
                  <p class="comment-time">{{item.dateCreated}}</p>
                </div>
                <a href="javascript:;" class="comment-praise">
                  <i></i>
                  {{item.totalSupports}}
                  <span class="comment-support-animate">+1</span>
                </a>
              </div>
              <div class="comment-content">
                <span>{{item.content}}</span>
              </div>
            </li>
          </ul>
          <div class="comment-hot-line"><p>以上是音悦热评</p></div>
          </div>
          <div>
            <div class="comment-list-view">
              <ul class="comment-list">
                <li v-for="item in comment">
                  <div class="comment-info">
                    <img :src="item.userHeadImg" alt="" class="comment-user-avatar">
                    <div class="comment-figure">
                      <p class="comment-user-name">{{item.userName}}</p>
                      <p class="comment-time">{{item.dateCreated}}</p>
                    </div>
                    <a href="javascript:;" class="comment-praise">
                    <i></i>
                    {{item.totalSupports}}
                    <span class="comment-support-animate">+1</span>
                    </a>
                  </div>
                  <div class="comment-content">
                    <span>{{item.content}}</span>
                  </div>
                </li>
              </ul>
              <div class="comment-list-loading">加载更多</div>
            </div>
          </div>
      </div>
    <div class="footer">Copyright © 2017 yinyuetai.com</div>
    </div>
  </scroll>
</template>

<script>
import 'dplayer/dist/DPlayer.min.css';
import DPlayer from 'dplayer';
import {url as gvinfourl} from '@/api/getVideoInfo';
import {url as gvsinfourl} from '@/api/getVideoStatisInfo';
import {url as grelvurl} from '@/api/getRelateVideo';
import {url as ghcurl} from '@/api/getHotComment';
import {url as gcurl} from '@/api/getComment'
import Scroll from '@/base/scroll/scroll';
export default {
  data(){
    return {
      videoInfo:[],
      videoStatisInfo:{},
      relateVideo:{},
      dp:{},
      isfullscreen:false,
      initialheight:0,
      artists:"",
      toggleflag:false,
      hotComment:{},
      comment:{},
      commentTotal:0
    }
  },
  components:{
    Scroll
  },
  methods:{
  _initDPlayer(){
      this.dp = new DPlayer({
      container: document.getElementById('dplayer'),
      preload: 'auto',
      volume:0.7,
      hotkey: true,
      video: {
          pic: this.videoInfo.albumImg,
          url:this.videoInfo.videoUrl,
          quality: [{
            name: 'HD',
            url: this.videoInfo.videoUrl,
            type: 'auto'
        }, {
            name: 'SD',
            url: this.videoInfo.videoUrl3,
            type: 'auto'
        }],
        defaultQuality: 0,
      },
      danmaku: {
          id: 'demo',
          api: 'https://dplayer.moerats.com/',
          addition: ['https://dplayer.moerats.com/v3/bilibili?aid=4143031']
      }
    });
  },
  getVideoInfo(){
    this.$http.jsonp(gvinfourl,{params:this.params}).then(res=>{
      if(!res.body.error){
        this.videoInfo=res.body.videoInfo;
        this.artists=res.body.videoInfo.artists[0].artistName;
      }
    })
  },
  getVideoStatisInfo(){
    this.$http.jsonp(gvsinfourl,{params:this.params}).then(res=>{
      if(!res.body.error){
        this.videoStatisInfo= {
        }
        this.videoStatisInfo.totalComments=res.body.totalComments;
        this.videoStatisInfo.totalFavorites=res.body.totalFavorites;
        this.videoStatisInfo.totalViews=res.body.totalViews;
      }
    })
  },
  getRelateVideo(){
    this.$http.jsonp(grelvurl,{params:this.params}).then(res=>{
      if(!res.body.error){
        this.relateVideo=res.body.videos.slice(1,16);
      }
    })
  },
  getHotComment(){
     this.$http.jsonp(ghcurl,{params:{'belongId':this.params.videoId}}).then(res=>{
      if(!res.body.error){
        this.hotComment=res.body.data;
      }
    })
  },
  getComment(){
     this.$http.jsonp(gcurl,{params:{'belongId':this.params.videoId}}).then(res=>{
      if(!res.body.error){
        this.comment=res.body.data;
        this.commentTotal=res.body.commentTotal;
      }
    })
  },
  _toggleContent(){
    if(this.videoInfo.content.length<40){
        this.$refs.conttoggle.style.display="none"
    }else{
      this.$refs.conttoggle.className="info-toggle-down"
      this.$refs.conttoggle.addEventListener('click',()=>{
      if(!this.toggleflag){
        this.$refs.conttoggle.className="info-toggle-up"
        this.$refs.Infocontent.className+=" describe-all"
        this.toggleflag=true;
        }
      else{
        this.$refs.conttoggle.className="info-toggle-down"
        this.$refs.Infocontent.className="describe"
        this.toggleflag=false;
        }
      })
    }
  },
  _toggleRelateVideo(){
    var curClassName=this.$refs.more.children[0].className;
    if(curClassName=="more"){
      this.$refs.more.children[0].className="less"
      this.$refs.recommend.className="recommend-list"
    }else{
       this.$refs.more.children[0].className="more"
      this.$refs.recommend.className="recommend-list recommend-list-cut"
    }
  },
  _setHotComment(){
    if(this.hotComment.length!=0){
      this.$refs.hotview.style.display="block"
    }
  },
  pullingUp(){
      //上拉加载
  }
  // _fullscreen(){
  //   let playerbox=this.$refs.playercont.$el;
  //   this.dp.on('fullscreen',()=>{
  //     if(!this.isfullscreen){
  //       this.isfullscreen=true;
  //       this.dp.fullScreen.cancel();
  //       playerbox.style.width=document.documentElement.clientHeight+"px";
  //       playerbox.style.height=document.documentElement.clientWidth+"px";
  //       playerbox.style.transform=`rotate(90deg) translate(0,-100%)`
  //       playerbox.className="fullscreencont";
  //      this.$refs.dplayer.style.position="relative";
  //      this.$refs.dplayer.style.top="0px";
  //      this.$refs.dplayer.style.height="100%"
  //      }else{
  //        this.isfullscreen=false;
  //        this.dp.fullScreen.cancel();
  //        playerbox.style.width=document.documentElement.clientWidth+"px";
  //        playerbox.style.height=this.initialheight+"px";
  //        playerbox.style.transform=`translate(0,0) rotate(0deg)`;
  //        playerbox.className="playercont";
  //      }
  //   })

  // }
  },
  computed:{
    params(){
      return this.$route.query;
    }
  },
  created(){
    this.getVideoStatisInfo();
    this.getVideoInfo();
    this.getRelateVideo();
    this.getHotComment();
    this.getComment();
  },
  mounted(){
    this.$nextTick(function () {
      setTimeout(()=> {
      this._initDPlayer()
      this.initialheight=this.$refs.dplayer.offsetHeight;
      // this._fullscreen()
      this._toggleContent();
      this._setHotComment();
      },1000)
    })
  }
}

</script>
<style scoped lang="stylus">
@import "~@/common/stylus/variable";
@import "~@/common/stylus/mixin"

.clearfix::before,.clearfix::after{
    content: "";
    height: 0;
    display: block;
    line-height: 0;
    clear: both;
    visibility: hidden;}
.playercont{
  height: calc(100% - 6.8rem);
  position: fixed;
  width:100%;
  min-width: 320px;
  top:6.8rem;
}
.fullscreencont{
  position: absolute;
  z-index: 2002;
  transform-origin:left top;
}
#dplayer{
  position: relative;;
  width:100%;
  min-width: 320px;
  top:0;
}
.videocountbox{
  position: relative;
  background:url("./background.jpg");
  padding:0 10px;
}
.videocountbox p {
    line-height: 2.6rem;
    font-size: 0.8rem;
    color: #666;
}
.videocountbox .shareIcon{
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozMDE4RDkwNkJEQjkxMUU2QThFMkRBOTc5OTlBQzcyMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1MjZDM0VBOEJEQjkxMUU2QThFMkRBOTc5OTlBQzcyMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjMwMThEOTA0QkRCOTExRTZBOEUyREE5Nzk5OUFDNzIyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjMwMThEOTA1QkRCOTExRTZBOEUyREE5Nzk5OUFDNzIyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+0+MdnAAAA6tJREFUeNrMmV1IFFEcxd3pyxezMvsghdgtLMuyD6Qi34p6kDKlb8MK7CVCqTSIQIQIUhOFXkopBCtSMgShh4x6yIyKMM1KyIgUjETChNCy7Bw4C+PS7s6qe/HCj3HnnmnO3Pnf+//PzeV2uyMMt5kgGxwE60E0GACvwR1Q3dXV9csrdhk2uAbcA8vAH5n6ChbJ7DTwEWTCZBsvsAyaSwbNgCNSChaCFBjZBVL0u1T9zR6PJ9nkCM4C78BSsBfUeztgbowQxjJwqAOfQaKpEcyxjVx9ICEM19tGMseUwX2KuWKH+mLp91kG4+8N6Hcixij2S59symCUU3O2Rn2UCYM7Ade1+BCvo74vXAZdIB28AA+0OK8ACU4uxkxOkP6ZFSZjXIDva/GtAWfVf1maQOZc0rHdnCyD/HcOKLBpLIkpS6NwBJSBJrBbS4jlx5ylfuoeYbI0WJNk7K3yKA1V6XhUaYttFByS7jR4CtJApIxFgjSdZ/97sN9fJtmhm64D85TIX4JbfCpppoMscB4sB7/BDXAJfAnwQHPAVXDYdm5ABYP3QXifkxi9H74G48BtkKrf30AvWAwW6NxDZQLGlAcMacRKghjzbYmqZjbIXL/itg7GOsYEtQwyR7aoqqgFF0G7TceYuqCMECFj1xTMvROJEd9c/L8YshTYNJend9/uo2vX+Tz9Zil0ZqLmnAZ5llIRY6giiL5CuhRvEJsyyOAsdHhNofTZpgxu1PTvcXhNj/SbTBmcq7I7lEb9bBMVOW/wXRMklEY916m/Jgy+Aqu1DjppcdI/N/WKa5TAixxeUyR9tUmDreA4yA2iz5WOqe+uKYOMoz0K/HLdOMlHl6Tz5bYSvkqvOqxtPLmYn4SnbA/BgvSKrZBw0lapIHGci0OtZti2g3wdI3SDMo30iB9j0apmssZTzUxkOyNfqW8G6FZKvA4Gbbr54LHCokWlWROMDLEexN/bVL5tVj2Yyq+7yVho21Q1ez/Mo3Xs1vftEulqZI6jvBU0qipiRTMEGnWe/Su9kzAcWx/8xDyhGR+vYvaJQqFBE3I0wNaHS9UVy/70cKSqQU0at2Ktwxan5+zm/NSHo9KxHQtnLh1RwHOy9YEPoNNhEdsp/RZTOwuxislQGvWxpgzytceEeA31g6YMMpWudWoSEyVG+lZTBvkhxu3dAof6AulrTRmsBJ/0uZoRZPQypKO+0pTBYZAJfiqXl/i+br5WUKJ+6riRPjzld/ldU/3/Sf4JMABvmCd4LMPJOAAAAABJRU5ErkJggg==');
  background-repeat: no-repeat;
  background-size: 100%;
  width:1rem;
  height:1.1rem;
  display:inline-block;
  margin-top:0.9rem;
}
.videocountbox .comment-count i {
    background :url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAoCAYAAACB4MgqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozMDE4RDhGRUJEQjkxMUU2QThFMkRBOTc5OTlBQzcyMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozMDE4RDhGRkJEQjkxMUU2QThFMkRBOTc5OTlBQzcyMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjMwMThEOEZDQkRCOTExRTZBOEUyREE5Nzk5OUFDNzIyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjMwMThEOEZEQkRCOTExRTZBOEUyREE5Nzk5OUFDNzIyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ZVRllwAAAjNJREFUeNrsmb1Lw0AYxi9SB7+wIlq0FKQFxwoOgoI4qAhOgiCuIoIgdRARrauI/4AOSgcVUXERxUH8GhxcxUWXiosgRUErCn609XnpCSGY5pI2aYN54UeTcLl7crk8791V8vv9A4yxJVDN8hOfYDkajYb03CRB+GMeRcujDeIvRAu7ZKIbwItFIqmdFD++BE3Ao6cCl6KyZ2aTKGI2DdsKp4/zd6xVKYYKjbs54DNZQyMoAXeC39gtCLsyFNjlH6xVIdoWdWhATXilrKJOkCyQEVIB9kBQTbgkOz41Uwm8W7hsIBBwO67iCHeEF3i4sry/GZyDUqMVwCnkp6+gBU5zY3aP+7IRreLTdVb0OCWDblCeq+kuevvMCuE0zzm2KgE5ruII/28+/s1/N8AXv15sB+GrYBj0GrjfS3sioCxHCSgOhuA0TyLCR8CmYolGSWVRoN0Ogw+cKdrAvohw8uITxXW3oHBqYD6bHlcmIHBkRQKiucWsk4Ac4Y7w/AiXCkivpOUq5BZv3Ob0bAbFwDjYFijbQ8kPCchj4AFiaj2eAGPgXWeFtWALrGh4OyW9A6ZzT1zWqSHa9NTyea+O4UIPO8mPr8EguFK86gUwxc93wLSOt0rl7uH9CS3hRoKGwDqoAR9ggqX/Y6JpxBro5+XoAcIQkcrHKv+vOARBLr6LTx1oXVpPK3g+Gx0FkUK0wwfe8zNcaB8XHeeTski2DZjp40k+HNpZejOeaBWdRGnFjwADAE9bdt1siq4EAAAAAElFTkSuQmCC') no-repeat;
    background-size: 100%;
    width: 1.2rem;
    height: 1.1rem;
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 0.2rem;
    margin-right: 0.4rem;
}
.videocountbox .keep-count{
    float: right;
    position: relative;
    margin-right: .8rem;
}
.videocountbox .keep-count a{
    background :url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAApCAYAAACsldDLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozMDE4RDkwMkJEQjkxMUU2QThFMkRBOTc5OTlBQzcyMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozMDE4RDkwM0JEQjkxMUU2QThFMkRBOTc5OTlBQzcyMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjMwMThEOTAwQkRCOTExRTZBOEUyREE5Nzk5OUFDNzIyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjMwMThEOTAxQkRCOTExRTZBOEUyREE5Nzk5OUFDNzIyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+zhu+pwAAA9hJREFUeNrMmVtIFFEcxtfVILtYK1FEabEmhWtQUFn0YiT4pr51g0jCQikKxNBuhhVZSVlYZkltVtCD0FsPCfVWUUQPXjJzQYnIpIvSpqWWfX/8Bg6DM467M7t74OPM7Ln9zsw5Z75zNs7r9bpsCjOgMmgftAzqhW5CF6FRo0KBQMByAwku+4If2snrHwQ+C/mgXXY04LYJNJugArkBSobWQd/5e3YswR5jXAW95vUb6DSvj8cK7EYoB+qHGnRpct8HbWW+qMOeYnwZGtalyX2tLl/UYGV85kLfoDqDPNeYnsv8UYM9yrgGChrkCTJdzR9x2LVQPjQI1U+Rt4758lku4rCVjGsJYhaCytitjDRshvJUay2W0TqVx/LTDla+YEugFVA6tJLX65XJM2CxLcl3FToBPeF63J2WltaFWNSNT+8nswriFG+QAm1RoNIJNseg7CDTv07j4SwQKGieQfov6APzvGcnnqETHzXYeMSXoINyrys8BvWwUBcr0a6lgn8hDr0UdnSV7q0tn+Rtj/ONlAqsOKUL0BD0EGpTgHrMHJMdQXVdGBIJBNaGWya9xSzoiMCKlUuFNkPPXREOU1lEdGATuXq1VxKMBqjFzrxA9FMsp8B2chJti0VYPFnhmiucbo5XCfe4BsYSaB65JJx30+Gf5LakOVaACdpMrioMB7/2BROTXKEAb4+BV6+BVgC0Uv8Fq2Z8DnoAxTOONKjs15q4HgtotZE3kIRS/t5k10YvRNAyFdTIyMjXrEQBLowQaKECWgLQGquuq14Bvg0VOwxazHY00PqpjMxkYT90nZUUcuWwO+yB7tBnHDACteJnG5Qtic+hB6vVW2MGatV8exi3OQSr1Ztsx05B63mrQ7Ctyu7DFthxeggnQifrzwwXNpWuPkC/64SrGmL9SVgVUsOB1V5Nu8PLbLuVoTAVbKbDk0sPuzrSsLKPWzPJfs7KJPOFA6sV7rDYqJwmvoLeMs6xWK4jXFg3C49ZWAmyoKdQi2viEPkP4xb+nmVhRZB2fJhk7lBg5XAjkbvcEZMJ+Ah6yTOHPnoKD/1EH39/yXwZBivCCNuR9paGAqsdRAwbLGl+jrUCnraUQ16aIClzg/flTC9gfj/L64PWTpKVExl9EPPdz8+gmJi70CI2XkIXL2vkFe7jzI6R5su+HzrEM4BRGiTxq1+g3eyE/AexEE/6byiuay/UyGsBm8m3IY3dgs5An6cx6xe7Jv5fKGJnxWn9ZgckFAG00fDpeTwes8plVr8Ty8kxPMCtzg7ovsv4ANkoSP7HrGM2603kOnsYoE1mhf8LMACNcw9gXufpBgAAAABJRU5ErkJggg==') no-repeat;
    background-size: 100%;
    width: 1.2rem;
    height:1.2rem;
    display: inline-block;
    vertical-align: middle;
    margin-bottom: .21rem;
    margin-right: .42rem;
}
.videoinfobox{
    background: #fff;
    padding: .9rem .8rem 1rem;
    position: relative;
}
.videoinfobox .info-toggle-down, .videoinfobox .info-toggle-up {
    position: absolute;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAWCAYAAACsR+4DAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1MjZDM0VBQkJEQjkxMUU2QThFMkRBOTc5OTlBQzcyMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1MjZDM0VBQ0JEQjkxMUU2QThFMkRBOTc5OTlBQzcyMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjUyNkMzRUE5QkRCOTExRTZBOEUyREE5Nzk5OUFDNzIyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjUyNkMzRUFBQkRCOTExRTZBOEUyREE5Nzk5OUFDNzIyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+e+0m0wAAAhVJREFUeNrEls0rRFEYxs8cEyWykIj/QYqNlcX4KpRiM2LBCmUhOwtlYcdCoQYrSha+CiFs2JCwsKFYmMbCxwYlaZTnrefoNI1p7txr5qnfdM9734/nztx75vpCoZCC/KAYPKjMqgw8gqjGRzY4AxEwA3wZMOTj7Ai9ZIuxElDBhD4wmQFjk5yt6KVEjIXBnJU0AMbTaGqcM43mxZO2vqll6+QQGE2DqVHOMhIPvXJgjH2DTrBmJY2A4X80NcwZRjK7i15+jRlzQbBtxcbA4D+YGmRvo23OjpqAjin4Au1g34pNgH4PTfWxp9E+Z37ZSTpO4SdoBUfWozwFejww1Q2mrS3piLM+YxP1Hw0+QDM4sczNgg4XpoJ8+o2pE874iJesEzR6B43gnOsssADaUjAlNYvsodizkTOUU2OiVza4sswt8UqTVRNrjKkr9nxNVKSTaPwCAuCaa/kLWwH1SdTWgVXWKPYIsKdya0z0DGrBLdc5YB3UJKiRcxvMVaytZS/llTHFNw+52nuuc8EWqI6TK7FN5ijWBJy8vWiHN3GYVx3hOg/sgCorp5KxfK4jNBV2Mkin8ISZn+SJ6wKwC8rJHmOK71aSe+d0iD/FPemGAw9BESgEBzxXaN2Xdcx1LO1iw4x97IuI2WYarG0mrcZEFzTwFrP3SezSTWO3xkSn3HCfSQtjruRX3ugYlPI46kXDHwEGAEKjcA/Mm4wKAAAAAElFTkSuQmCC') no-repeat;
    background-size: 100%;
    width: 1.3rem;
    height: 1.3rem;
    right: 0.8rem;
    top: 1rem;
}
.videoinfobox .info-toggle-up {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAVCAYAAADB5CeuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDNDBBN0M2MkJGNTUxMUU2QThFMkRBOTc5OTlBQzcyMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0RThFQjc5NEMwRDgxMUU2QThFMkRBOTc5OTlBQzcyMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkM0MEE3QzYwQkY1NTExRTZBOEUyREE5Nzk5OUFDNzIyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkM0MEE3QzYxQkY1NTExRTZBOEUyREE5Nzk5OUFDNzIyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+3MB1DAAAAddJREFUeNrEljFLQlEUx69pBg46hNQgRhgFCTW4uDhEg4tE5FBDUVNBRBREUxAITVJkECiWk7VIIRFYaJFjn6IvERaS2P/C/8LlgWj5fB74+Tj3nXfuj6fvPG2ZTEaYEONgATyAj26bDZggFATv4JzHYL+lpsAL8DKXxwqY7JfUBAVGDOujFA1YLTXGjX3MP8EOj4Lrr6yzRMpHIT/zGoiBSx5rXPcbxHsmZfxqvsEiqDKvMv9iHmD9aK+kvNxA/YjrYAmUDXUyj/O8YH1FexhMkxpm42lNaBmUWtSXeL6ujY0y+5gi5QHPYIZ5A6yCYpvriqxrMJ9lH0+3Um7wBEKa0AYodHiHC6xXYiH2c/9XygUeQZh5E2yC/B8fjjyvazIPs6/rr1JKKKIJbYPcP+dajtcrsQjfk65OpZzgHsxpa/sg3eUrKc0+Kua5j7OdlCy4A1Ft7RCkhDmRYj8VUe7nbCVlB7ecyiqOQVKYG0n2VRHjvnajlFy44dBTcQISojeRYH8VcT4QdiVlA9ccdipOwZHobcj+Z1q+Aq6kjwMfa2BdO3kBDoQ1IfeRDrvM5Ux7k3dqSCvKgj1hXTS5X1ZbG3RwhtRpnNNmiZViW/wr/SN/W78CDABQ2l+Nb8FiUwAAAABJRU5ErkJggg==') no-repeat;
    background-size: 100%;
}
.videoinfobox .title {
    color: #222;
    font-size: .9rem;
    margin-bottom: .9rem;
    width: 17rem;
    line-height: 1.3rem;
}
.videoinfobox p {
    color: #999;
    font-size: .74rem;
    margin-bottom: .52rem;
}
.videoinfobox p .views-count {
    color: #27d5bf;
}
.videoinfobox .describe {
    margin-top: .8rem;
    max-height: 1.16rem;
    overflow: hidden;
}
.videoinfobox .describe-all {
    max-height: none;
}
.videoinfobox .describe p {
    color: #222;
    font-size: .8rem;
    line-height: 1.2rem;
    margin-bottom: 0;
}
.recommendBox {
    margin: .4rem 0;
    background: #fff;
    padding: 0 .8rem;
}
.recommendBox h3 {
    color: #222;
    font-size: .96rem;
    line-height: 2.4rem;
    margin-bottom: -.4rem;
}
.recommend-list-cut {
    height: 28.3rem;
    overflow: hidden;
}
.recommend-list li {
    padding: .4rem 0;
    border-bottom: .0267rem solid #e7e7e7;
    overflow: hidden;
}
.recommend-list li .picbox {
    width: 8.55rem;
    height: 4.8rem;
    float: left;
    overflow: hidden;
    border-radius: .19rem;
}
.recommend-list li img {
    width: 100%;
    height: 100%;
    border-radius: .19rem;
}
.recommend-list li .video-name {
    color: #666;
    font-size: .725rem;
    height: 2.67rem;
    overflow: hidden;
    margin-left: 9.1rem;
    margin-top: .26rem;
    line-height: 1.23rem;
}
.recommend-list li .count {
    color: #999;
    font-size: .7rem;
    margin-left: 9.1rem;
    margin-top: .6rem;
}
.recommend-list li .count .countIcon {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1MjZDM0VBRkJEQjkxMUU2QThFMkRBOTc5OTlBQzcyMiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1MjZDM0VCMEJEQjkxMUU2QThFMkRBOTc5OTlBQzcyMiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjUyNkMzRUFEQkRCOTExRTZBOEUyREE5Nzk5OUFDNzIyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjUyNkMzRUFFQkRCOTExRTZBOEUyREE5Nzk5OUFDNzIyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+tOrJtQAAA75JREFUeNq0mF1MjmEYx9+eSh1IsfSxGcqY5ICwmaEOSNIJ8pUZ4wSl2GgN81EcyGb0MTpoc0A1xRFvPg7obSNTzIR8lLCpdFDU5iPif23/x56157vXtf12P2/PfV/X1X1f93Vf9xNQUVHhcSBRIB0kg9lgKhjHd19BJ2gFDeAm6LarOMhmvyUgH6SZjIkk88E28BvUg2LQaGVAsXgfD64DH8gAf8ANkAcWgRgQSmL4tzz2GeYYH3XEu52RTeACp74flIAy0GvQv4c8YF9ZxmyQC1ZxVneBKiczcoQDxIlakACOmjihJ585JoE6RNdl6rblyEFwnGucA9Y7CTod6aaOHOoU3YetHJHlOMkBG0G5x39STp2iu4i2dB2JA+pe3gvqPP6XOur20FacniOlIIzrWWaibA5IAoEunRHdV2irdKQjixnZ/YxyI8kCT0ALeAW2ggAXzuTSlrqb/jmSz/acRWBuZ9sHpoGL4D5Y4NCRHtoS2a86Ivt9JRiyEZzqmi4FW0AXWAiaQCV1OQneIR4ZUQofJLHdtpEngjTnyiUwA5wCvzhbslz7bB4dvbQpfdMVHmAit1ys9SAoAInACyLAGfAULLMxXrWZovAUFXk8im35loGXzudZ4A64BiaZjGthm6jwKBd57Yc8Uc/ZKeBsrWZZkGzQ/40aewr3s8gXPyWtn4ybGXQsnIlML25Um2GKyzxgR75xV4mEWJUc8nKAz+E2lIey/WGhU3bQC7bSdwdnaqSoNgdk0Dv+mG7DkRC23w3ep4Bm5pRYTbKrNeiv2uwUR57zx7xRLMNkcBXcBXPBBx4HcnQ8MxmXxLZVHLnHHytcODAWnABtYA13itQaM0E1S0szSWPbEMTIlsyYCiZaZFc1NsaDtXQilgareW58svlPiK3ltO1VeABJ6R/MGtNMPmoSkRoHTSyasxw4IbIbjKHtHnVLFbOVCjzaZHAl2wk8V7LoRJPDJY3WFEjF2jKgkVeACG2xoiPnuQuSmMbtxIGelNCWV73zKCOKFckp61joGkkzi6NhlztMLcjF1h69UrED7OTzWZD5H7JtJnV7aKvDqIqv4r1D6tEaG8HrRLKpM5D3nSqre00ROway0K3hddKtRFNHmcaJQrs3Pem4mQlqA3hJBZEOHIjkmDbqGKTOQqd3X5m6hyxypeg5Bg6xqpIS7xHXuE+T5OK5q1KZqYP5zsvN0O72s0Q7b/RSLB9gkZ1BrGSYXwFO84uAX76P+EgUZ0f9UDNFc5RLkfOeFZmPR0eX3XX8K8AA0EfdpTXBOUUAAAAASUVORK5CYII=') no-repeat;
    background-size: 100%;
    display: inline-block;
    width: 1.2rem;
    height: 1.3rem;
    vertical-align: sub;
    margin-right: .32rem;
}
.recommendBox .recommend-more {
    text-align: center;
    height: 2.56rem;
}
.recommendBox .recommend-more i {
    width: 1rem;
    height: 1.2rem;
    display: inline-block;
    margin-top: .907rem;
}
.recommendBox .recommend-more .more {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozQURGNTVGREQzRTcxMUU2OTVBREEyN0Q3N0ZGQzYzMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozQURGNTVGRUQzRTcxMUU2OTVBREEyN0Q3N0ZGQzYzMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjNBREY1NUZCRDNFNzExRTY5NUFEQTI3RDc3RkZDNjMzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjNBREY1NUZDRDNFNzExRTY5NUFEQTI3RDc3RkZDNjMzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pQXETQAAApVJREFUeNq8lltIVUEUhueM27QLFkiCEIK+RFAPZVBiBCEZ+abQQxeiCwZRaaSpWBYiplGElyJOokloPQT1pJRIWVhYYFAQiEiQCD30HN66/Qv+A5vN3jN7e1vwycGZWf9Za2atdWLxePyOUqoJ/FQrY+vBNY0/G8FjkL5Coj1gkwhfAg54woXlsrUUFY0KzRQfAau5kLYMomvoW7J6DExpLvwAh8EG0MuNS2USUDfIpOik/FO7NkxxIQM8WiLxVRTNou9viQXt2fgdHJXL54GURYp2gRxwAky4F7XPAdlwHGSDh3QQ1ZLBA7CFomPeDTrg4DgPbKaD5AiiSaADbAWnwFe/TdrgQA6cBNsonhRS9B7YDs6Az0EbtcXRFzrIBW0W8RhoB7tAKfhkcizCVWwgQTZK8Tw6jgWItoJ8cA58NPgTrXLNaDos0YyAMrAX3PaIy+dbYB+4AN5brkKuLVeEb4IdIVI5TMf7eSZhzaBQogBvLaJ3wU7JjsO7kFTGmS5x/i/g8GtQCWSizTHag+AyeGW5fwlsN7VGE4/rAzgfkEqvDYBqUExqwEuLaAvYQ40R5XlUw7zHds7nGoOzPldj6beIyrUU8NG9c78wtw3JyGLUv8FVg9PnIepa7v8AuAje2Op4gNEWW4Rt1gCKeC2DfjXlZ/0cEPXgD1MfxepACXvEi6BiNqXSofg0H0gYuwIOUbzP1EVM9pSRyzf/y5IwWSXH6nXwTFnal816+ILlt9kMO4+flXOiNfILq8UKKw50h+U2zzntNqnP06yG3jAOnQgPRiJNZWnMMxOKk+gsu1l3WGdOxNfaxhKsBbNgHVMsPbgziiNnAfXZwh+CdexMMtnuR3XiLLA53OC0+cXBEtn+CzAAm6R/OTVjlyYAAAAASUVORK5CYII=') no-repeat;
    background-size: 100%;
}
.recommendBox .recommend-more .less {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyppVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNDE1MjI3MEQzRUQxMUU2OTVBREEyN0Q3N0ZGQzYzMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNDE1MjI3MUQzRUQxMUU2OTVBREEyN0Q3N0ZGQzYzMyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjNBREY1NUZGRDNFNzExRTY5NUFEQTI3RDc3RkZDNjMzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjNBREY1NjAwRDNFNzExRTY5NUFEQTI3RDc3RkZDNjMzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+kqIo9AAAAmxJREFUeNq8l0tIVFEYx693fLRw2yIQhYwIhRazUAlDVy1c2aKgh5hCCWlaVvhW0F7Tw/AFjoUpaUEudGOiRgRlEWRtXOTKCBeCCkkykjoz/g/8LxwG7rkP7/TBb3Pn3vM73/m+c+6dhGAwqLmMVvAXPHXzcKJLaSM4C6IgDLr/h/g6KAFtIBXUgm3QH09xNSgH98AbaYwaygfjIb4CKsAT8FK6PgBSKI+AIS/F5cy22ySrHqCD2+AfeO2F+CK4wcxUW6ALJIMmsAvG9iM+ww5+brNzH1HeSvm4G/Fp0AJGQKeDXrgLfKCDDTfpRFzEAV6xg51GO0gCAWY+bUd8CjzgMt3R3EcLuz3AQ+ad/KMec3MheAym2CSaRSmKLe6pAzNsvAKzjPPZQGJm9RYDFkmrIer41uS+KOUHOPZVMCdnnMu9+BHc5ANmIZdiAtznNU0hF4fLJ9AL8oyM/dyfX3hIqKRyKZp5zcdtJJrovUJeTbE4D8p0LsUPUMUmMAujFLMxpWjgNVHHk4rnw3R8EysgxPM8h1VSuRS3YlYlyqPyAyd2wkIuXPNC/BDsKG72c3lUpTDq+Bn0gRzFeKIkXbpF9x4Hz8B3cM1iVSKc2FdO1K8aWCXOAi/Ago1SyEtZyZ4Z4MQdiY+CYbAILluUwqyOC5x4tl1xJl/0v0Tb84BwGjuU/+SHwTErcQYYBcuglC91t7HNiS9RfsRMnEbpGj/mQtr+Q8gvgd98vR6OFR/iK/APuOCR1IgQ5StMLN0QH+Q30halG5r3EeIn1DozT9P5T0Bs6vNxkhqxKSXWKcSr4BxnE+/YYObLewIMAM+jpk4KlSM4AAAAAElFTkSuQmCC') no-repeat;
    background-size: 100%;
}
.comment-view{
    font-size: .513rem;
    background: #fff;
}
.comment-header {
    padding: .513rem .8rem;
    line-height: 1.6rem;
    background:url("data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABIAAD/4QONaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzMiA3OS4xNTkyODQsIDIwMTYvMDQvMTktMTM6MTM6NDAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NTVhYzYxMWMtYWJlZC1jYjQ0LWIyN2YtNjRjZDM1ODk5YjFhIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjNBREY1NUZBRDNFNzExRTY5NUFEQTI3RDc3RkZDNjMzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjNBREY1NUY5RDNFNzExRTY5NUFEQTI3RDc3RkZDNjMzIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdhMGY4OGNmLTNhYzQtZGM0YS04ZDQ1LWM1OTNkM2NlYmU0MyIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjI5ZDEwM2UwLWRiOTctMTFlNi04MDQyLWU5MWVmNjdlMTUwYyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAQDAwMDAwQDAwQFAwMDBQYFBAQFBgcGBgYGBgcJBwgICAgHCQkLCwwLCwkMDAwMDAwQEBAQEBISEhISEhISEhIBBAQEBwcHDgkJDhQODQ4UFBISEhIUEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEv/AABEIAAUABQMBEQACEQEDEQH/xABSAAEAAAAAAAAAAAAAAAAAAAAIAQEAAAAAAAAAAAAAAAAAAAAAEAEBAAICAwAAAAAAAAAAAAABERITACExIzQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AG37dtfr8gzXrlQXuWChllFMYcD/2Q==")repeat;
}
.comment-header span {
    font-size: .852rem;
}
.comment-header .c-total em {
    font-size: .6rem;
}
.comment-btn{
    float: right;
    color: #fff;
    height: 1.6rem;
    font-size: .8rem;
    border: none;
    border-radius: .21rem;
}
.comment-btn {
    background: #27d5bf url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAkCAYAAADsHujfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDU0MkUxMEZDNjhDMTFFNkE1NTlENDI0RkZDOTQwMjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDU0MkUxMTBDNjhDMTFFNkE1NTlENDI0RkZDOTQwMjciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNTQyRTEwREM2OEMxMUU2QTU1OUQ0MjRGRkM5NDAyNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowNTQyRTEwRUM2OEMxMUU2QTU1OUQ0MjRGRkM5NDAyNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv0p60gAAAETSURBVHjaYvz//z/DYABMDIMEgBwSAMTPgPg/lTE+UALE14BYGi4CjJrn/2kDGHDgEiQ1F2HiLEC3SEDddAKID9I4BkAh0Q1l/wXiPuQQgYF2PL6gBkYOiT9AHI8sT6/Eih4SyUC8kN65ppSQI+jhEJAjugg5gtYOIdoRtHQISY6glUNIdgQtHEKsI9rRS2BqOqQMzRFJxIQEtR0CckQnmiMW0bv2pdgR1HAIVRxBqUOo5ghKHEJVR5DrEKo7glyHJFHbEeQ6xAWILwBxIrUcAQIsZOh5AsSGw7oVP+qQUYeMOmTUIdQqWS2AuJxO9lqgCzCCRgOQOuL0Bg+AWBEWNZnQ+oPeABQA6cghMijSCECAAQAB9EYyk+8jngAAAABJRU5ErkJggg==') .42666rem .32rem no-repeat;
    background-size: .96rem .96rem;
    line-height: .8rem;
    padding: .4rem .513rem .4rem 1.6rem;
}
.comment-list li {
    padding: .8rem;
    border-bottom: 1px solid #ddd;
}
.comment-list li:last-child {
    border: none;
}
.comment-info {
    position: relative;
}
.comment-user-avatar {
    width: 2.33rem;
    height: 2.33rem;
    border-radius: 50%;
    margin-right: .267rem;
    display: inline-block;
    vertical-align: middle;
}
.comment-figure {
    display: inline-block;
    vertical-align: middle;
}
.comment-view p {
    line-height: 1.5rem;
}
.comment-user-name {
    width: 12rem;
    font-size: 1rem;
    color: #27d5bf;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.comment-time {
    font-size: .7rem;
    color: #999;
}
.comment-praise {
    position: absolute;
    right: 0;
    top: 0;
    padding: .267rem .134rem;
    font-size: .8rem;
    color: #333;
}
.comment-praise i {
    display: inline-block;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAnCAYAAAB9qAq4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5OGZiZTcxMy1hMWUxLWI0NDUtYjYzYi0yOGRlNTg1MDE1YjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDc0QkRGNTJDNUQ5MTFFNjlDNURERDk0MEM1NjhGMzQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDc0QkRGNTFDNUQ5MTFFNjlDNURERDk0MEM1NjhGMzQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjUzMzNkYWY5LWJjMWUtMGQ0OS05ZTQ1LWQ3NzcwNTdjOTliMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5OGZiZTcxMy1hMWUxLWI0NDUtYjYzYi0yOGRlNTg1MDE1YjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7puoJJAAACvUlEQVR42syYbYhMURjH78xethViWYmEQhufSGOXhPKyRsm2pXzWpnwR7UitNcV+mklSStqIz3xbTGFTM4UvXtK2mw9kSe0qEXlZb/k/7X/s43TGzGx37z1P/Tpn7jn33v8855znPPfEMpmMF6A1gFOgDcwFw+Ai6AbfbDekUqn/PtAPUNwCcA8sVtfmg06wAWwDP6t9aDxAgWcpbhScBLvAebZtBgcm8tCgBE4De1g/AtLgJjgIrvL6/igFzlPT5bbRdonlag55JAL1c34YbXl1bVNUAueo+nej7QsYZH1ZVAKXK3HDlvY3LBdFJXAry0fgt6W96NXRKATOYGD2uHJtVl9ifoYi8BiYCX6ByyX6rGL5LGyBG8FR1i+A15Y+S5QHn4YpcD24zvj3iluazVrU/Htc7UsmshfXgQ7QBaaAj6AVfLD0la3vEOv3uV//Y9lsVv+UBTaCBOLvYooZ2Uwto33MshBWgC1gnxoyCR+7uXpt9tJIHioxSSh6wWEIHSp6UFKjM2AvmFrBQ+SfXpFsCbzzgjWfI5KAdxM+V2ABNJa5UVZpP7jB/fV5BS9LVviHta2jsxZKbulzLjXStRIy+oyhzasbH1b5soFyHSwJ6xN4Tpwmc6/V55wSOwdOG51nGR4My/pZzo7TlWK3PHesmeULHQe/OiQwyfJO3HPMMP8k+V3DnznnBHLniTED6nNR4E6WBazwT3HHhrcGxXadurnmwYTaRnMuCiwO7xCGd9BFgUntPacEmuHFOYFmeHFRYFKFl89OCWR42WH7MnTFg80qc8q5KLDFDC82gb5L4UULfM96U0Tzb6U3djRnPZkQr10D7eAErz3wxo9qp6u+a40MOwiTL7406yO2pFkEHufhz1Jv7AC8lPVMoiPlzKZdfw/rIX7L4e1Rwx2WyXfOXfnehrheW4c/AgwAcb+WfmfrolkAAAAASUVORK5CYII=') no-repeat;
    background-size: 1rem 1rem;
    width: 1.06rem;
    height: 1.04rem;
    vertical-align: middle;
    position: relative;
    top: -.16rem;
    margin-right: .26rem;
}
.comment-support-animate {
    position: absolute;
    right: .53rem;
    top: -.26rem;
    font-size: .53rem;
    color: #f66;
    visibility: hidden;
    opacity: 0;
}
.comment-content {
    word-break: break-all;
    margin-top: .63rem;
    font-size: .8rem;
}
.comment-hot-line {
    position: relative;
    border-top: 1px solid #e8e8e8;
    margin-top: 1.34rem;
    height: 1.34rem;
}
.comment-hot-line p {
    position: absolute;
    left: 50%;
    top: 0;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    font-size: .64rem;
    height: .64rem;
    line-height: .64rem;
    padding: 0 .267rem;
    color: #333;
    background-color: #fff;
}

.comment-hot-view{
    display:none;
}
.comment-list-loading {
    color: rgba(0,0,0,.5);
    font-size: .8rem;
    text-align: center;
    padding: .8rem 0;
    background-color: #fff;
}
.footer {
    font-size: .66rem;
    color: #727272;
    background: #252323;
    line-height: 2.2rem;
    text-align: center;
}
</style>