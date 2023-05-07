
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Videopage from './homevideos';
import { useState , useEffect} from 'react';
import Comments from './comments';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSucces,like,dislike,startFetch } from '../Redux/videoSlice';
import {startFetchingChannel, fetchingChannelSucces} from '../Redux/channelSlice'
import SubscribeButton from './subscribeButton';

const View = ()=>{

    const [hide,setHide] = useState(true)
    const [videos,setVideos] = useState()
    const [comments,setComments] = useState([{}])
    

    const path = useLocation().pathname.split('/')[2]
    
    const user = useSelector(state=> state.reducer.user.activeUser)
    const currentVideo = useSelector(state => state.reducer.video.activeVideo)
    const currentChannel = useSelector( state => state.reducer.channel.activeChannel)

    const dispatch = useDispatch()

    const handleHideButton = ()=>{
        hide ? setHide(false) : setHide(true)
    }

    const handleLike = async()=>{
        await axios.put(`https://random-videos-api.onrender.com/video/like/${currentVideo._id}`,{withCredentials: true})
        dispatch(like(user._id))
    }
    const handleDislike = async()=>{
        await axios.put(`https://random-videos-api.onrender.com/video/dislike/${currentVideo._id}`,{withCredentials: true})
        dispatch(dislike(user._id))
    }


    useEffect(()=>{
        const fetchInfo = async ()=>{
            dispatch(startFetchingChannel())
            dispatch(startFetch())
            const videosRes= await axios.get('https://random-videos-api.onrender.com/video')
            const currentVideoRes = await axios.get(`https://random-videos-api.onrender.com/video/${path}`)
            const currentChannelRes = await axios.get(`https://random-videos-api.onrender.com/user/${currentVideoRes.data.authorID}`)
            const commentsRes = await axios.get(`https://random-videos-api.onrender.com/comments/${path}`)
            setComments(commentsRes.data)
            dispatch(fetchSucces(currentVideoRes.data))
            dispatch(fetchingChannelSucces(currentChannelRes.data.data))
            setVideos(videosRes.data)
        }
        fetchInfo()
    },[path,dispatch])

    return(
         <div className="container">
              {(currentChannel && currentVideo) &&<div className="content">
                <iframe 
                    className='videoPlayer'
                    width="1300" 
                    height="700"
                    src={currentVideo.videoURL ? currentVideo.videoURL : "//www.youtube.com/embed/jofNR_WkoCE" }
                    title = "video"
                    allowFullScreen
                ></iframe>
                <div className="title">{`${currentVideo.title}`}</div>
                <div className="details"> {`${currentVideo.views + 1}`} views
                    <div className='buttons'>
                        {currentVideo.likes.includes(user._id) ? <ThumbUpIcon />  :<ThumbUpOutlinedIcon onClick={handleLike} />} {currentVideo.likes.length - 1}
                        {currentVideo.dislikes.includes(user._id) ?  <ThumbDownIcon /> : <ThumbDownAltOutlinedIcon onClick={handleDislike} />} {currentVideo.dislikes.length - 1}
                        <ReplyOutlinedIcon /> Share
                    </div>
                </div>
                <div className='horizontalLine'></div>
                <div className='videoDescContainer'>
                    <div className = "videoDescAuthorInfo">
                        <div className='channelInfo'>
                            <img alt = ''src = {currentChannel.icon ? currentChannel.icon : 'https://cdn.pixabay.com/photo/2022/10/20/16/17/animal-7535234_960_720.jpg'} className='authorIcon'></img>
                            <div className = "authorSubsWrapper">
                                <Link to = {`/channel/${currentChannel._id}`}><span className='author'>{`${currentChannel.name }`}</span></Link>
                                <span className='subs'>{`${currentChannel.subscribers.length}`} subscribers</span>
                            </div>
                        </div>
                        <SubscribeButton />
                    </div>
                    <div className = {hide ? "hiddenVideoDesc" : "fullVideoDesc"}>
                        {currentVideo.createdAt && `${currentVideo.createdAt}`}
                        {currentVideo.desc}
                    </div>
                </div>
                <div className='horizontalLine'><button onClick = {handleHideButton} className="hideButton">{hide ? "Show more": "Show less"}</button></div>
                {comments && <Comments commentsArray={comments}/>}
            </div>}
            <div className="recommendations"><Videopage  recommendation={true} videos = {videos}/></div>
        </div>
    )

}
export default View