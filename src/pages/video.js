import Searchbar from "../components/searchbar"
import View from "../components/videoView"
import LoginForm from "../components/loginForm"

import { useState } from "react"
import AddVideoForm from "../components/addVideo"

const Video = ()=>{
    const [showVideoLoginFormButton,setVideoDisplayLoginForm] = useState(false)
    const [showVideoAddVideoForm, setDisplayAddVideoButton] = useState(false)

    return (
        <div>
            <Searchbar setDisplayLoginForm = {setVideoDisplayLoginForm} setDisplayAddVideoButton = {setDisplayAddVideoButton} />
            {showVideoLoginFormButton && <LoginForm setDisplayLoginForm = {setVideoDisplayLoginForm}/>}
            {showVideoAddVideoForm && <AddVideoForm setDisplayAddVideoButton = {setDisplayAddVideoButton}/>}
            <View />
        </div>
        
    )

}
export default Video