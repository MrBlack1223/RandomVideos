import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import VideoCard from './videoCard';
import ShowSubscribed from './showSubscribed';


const Navbar = ({setDisplayLoginForm})=>{

    const user = useSelector(state => state.reducer.user.activeUser)

    const [trendingVideo,setTrendingVideo] = useState();
    const [showTrendingVideo,setShowTrendingVideo] = useState(false)
    const [showSubscribedChannels,setshowSubscribedChannels] = useState(false)

    const handleShowLogin = ()=>{
        setDisplayLoginForm(true)
    }
    useEffect(()=>{
        const feachTrendingVideos = async ()=>{
            const res = await axios.get(`/video/search/trending`)
            setTrendingVideo(res.data)
        }
        feachTrendingVideos()
    },[])

    return(
        <div className="navWrapper" >
            <Link to = "/"><span className="clickable"><HomeOutlinedIcon /> Home </span></Link>
            <span className="clickable"><SettingsOutlinedIcon /> Settings</span>
            <div className="horizontalLine"></div>
            {
                user.name ? 
                <span className = 'showSubscribedContainer clickable' >
                    <span onClick = {()=>setshowSubscribedChannels(prev => !prev)}> Subscribed {showSubscribedChannels ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />} </span>
                    {showSubscribedChannels && <ShowSubscribed />}
                </span>
                : 
                <button className = 'loginButton' onClick = {handleShowLogin}> <AccountCircleOutlinedIcon /> Sign In</button>
            }
            <div className="horizontalLine"></div>
            <span className='suggestedVideoContainer'>
                <span className='displayTrendingVideos clickable' onClick = {()=>{setShowTrendingVideo(prev => !prev)}}>
                    Trending Videos {showTrendingVideo ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                </span> 
                {(trendingVideo && showTrendingVideo) && trendingVideo.map(video => <VideoCard key = { video._id } video = {video} recommendation={false} searched={false} suggested={true} />)}
            </span>
            
        </div>
        
    )
}
export default Navbar