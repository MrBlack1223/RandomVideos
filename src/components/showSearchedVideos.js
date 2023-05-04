import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import UserCard from "./userCard"
import VideoCard from "./videoCard"

const ShowSearchedVideo = ()=>{

    const [searchParams,setSearchParams] = useSearchParams()

    const query = searchParams.get('query')

    const [users, setUsers] = useState([]) 

    const [videos, setVideos] = useState([])
    useEffect(()=>{
        const feachSearchedVideos = async ()=>{
            const res = await axios.get(`/video/search/search?search=${query}`)
            const channelRes = await axios.get(`/user/search?search=${query}`)
            console.log(channelRes.data)
            setUsers(channelRes.data)
            setVideos(res.data)
        }
        feachSearchedVideos()
    },[query])

    return(
        <div className="searchVideoContainer">
            {videos && videos.map(video => <VideoCard key = { video._id }  video = {video} recommendation = {false} searched = {true}/>)}
            {users && users.map((user)=><UserCard key = { user._id } user = { user }/>)}
        </div>
        
    )

}
export default ShowSearchedVideo