import axios from "axios"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const UserCard = ({user, channelView})=>{


return <Link to = {user && `/channel/${user._id}`}><div className="userCardContainer">
    <img className={channelView ? 'channelViewUserCardIcon' : 'userCardIcon'} src = {user.icon ? user.icon : 'https://cdn.pixabay.com/photo/2022/10/20/16/17/animal-7535234_960_720.jpg'}></img>
    <div className="userCardHelper">
        <span className="userCardName">{user && user.name}</span>
        <span className="userCardSubs">Subscribers {user && user.subscribers.length}</span>
    </div>
</div></Link>
}
export default UserCard