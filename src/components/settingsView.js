import { useDispatch, useSelector } from 'react-redux'
import CustomInput from './input'
import './settingsView.css'
import { useEffect, useState } from 'react'
import { storage } from "../firebase"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import axios from "axios"
import { loginSucces } from '../Redux/userSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SettingsView = ()=>{

    const inputs = [{
        id: 1,
        name: "name",
        type: "text",
        placeholder: "New Username",
        errorMessage:
          "Username should be 3-16 characters and shouldn't include any special character!",
        label: "New Username",
        pattern: "^[A-Za-z0-9]{3,16}$",
        required: true,
      },
      {
        id: 2,
        name: "email",
        type: "e-mail",
        placeholder: "New E-mail",
        errorMessage:
          "E-mail is incorrect",
        label: "New E-mail",
        required: true,
      }]
    const user = useSelector(state=> state.reducer.user.activeUser)
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({
        name: user.name,
        email:  user.email,
        icon: user.icon,
        banner: user.banner
    })
    const [img, setImg] = useState(null)
    const [banner, setBanner] = useState(null)
    const [imgProgress, setImgProgress] = useState(0)
    const handleChange = (e)=>{
        setUserData({
        ...userData,
        [e.target.name ]: e.target.value,
        })
    }
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
        msg === 'succes' ? toast.success('Settings changed',popupOpt) : toast.error('This name or e-mail is taken',popupOpt)
    }
    const uploadFile = async(file,fileType)=>{
        const name =  file.name
        const fileName = new Date().getTime() + name
        const fileRef = ref(storage, fileName)
        const uploadTask =  uploadBytesResumable(fileRef, file)
        uploadTask.on('state_changed', 
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setImgProgress(prev => progress)
              console.log('Upload is ' + progress + '% done');
            }, 
            (error) => {
              console.log("File is not valid")
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => { 
                    setUserData(prev=>{
                        return {...prev, [fileType] : downloadURL}
                    })
                });
            })
    }
    const handleUpdate = async (e)=>{
        e.preventDefault()
        const res = await axios.put(`https://random-videos-api.onrender.com/user/${user._id}`,userData)
        if(res.status === 200 && res.data.code === undefined){
            dispatch(loginSucces(res.data))
            popup('succes')
        }
        if(res.data.code === 11000){
            popup('failure')
        }
    }
    useEffect(()=>{
        img && uploadFile(img,'icon');
    },[img])
    useEffect(()=>{
        banner && uploadFile(banner,'banner');
    },[banner])

    return (
        <div className='settingsViewContainer'>
            <form className='settingsForm' onSubmit = {(e)=>{handleUpdate(e)}}>
                <span className='settingsTitle'>User Settings</span>
                <div className='settingsCurrentUserInfo'>
                    <img className='settingsUserIcon'src = {user.icon ? user.icon : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png'}></img>
                    <div className= 'settingsInfo'>
                        <div className='settingsUserName'>
                            <span className='settingsSpan'>Username:</span>
                            {user.name}
                        </div>
                        <div className='settingsUserEmail'>
                            <span className='settingsSpan'>E-mail:</span>
                            {user.email}
                        </div>
                    </div>
                </div>
                <div className='settingsInputs'>
                    <div className="settingsChangeIconWrapper">
                        <label htmlFor='img' className="settingsChangeIconLabel">Select new user icon: </label>
                        <input type='file' className="settingsChangeIcon" id='img' accept="image/*" onChange = {(e)=>setImg(e.target.files[0])}></input>
                        <label htmlFor='img' className="settingsChangeIconLabel">Select new channel banner: </label>
                        <input type='file' className="settingsChangeIcon" id='banner' accept="image/*" onChange = {(e)=>setBanner(e.target.files[0])}></input>
                    </div>
                    <div className='inputContainer'>
                        {inputs.map((input)=>{
                            return <CustomInput
                                    key = {input.id}
                                    {...input}
                                    value = {userData[input.name]}
                                    onChange = {handleChange}
                            />
                        })}
                    </div>
                </div>
                <button className = 'settingsSaveChangesButton' type='submit'>Save changes</button>
            </form>
            <ToastContainer />
        </div>
        
    )

}
export default SettingsView