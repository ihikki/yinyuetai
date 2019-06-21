<template>
  <div class="t-header">
    <div class="content">
        <div class="logo-icon fl">
           <a href="#" class="logolink">音悦taiLogo</a>
        </div>
        <div class="login fr">
            <div class="fl">
                <a href="javascript:;">登录</a>
            </div>
        </div>
        <div class="search-icon">
            <router-link to="/search"></router-link>
        </div>
    </div>
  </div>
</template>

<script>
export default {

}

</script>
<style scoped lang="stylus">
    @import "~@/common/stylus/variable";
    @import "~@/common/stylus/mixin"
.fl
    float: left;
.fr
    float:right;
.t-header
    width: 100%;
    min-width:320px
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    z-index: 2000;
    .content
        height: 3.4rem;
        width: 100%;
        box-sizing:border-box
        margin: 0 auto;
        padding: 0 4%;
        .logo-icon
            position: relative;
            z-index: 100;
            .logolink
                display: block;
                height: 1.8rem;
                margin-top: 0.8rem;
                text-indent: -999em;
                width: 4rem;
                bg-image('logo');
                background-size: 4rem 1.8rem;
        .search-icon
            position: relative;
            margin-right: 0.586rem;
            float: right;
            z-index: 102;
            margin-top: 0.6rem;
            padding: 6px;
            text-align: center;
            a
                display: block;
                background: url(./search.png) no-repeat;
                background-size: 1.4rem 1.4rem;
                width: 1.4rem;
                height: 1.4rem;
                font-size: 0.6rem;
        .login
            line-height: 3.4rem
            font-size :1rem
</style>