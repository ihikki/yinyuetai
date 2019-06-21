<template>
  <div>
      <!-- <slider class="slider-wrapper clearfix"
         v-if="banners.length"
         :loop="true"
         :autoplay="true">
            <div v-for="item in banners">
              <a :href="item.url">
              <img :src="item.mobileImg" alt="">
              <span v-html="item.title"></span>
              </a>
            </div>
      </slider> -->
  </div>
</template>

<script>
import slider from '@/base/slider/slider'
export default {
  data(){
    return {
      // channelReqUrl:{
      //   8:Hanguo,
      //   9:Ooumei,
      //   10:hua,
      //   11:ri,
      //   12:fensi
      
      // }
    }
  },
  components:{
    slider
  }
}

</script>
<style>
</style>