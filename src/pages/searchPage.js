import Searchbar from "../components/searchbar"
import ShowSearchedVideo from "../components/showSearchedVideos"


import { useState } from "react"
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/navbar";
import LoginForm from "../components/loginForm";
import AddVideoForm from "../components/addVideo";

const SearchPage = ()=>{
    const [showSearchedLoginFormButton,setDisplayLoginForm] = useState(false)
    const [showSearchedAddVideoForm, setDisplayAddVideoButton] = useState(false)

    return (
        <div>
            <Navbar setDisplayLoginForm = {setDisplayLoginForm}/>
            <Searchbar  setDisplayLoginForm = {setDisplayLoginForm} setDisplayAddVideoButton = {setDisplayAddVideoButton}/>
            {showSearchedLoginFormButton && <LoginForm setDisplayLoginForm = {setDisplayLoginForm}/>}
            {showSearchedAddVideoForm && <AddVideoForm setDisplayAddVideoButton = {setDisplayAddVideoButton}/>}
            <ShowSearchedVideo/>
        </div>
        
    )

}
export default SearchPage