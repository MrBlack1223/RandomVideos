import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import Videopage from "./homevideos"
import UserCard from "./userCard"
import {fetchingChannelSucces} from '../Redux/channelSlice'
import SubscribeButton from "./subscribeButton"

const ChannelView = ()=>{

    const path = useLocation().pathname.split('/')[2]
    const [videos,setVideos] = useState([""])
    const dispatch = useDispatch()

    const currentChannel = useSelector( state => state.reducer.channel.activeChannel)

    useEffect(()=>{
        const searchInfo = async ()=>{
            const videosRes = await axios.get(`/video/subscribed/${path}`)
            const channelRes = await axios.get(`/user/${path}`)
            dispatch(fetchingChannelSucces(channelRes.data.data))
            setVideos(videosRes.data)
        }
        searchInfo()
    },[path])

    return<div className="channelViewContainer">
        <div className="channelViewInfoContainer">
            {currentChannel.banner && <img className="channelViewBanner" src = {currentChannel.banner}></img>}
            <div className="userCardAndSubbButtonContainer">{currentChannel.name && <UserCard user = {currentChannel} channelView = {true}/>} <SubscribeButton /></div>
           <div className="horizontalLine"></div>
        </div>
        
        <Videopage recommendation={false} videos = {videos} />
    </div>

}   
export default ChannelView