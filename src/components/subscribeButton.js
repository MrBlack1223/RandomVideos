import axios from "axios"
import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import {subscribe, unsubscribe} from '../Redux/channelSlice'
import {subscribeChannel , unsubscribeChannel } from '../Redux/userSlice';

const SubscribeButton = ()=>{

const user = useSelector(state=> state.reducer.user.activeUser)
const currentChannel = useSelector( state => state.reducer.channel.activeChannel)

const [isSubButtonDisabled,setIsSubButtonDisabled] = useState(false)

const dispatch = useDispatch()

const handleSubscribeButton = async(event)=>{
    setIsSubButtonDisabled(true)
    const target = event.currentTarget
    if(!currentChannel.subscribers.includes(user._id)){
        try {
            await axios.put(`https://random-videos-api.onrender.com/user/subs/add/${currentChannel._id}`)
            dispatch(subscribe(user._id))  
            dispatch(subscribeChannel(currentChannel._id))
            target.classList.add('subscribed');
        } catch (error) {
            console.log(error)
            setIsSubButtonDisabled(false)
            return -1
        }
        
    }else{
        try {
            await axios.put(`https://random-videos-api.onrender.com/user/subs/delete/${currentChannel._id}`)
            dispatch(unsubscribe(user._id))
            dispatch(unsubscribeChannel(currentChannel._id))
            target.classList.remove('subscribed');
        } catch (error) {
            console.log(error)
            setIsSubButtonDisabled(false)
            return -1
        }
    }
    setIsSubButtonDisabled(false)
}

return <button
    disabled = {isSubButtonDisabled}
    onClick =  {handleSubscribeButton} 
    className = {currentChannel && currentChannel.subscribers.includes(user._id) ? 'subscribed subscribeButton' : 'subscribeButton'} >
    {currentChannel && currentChannel.subscribers.includes(user._id) ? 'Unsubscribe' : 'Subscribe' }
</button>
}
export default SubscribeButton