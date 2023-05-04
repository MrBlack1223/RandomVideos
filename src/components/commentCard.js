import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const CommentCard = ({comment})=>{

const [author,setAuthor] = useState("")
const [authorIcon, setAuthorIcon] = useState("")

useEffect(()=>{
    const fetchAuthor = async ()=>{
        if(comment.author !== undefined){
           const res = await axios.get(`https://random-videos-api.onrender.com/user/${comment.author}`)
            setAuthor(res.data.data.name)
            setAuthorIcon(res.data.data.icon) 
        }
    }
    fetchAuthor()
},[comment._id])

return < div  className='commentContainer'>
        <img src = {authorIcon ? authorIcon : "https://cdn.pixabay.com/photo/2022/10/22/17/17/blender-7539656_960_720.jpg"} className='authorIcon' alt="#"></img>
        <div className='commentInfoContainer'>
            <span className='commentAuthor'>{author ? author : 'Anonymous'}</span>
            <p className='commentText'>{comment.text}</p>
        </div> 
</div>
}
export default CommentCard