import { useState, useEffect} from "react"
import Videopage from "../components/homevideos"
import LoginForm from "../components/loginForm"
import Navbar from "../components/navbar"
import Searchbar from "../components/searchbar"
import axios from "axios"

import "./home.css"
import AddVideoForm from "../components/addVideo"


const Home = ()=>{
    const [videos,setVideos] = useState()
    const [showLoginFormButton,setDisplayLoginForm] = useState(false)
    const [showAddVideoForm, setDisplayAddVideoButton] = useState(false)

    useEffect(()=>{
        const fetchVideos = async ()=>{
            const res= await axios.get('https://random-videos-api.onrender.com/video')
            setVideos(res.data)
        }
        fetchVideos()
    },[])

    return (
    <div className="homeWrapper">
        <Navbar setDisplayLoginForm = {setDisplayLoginForm}/>
        <Searchbar setDisplayLoginForm = {setDisplayLoginForm} setDisplayAddVideoButton = {setDisplayAddVideoButton}/>
        <Videopage recommendation={false} videos = {videos}/>
        {showLoginFormButton && <LoginForm setDisplayLoginForm = {setDisplayLoginForm} />}
        {showAddVideoForm && <AddVideoForm setDisplayAddVideoButton = {setDisplayAddVideoButton}/>}
    </div>
    )
}
export default Home
