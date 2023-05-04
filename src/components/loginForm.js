import axios from "axios"
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useState } from "react"
import { useDispatch } from "react-redux"
import { loginSucces } from "../Redux/userSlice"

const LoginForm = ({setDisplayLoginForm})=>{
    
    const [userData, setUserData] = useState({
        name:'',
        password:'',
        email: ''
    })
    const [error,setError] = useState(false)
    const [signIn, setSignIn] = useState(false)

    const dispatch = useDispatch()

    const showSignInScreen = ()=>{
        setSignIn(prev => !prev)
    }

    const handleLoginChange = (e)=>{
        setUserData({
            ...userData,
            name: e.target.value,
        })
        
    }

    const handlePasswordChange = (e)=>{
        setUserData({
            ...userData,
            password: e.target.value,
        })
    }
    const handleEmailChange = (e)=>{
        setUserData({
            ...userData,
            email: e.target.value,
        })
    }


    const handleClose = ()=>{
        setDisplayLoginForm(false)
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const data = signIn ? userData : {name:userData.name, password: userData.password}
        try{
            const res = await axios.post(`https://random-videos-api.onrender.com/user${signIn ? '' :'/login'}`,data, {
                withCredentials: true,
            });
            !signIn &&  dispatch(loginSucces(res.data))
            setDisplayLoginForm(false)
        }catch(e){
            setError(true)
        }
        setUserData({
            name:'',
            password: '',
            email: ''
        })
    }


    return(<div className="loginFormWrapper"><div className="loginFormContainer">
        <CloseOutlinedIcon  onClick = {handleClose} className="closeLoginForm"/>
        <span className="loginFormTitle">{signIn ? 'Create New Account': 'Login'}</span>
        <form className="loginForm" onSubmit={handleSubmit}>
            {signIn ? <input className="formInput" value = {userData.email} onChange = {handleEmailChange} placeholder="E-mail"></input> : ''}
            <input className="formInput" value = {userData.login} onChange = {handleLoginChange} placeholder={signIn ? "Name": "Login"}></input>
            <input className="formInput" value = {userData.password} onChange = {handlePasswordChange} placeholder="Password" type="password"></input>
            <button className="formSubmit" type="submit">{signIn ? 'Create New Account': 'Login'}</button>
        </form>
        {error ? <div className="loginErrorMessage"> {"Login went wrong"}</div> : ""}
        <span className="loginRedirection" onClick = {showSignInScreen}>or {signIn ? 'log in': 'sign in'}</span>
    </div>
    </div>)

}   
export default LoginForm