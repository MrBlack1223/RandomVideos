import axios from "axios"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { format } from 'timeago.js';
const VideoCard = ({video,recommendation,searched,suggested})=>{

const [author,setAuthor] = useState()
const [authorIcon, setAuthorIcon] = useState()

useEffect(()=>{
    const fetchAuthor = async ()=>{
        if(video.authorID !== undefined){
           const res = await axios.get(`https://random-videos-api.onrender.com/user/${video.authorID}`)
            setAuthor(res.data.data.name)
            setAuthorIcon(res.data.data.icon) 
        }
    }
    fetchAuthor()
},[video.authorID])

const returnClassName = ()=>{
    if(recommendation){
        return "recomended"
    }
    if(searched){
        return "searched"
    }
    if(suggested){
        return "suggested"
    }
    return ""
}

return <Link to = {`/video/${video._id}`}><div className={returnClassName()+'Video'}>
        <img src = {video.photo ? video.photo : "https://cdn.pixabay.com/photo/2022/10/20/16/17/animal-7535234_960_720.jpg"} className = {returnClassName()+'Image'}></img>
        <div className={returnClassName()+"VideoInfoContainer"}>
            { (!recommendation && !searched && !suggested) && <img src = {authorIcon ? authorIcon :  'https://cdn.pixabay.com/photo/2022/10/20/16/17/animal-7535234_960_720.jpg'} className = "authorIcon"></img>}
            <div className = {returnClassName()+'Info'}>
                <h2 className={returnClassName()+'Title'}>{video.title} </h2>
                <h3 className={returnClassName()+'Author'}>
                    {searched && <img src = {authorIcon ? authorIcon :  'https://cdn.pixabay.com/photo/2022/10/20/16/17/animal-7535234_960_720.jpg'} className = "searchedAuthorIcon"></img>}
                    {!suggested ? author : ""}
                </h3>
                {video.createdAt ? `${format(video.createdAt)}`:''}
                <h3 className={returnClassName()+'Views'}>{!suggested ? video.views+" views" : ""}</h3>
            </div>
        </div>
</div></Link>
}
export default VideoCard