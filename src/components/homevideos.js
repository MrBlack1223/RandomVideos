
import LoadingPage from "../pages/loadingPage"
import VideoCard from "./videoCard"

const Videopage = ({loading,recommendation,videos})=>{


    return(
        <div className={ recommendation ? "recomendedVideoWeapper" :"videoWrapper" }>
            {loading && <LoadingPage/>}
            {videos && videos.map(video => <VideoCard key = { video._id !== undefined ? video._id : '0' } video = {video} recommendation = {recommendation}/>)}
        </div>
        
    )

}
export default Videopage