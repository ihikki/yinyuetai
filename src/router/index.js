import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
//1.定义路由组件
import VRank from "@/components/v-rank/v-rank";
import Channel from "@/components/channel/channel";
import Index from "@/components/index/index";
import Search from "@/components/search/search";
import VSong from "@/components/v-song/v-song";
import AllMv from "@/components/all-mv/all-mv";
import DPlayer from "@/components/dplayer/dplayer";
import ChannelCont from "@/components/channel/channelCont/channelCont"
//2.定义路由：每个路由应该映射一个组件
const routes=[
    {path:'/',redirect:'/index'},
    {path:'/index',component:Index},
    {path:'/vrank',component:VRank},
    {path:'/channel',component:Channel,
        children:[{
            path:":channelId",
            component:ChannelCont
        }]
    },
    {path:'/search',component:Search},
    {path:'/vsong',component:VSong},
    {path:'/allmv',component:AllMv},
    {path:'/dplayer',component:DPlayer}
]
//3.创建route实例，然后传“routes”配置
export default new VueRouter({
 routes
})