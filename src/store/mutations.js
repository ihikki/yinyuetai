import * as types from "./mutations-type"
const mutations ={
    [types.SET_VIDEOID](state,videoId) {
        state.videoId=videoId;
    },
    [types.SET_ARTISTS](state,artists){
        state.artists = artists;
    },
    [types.SET_CONTENT](state,content){
        state.content = content;
    },
    [types.SET_DURATION](state,duration){
        state.duration = duration;
    },
    [types.SET_ID](state,id){
        state.id = id;
    },
    [types.SET_PUBDATE](state,pubDate){
        state.pubDate = pubDate;
    },
    [types.SET_VIDEOURL](state,videoUrl){
        state.videoUrl = videoUrl;
    },
    [types.SET_VIDEOURL2](state,videoUrl2){
        state.videoUrl2 = videoUrl2;
    },
    [types.SET_VIDEOURL3](state,videoUrl3){
        state.videoUrl3 = videoUrl3;
    }
}
export default mutations