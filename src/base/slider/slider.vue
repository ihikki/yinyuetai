<template>
  <div class="slider" ref="slider">
      <div class="slider-group" ref="sliderGroup">
          <slot></slot>
      </div>
      <div class="dots">
          <span class="dot"><span class="current">{{currentPageIndex+1}}</span>/10</span>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
    data(){
        return{
            dots:[],
            currentPageIndex:0
        }
    },
    props:{
        loop:{
            type:Boolean,
            default:true
        },
        autoplay:{
            type:Boolean,
            default:true
        },
        interval:{
            type:Number,
            default:2000
        }
    },
    methods:{
        _setSliderWidth(resize){
            this.children=this.$refs.sliderGroup.children;
            let width =0;
            let sliderWidth=this.$refs.slider.clientWidth;
            console.log(this.children.length)
            for(let i=0;i<this.children.length;i++){
                let child =this.children[i];
                child.classList.add('slider-item');
                child.style.width=sliderWidth+"px";
                width +=sliderWidth;
            }
            if(!resize){
                this.dots=new Array(this.children.length)
            }
            if(this.loop&&!resize){
                width+=2*sliderWidth;
            }
            this.$refs.sliderGroup.style.width=width+"px";
        },
        _initSlider(){
            this.slider =new BScroll(this.$refs.slider,{
                scrollX:true,
                snap:{
                    loop:this.loop
                },
                momentum:false,
                click:true
            });
            this.slider.on('scrollStart',()=>{
                    clearTimeout(this.timer);
            })
            this.slider.on('scrollEnd',()=>{
                this.currentPageIndex=this.slider.getCurrentPage().pageX;
                if(this.autoplay){
                    clearTimeout(this.timer);
                    this._play();
                }
            })
        },
        _play(){
            clearTimeout(this.timer)
            this.timer=setTimeout(()=>{
                this.slider.next()
            },this.interval)
        }
    },
    mounted(){
        this._setSliderWidth();
        this._initSlider();
        if(this.autoplay){
            clearTimeout(this.timer)
            this._play()};
        window.addEventListener('resize',function(){
            if(!this.slider){
                return;
            }
            this._setSliderWidth(true);
            this.slider.refresh();
            console.log(222)
        })
    },
    destroyed(){
        clearTimeout(this.timer)
    }
}

</script>
<style scoped lang="stylus">
    @import "~@/common/stylus/variable"
    .slider
        min-height: 1px
        position: relative
        .slider-group
            position: relative
            overflow: hidden
            white-space: nowrap
            .slider-item
                float: left
                box-sizing: border-box
                overflow: hidden
                text-align: center
                position relative
                a
                    display: block
                    width: 100%
                    overflow: hidden
                    text-decoration: none
                img
                    display: block
                    width: 100%
                span
                    display block
                    color #fff
                    position: absolute
                    left 0
                    bottom 36px
                    background rgba(0,0,0,0.6)
                    padding 10px
        .dots
            position: absolute
            right: 0
            // left: 0
            bottom: 12px
            text-align: center
            font-size: 1.1rem
            .dot
                display: inline-block
                margin: 0 4px
                border-radius 5%
                line-height 1.5rem
                width: 4rem
                height: 1.5rem
                background:#222
                color:#fff
                .current
                    color:#27d5bf
</style>