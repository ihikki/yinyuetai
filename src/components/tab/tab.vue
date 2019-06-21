<template>
  <div class="tab">
      <ul class="tab-ul clearfix">
          <li class="tab-li">
              <router-link to="/index">
              <span>首页</span></router-link>
          </li>
          <li class="tab-li">
              <router-link to="/channel"> <span>频道</span></router-link>
          </li>
          <li class="tab-li">
              <router-link to="/vrank"><span>V榜</span></router-link>
          </li>
          <li class="tab-li">
              <router-link to="/vsong"><span>悦单</span></router-link>
          </li>
          <li class="tab-li">
              <router-link to="/allmv"><span>全部MV</span></router-link>
          </li>
      </ul>
  </div>
</template>

<script>
export default {

}

</script>
<style scoped lang="stylus">
    @import "~@/common/stylus/variable";
    @import "~@/common/stylus/mixin"
    .clearfix:after
        content: "."
        display: block
        clear: both
        visibility: hidden
        height: 0
        font-size:0
    .tab
        width 100%
        min-width:320px
        height 3.4rem
        background #fff
        position fixed
        top 3.4rem
        .tab-ul
            margin 0 auto
            width 92%
            height 100%
            display flex
            box-sizing border-box
            .tab-li
                text-align center
                float left
                width 20%
                span
                    display inline-block
                    margin 0 auto
                    font-size 1rem
                    height 96%
                    line-height 3.4rem
            .router-link-active
                span
                    border-bottom 0.1rem solid #27d5bf
</style>