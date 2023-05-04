import Searchbar from "../components/searchbar"
import LoginForm from "../components/loginForm"

import { useState } from "react"
import AddVideoForm from "../components/addVideo"
import Navbar from "../components/navbar"
import ChannelView from "../components/channelView"

const Channel = ()=>{
    const [showChannelLoginFormButton,setChannelDisplayLoginForm] = useState(false)
    const [showChannelAddVideoForm, setDisplayAddVideoButton] = useState(false)
    return (
        <div>
            <Searchbar setDisplayLoginForm = {setChannelDisplayLoginForm} setDisplayAddVideoButton = {setDisplayAddVideoButton} />
            <Navbar setDisplayLoginForm = {setChannelDisplayLoginForm} />
            {showChannelLoginFormButton && <LoginForm setDisplayLoginForm = {setChannelDisplayLoginForm}/>}
            {showChannelAddVideoForm && <AddVideoForm setDisplayAddVideoButton = {setDisplayAddVideoButton}/>}
            <ChannelView />
        </div>
        
    )

}
export default Channel