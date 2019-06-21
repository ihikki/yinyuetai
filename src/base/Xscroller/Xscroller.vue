<template>
 <ul class="Xscroll" ref="slider">
        <slot></slot>
 </ul>
</template>

<script>
import BScroll from 'better-scroll';
export default {  
  data () {
    return {
    }
  },
methods:{
    _initSlider(){
         this.slider =new BScroll(this.$refs.slider,{
                scrollX:true,
                momentum:false,
                click:true
            });
    }
},
mounted(){
    this._initSlider()
}
}

</script>
<style scoped lang="stylus">
    @import "~@/common/stylus/variable"
    .Xscroll
        position:relative
        width:100%
        overflow:hidden
</style>
