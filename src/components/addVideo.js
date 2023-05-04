import { UploadFile, UploadFileRounded } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { storage } from "../firebase"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import axios from "axios"

const AddVideoForm = ({setDisplayAddVideoButton})=>{

    const navigate = useNavigate()
    const [img, setImg] = useState(null)
    const [imgProgress, setImgProgress] = useState(0)
    const [video, setVideo] = useState(null)
    const [videoProgress, setVideoProgress] = useState(0)
    const [inputs, setInputs] = useState({})

    const uploadFile = async(file)=>{
        const name =  file.name
        const fileName = new Date().getTime() + name
        const fileRef = ref(storage, fileName)
        const uploadTask =  uploadBytesResumable(fileRef, file)
        uploadTask.on('state_changed', 
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              file.type === 'image/png' ? setImgProgress(prev => progress): setVideoProgress(prev => progress)
              console.log('Upload is ' + progress + '% done');
            }, 
            (error) => {
              console.log("File is not valid")
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    let fileType = file.type === 'image/png' ? 'photo':'videoURL' 
                    setInputs(prev=>{
                        return {...prev, [fileType] : downloadURL}
                    })
                });
            })
    }
    const handleInputs = (e)=>{
        if(e.target.name === 'tags'){
            const tags = e.target.value.split(',')
            setInputs(prev=>{
                return {...prev,[e.target.name] : tags}
            })
        }
        else{
            setInputs(prev=>{
            return {...prev,[e.target.name] : e.target.value}
            })
        }
    }

    const addVideo = async ()=>{
        const res = await axios.post('/video/add',inputs)
        res.status === 200 ? navigate(`/video/${res.data._id}`) : console.log('Wystąpił problem...')
        setInputs({})
    }

    useEffect(()=>{
        img && uploadFile(img);
    },[img])

    useEffect(()=>{
        video && uploadFile(video);
    },[video])

    return(
        <div className="addVideoFormWrapper">
            <div className="addVideoFormContainer">
                <button className = "addVideoFormCloseButton" onClick={()=>setDisplayAddVideoButton(false)}>X</button>
                <h1 className="addVideoFormTitle" > Add a video</h1>
                <div className="addVideoInputWrapper">
                    <label htmlFor='video'>Select a video: </label>
                    {videoProgress > 0 && <p>Uploading {videoProgress} %</p>}
                    <input type ='file' className="addVideoFormInput" id='video' accept="video/*" onChange = {(e)=>setVideo(e.target.files[0])} required placeholder={video && videoProgress}></input>
                </div>
                <input type = 'text' placeholder="Title" className="addVideoFormInput" onChange = {handleInputs} name = 'title' required></input>
                <textarea rows={8} placeholder='Description' className="addVideoFormTextarea" onChange = {handleInputs} name = 'desc' required></textarea>
                <input type='text' placeholder="separate tags with comma" className="addVideoFormInput" onChange = {handleInputs} name = 'tags' required></input>
                <div className="addVideoInputWrapper">
                    <label htmlFor='img'>Select a image: </label>
                    {imgProgress > 0 && <p>Uploading {imgProgress} %</p>}
                    <input type='file' className="addVideoFormInput" id='img' accept="image/*" onChange = {(e)=>setImg(e.target.files[0])} required></input>
                </div>
                <button type = 'submit' className="addVideoFormSubmitButton" onClick = {addVideo}>Add a video</button>
            </div>  
        </div> 
    )

}
export default AddVideoForm