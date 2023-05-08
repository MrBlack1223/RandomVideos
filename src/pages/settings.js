import { useState } from 'react'
import './settings.css'
import Searchbar from '../components/searchbar'
import Videopage from '../components/homevideos'
import LoginForm from '../components/loginForm'
import AddVideoForm from '../components/addVideo'
import SettingsView from '../components/settingsView'

const Settings = ()=>{
    const [showLoginFormButton,setDisplayLoginForm] = useState(false)
    const [showAddVideoForm, setDisplayAddVideoButton] = useState(false)
    return (
        <div className="settingsContainer">
            <Searchbar setDisplayLoginForm = {setDisplayLoginForm} setDisplayAddVideoButton = {setDisplayAddVideoButton}/>
            <SettingsView/>
            {showLoginFormButton && <LoginForm setDisplayLoginForm = {setDisplayLoginForm} />}
            {showAddVideoForm && <AddVideoForm setDisplayAddVideoButton = {setDisplayAddVideoButton}/>}
        </div>
        
    )

}
export default Settings