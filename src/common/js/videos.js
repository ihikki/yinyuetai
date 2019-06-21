class VideoS{
    constructor({
        id,videoId,artists,title,subTitle,image
    }){
        this.id=id;
        this.videoId=videoId;
        this.artists=artists;
        this.title=title;
        this.subTitle =subTitle;
        this.image=image;
    }
}
function filterArtist(artists){
    let ret =[];
    if(!artists){
        return ""
    }
    artists.forEach(s=>{
        ret.push(s.artistName)
    })
    return ret.join("-");
}

export default function createVideoS(videoData){
    return new VideoS({
        id:videoData.id,
        videoId:videoData.videoId,
        artists:filterArtist(videoData.artists),
        title:videoData.title,
        subTitle:videoData.subTitle,
        image:videoData.image
    })
}