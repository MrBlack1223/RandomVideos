import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import VideoCard from './videoCard';
import ShowSubscribed from './showSubscribed';


const Navbar = ({setIsTrending,setDisplayLoginForm})=>{

    const user = useSelector(state => state.reducer.user.activeUser)

    const [showSubscribedChannels,setshowSubscribedChannels] = useState(false)

    const handleShowLogin = ()=>{
        setDisplayLoginForm(true)
    }

    return(
        <div className="navWrapper" >
            <Link to = "/" onClick = {()=>setIsTrending(false)}><span className="clickable"><HomeOutlinedIcon /> Home </span></Link>
            <span className="clickable"><SettingsOutlinedIcon /> Settings</span>
            <span className="clickable" onClick = {()=>{setIsTrending(true)}}><WhatshotIcon /> Trending</span>
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
        </div>
        
    )
}
export default Navbar