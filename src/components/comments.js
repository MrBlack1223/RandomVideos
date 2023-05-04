import { useEffect, useState } from 'react';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CommentCard from './commentCard';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
const Comments = ({commentsArray})=>{

    const [text,setText] = useState('')
    const path = useLocation().pathname.split('/')[2]

    const handleAddComment = async(e)=>{
        e.preventDefault()
        const res = await axios.post('/comments',{
            videoID : path,
            text: text,
        },{withCredentials:true})
        commentsArray.unshift(res.data)
        setText('')
    }

    return(
        <div className="commentsContainer">
            <form onSubmit = {handleAddComment} className='addCommentContainer'>
                <div className='addComments'>
                    <div className='iconWrapper'>
                        <AccountCircleOutlinedIcon />
                    </div> 
                    <div className='textInputWrapper'>
                        <input className='textInput' placeholder='Add a comment...' value = {text} onChange={(e)=>setText(e.target.value)}></input> 
                        <div className='horizontalLineComment'></div>
                    </div>
                    <button type='submit' className='iconWrapper' >
                        <SendOutlinedIcon />
                    </button>
                </div>
            </form>
            {commentsArray && commentsArray.map(comment => <CommentCard key={comment._id !== undefined ? comment._id : '0'} comment = {comment}/>)}
        </div>
    )
}
export default Comments