<template>
  <div ref="wrapper">
      <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    data(){
        return {

        }
    },
    props:{
        click:{
            type:Boolean,
            default:true
        },
        data:{
            type:Array,
            default:null
        },
        listenScroll:{
            type:Boolean,
            default:false
        },
        probeType:{
            type:Number,
            default:3
        },
        pullUpLoad: {
            type:Boolean,
            default:false
        },
    },
methods:{
    _initScroll(){
        this.scroll =new BScroll(this.$refs.wrapper,{
        click:this.click,//滚动中的点击事件是否发生，默认true
        probeType:this.probeType,
        bounce: false,
        momentum:true,
        pullUpLoad:this.pullUpLoad
        })
        if(this.listenScroll){
            this.scroll.on('scroll',(pos)=>{
                this.$emit('scroll',pos)
            })
        }
        if(this.pullUpLoad){
            this.scroll.on('pullingUp',()=>{
                this.$emit('pullingUp')
            })
        }
    },
    scrollTo(){
        this.scroll&&this.scroll.scrollTo.apply(this.scroll,arguments)
    },
    scrollToElement(){
        this.scroll&&this.scroll.scrollToElement.apply(this.scroll,arguments)
    }
},
mounted(){
    this._initScroll()
},
watch:{
    data(){
        this.$nextTick(()=>{
            this.scroll.refresh()
        })
    }
}
}

</script>
<style>
</style>