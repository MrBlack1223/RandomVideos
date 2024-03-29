import axios from "axios"
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useState } from "react"
import { useDispatch } from "react-redux"
import { loginSucces } from "../Redux/userSlice"
import CustomInput from "./input.js";
import './loginForm.css'
import { ToastContainer, toast } from "react-toastify";


const LoginForm = ({setDisplayLoginForm})=>{
    const [userData, setUserData] = useState({
        name:'',
        password:'',
        email: ''
    })
    const [signIn, setSignIn] = useState(false)
    const inputs = !signIn ? [{
        id: 1,
        name: "name",
        type: "text",
        placeholder: "Username",
        errorMessage:
          "Username should be 3-16 characters and shouldn't include any special character!",
        label: "Username",
        pattern: "^[A-Za-z0-9]{3,16}$",
        required: true,
      },
      {
        id: 2,
        name: "password",
        type: "password",
        placeholder: "Password",
        errorMessage:
          "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
        label: "Password",
        pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
        required: true,
      }]:
      [
        {
          id: 1,
          name: "email",
          type: "email",
          placeholder: "E-mail",
          errorMessage: "E-mail incorrect",
          label: "E-mail",
          required: true,
        },
        {
          id: 2,
          name: "name",
          type: "text",
          placeholder: "Username",
          errorMessage:
            "Username should be 3-16 characters and shouldn't include any special character!",
          label: "Username",
          pattern: "^[A-Za-z0-9]{3,16}$",
          required: true,
        },
        {
          id: 3,
          name: "password",
          type: "password",
          placeholder: "Password",
          errorMessage:
            "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
          label: "Password",
          pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
          required: true,
        },

      ]

    axios.defaults.withCredentials = true
    
    const popup =(msg)=>{
      const popupOpt = {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
      };
      msg === 'failure2' ? toast.success('Try other credentials',popupOpt) : toast.error('Wrong credentials',popupOpt)
    }
    const dispatch = useDispatch()

    const showSignInScreen = ()=>{
        setSignIn(prev => !prev)
    }

    const handleChange = (e)=>{
        setUserData({
            ...userData,
            [e.target.name ]: e.target.value,
        })
        
    }
    const handleClose = ()=>{
        setDisplayLoginForm(false)
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const data = signIn ? userData : {name:userData.name, password: userData.password}
        try{
            const res = await axios.post(`https://random-videos-api.onrender.com/user${signIn ? '' :'/login'}`,data, {withCredentials: true});
            !signIn &&  dispatch(loginSucces(res.data))
            if(res.data.message === 'Something went wrong') popup('failure2')
            if(res.data.message !== 'Something went wrong') setDisplayLoginForm(false)
        }catch(e){
            popup('failure')
        }
        setUserData({
            name:'',
            password: '',
            email: ''
        })
    }


    return(<div className="loginFormWrapper">
        <div className="loginFormContainer">
            <CloseOutlinedIcon  onClick = {handleClose} className="closeLoginForm"/>
            <span className="loginFormTitle">{signIn ? 'Create New Account': 'Login'}</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                {inputs.map((input)=>{
                    return <CustomInput
                            signIn = {signIn}
                            key = {input.id}
                            {...input}
                            value = {userData[input.name]}
                            onChange = {handleChange}/>
                })}
                <button className="formSubmit" type="submit">{signIn ? 'Create New Account': 'Login'}</button>
            </form>
            <span className="loginRedirection" onClick = {showSignInScreen}>or {signIn ? 'log in': 'sign in'}</span>
        </div>
        <ToastContainer />
    </div>)

}   
export default LoginForm