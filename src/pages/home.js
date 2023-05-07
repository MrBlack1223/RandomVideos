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
    const [isLoading, setIsLoading] = useState(false)
    const [isTrending, setIsTrending] = useState(false)

    useEffect(()=>{
        const fetchVideos = async ()=>{
            setIsLoading(true)
            const res= await axios.get(`https://random-videos-api.onrender.com/video${isTrending ? '/search/trending':''}`)
            setVideos(res.data)
            setIsLoading(false)
        }
        fetchVideos()
    },[isTrending])

    return (
    <div className="homeWrapper">
        <Navbar setIsTrending = {setIsTrending} setDisplayLoginForm = {setDisplayLoginForm}/>
        <Searchbar setDisplayLoginForm = {setDisplayLoginForm} setDisplayAddVideoButton = {setDisplayAddVideoButton}/>
        <Videopage loading = {isLoading} recommendation={false} videos = {videos}/>
        {showLoginFormButton && <LoginForm setDisplayLoginForm = {setDisplayLoginForm} />}
        {showAddVideoForm && <AddVideoForm setDisplayAddVideoButton = {setDisplayAddVideoButton}/>}
    </div>
    )
}
export default Home
