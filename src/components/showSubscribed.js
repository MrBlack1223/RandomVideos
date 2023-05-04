import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const ShowSubscribed = ()=>{
    const user = useSelector(state=> state.reducer.user.activeUser)

    const [subscribed,setSubscribed] = useState([{}])

    useEffect(()=>{
        const feachSubscribedChannels = async ()=>{
            let subscribedArray = []
            for(let i = 0; i<user.subscribed.length; i++)
            {
                const res = await axios.get(`/user/${user.subscribed[i]}`)
                subscribedArray.push(res.data.data)
            }
            setSubscribed(subscribedArray)
        }
        feachSubscribedChannels()
    },[user.subscribed])

    return(
        <div >
            {subscribed && subscribed.map(sub => {
                return <div key = {sub._id !== undefined ? sub._id : '0'} ><Link to = {`/channel/${sub._id}`}>{sub.name}</Link> </div>
            })}
        </div>
        
    )

}
export default ShowSubscribed