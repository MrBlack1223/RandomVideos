import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isRejected } from '@reduxjs/toolkit';
import { logout } from '../Redux/userSlice';
import axios from "axios"
import { useEffect, useState } from 'react';
const Searchbar = ({setDisplayLoginForm, setDisplayAddVideoButton})=>{

    const dispatch = useDispatch()

    const [searched,setSearched] = useState('')
    const [results,setResults] = useState()
    const navigate = useNavigate();


    const handleShowLogin = ()=>{
        setDisplayLoginForm(true)
    }
    const handleLogout = ()=>{
        dispatch(logout())
        axios.get('https://random-videos-api.onrender.com/user/test/logout')
    }

    const user = useSelector(state=> state.reducer.user.activeUser)

    useEffect(()=>{
        const fetchInfo = async ()=>{
            if(searched.length > 2){
                const res = await axios.get(`https://random-videos-api.onrender.com/video/search/search?search=${searched}`)
                const correct = res.data.splice(0,5)
                console.log(correct)
                setResults(correct) 
            }
            
        }
        fetchInfo()
    },[searched])

    return( 
        <div className="searchWrapper">
            <Link to = "/"><h1 className="clickable">{window.innerWidth > 800 ? 'Random Videos' : 'RV'}</h1></Link>
            <div>
                <form className='search' onSubmit={(e)=>{
                    e.preventDefault()
                    navigate(`/search?query=${searched}`)
                    setSearched('')
                    setResults('')
                    }}> 
                    <input className='textInput' placeholder='Search' onChange={(e)=>setSearched(e.target.value)} value = {searched}></input>
                    <div className='iconWrapper'>
                        <button className='searchVideoSubmitButton' type='submit'><SearchOutlinedIcon /></button>
                    </div> 
                </form>
                <div className = 'searchedResultsContainer'>
                    {results && results.map(title => <div key = {title._id} onClick = {()=>{
                        navigate(`/search?query=${title.title}`)
                        setSearched('')
                        setResults('')
                    }}
                    className='searchedResultItem'>
                    <SearchOutlinedIcon />
                    <p>{title.title}</p>
                    </div>)}
                </div>
            </div>
            <div className='searchbarBurronsContainer'>
                <button onClick = {()=>setDisplayAddVideoButton(true)} className='addVideoButton'><VideoCallIcon fontSize='large'/></button>
                {user.name ? <div className='userIcon'> {user.icon ? <img src = {`${user.icon}`} className='profileIcon'/> : <AccountCircleOutlinedIcon onClick = {handleLogout} style={{ fontSize: 60 }}/>} </div> 
                : <button className = 'loginButton' onClick = {handleShowLogin}> <AccountCircleOutlinedIcon /> Sign In</button>}
                {user.name ? <div class = 'logoutButton' onClick = {handleLogout}> <LogoutIcon fontSize='large' /> Logout </div>:''}
            </div>
        </div >  
    )
}
export default Searchbar