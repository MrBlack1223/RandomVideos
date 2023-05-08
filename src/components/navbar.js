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
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';

const Navbar = ({setSubscribed,setIsTrending,setDisplayLoginForm})=>{

    const user = useSelector(state => state.reducer.user.activeUser)

    const [showSubscribedChannels,setshowSubscribedChannels] = useState(false)

    const handleShowLogin = ()=>{
        setDisplayLoginForm(true)
    }

    return(
        <div className="navWrapper" >
            <Link to = "/" onClick = {()=>{ setIsTrending(false) 
                                            setSubscribed(false)
                                            }}
            ><span className="clickable"><HomeOutlinedIcon /> Home </span></Link>
            <Link to = {user.name ? '/settings' : `/`}><span className="clickable"><SettingsOutlinedIcon /> Settings</span></Link>
            <span className="clickable" onClick = {()=>{setIsTrending(true)
                                                        setSubscribed(false)}}><WhatshotIcon /> Trending</span>
            <span className="clickable" onClick = {()=>{setSubscribed(true)
                                                        setIsTrending(false)}}><SubscriptionsIcon/> Subscribed</span>
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