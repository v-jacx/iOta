import { useCallback, useState } from "react"
import {useDropzone} from "react-dropzone"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {connect} from 'react-redux'
import BASE_URL from '../globals'
import axios from "axios"

const PostCard = ({setIsOpen, user}) =>{
  const [images, setImages]= useState()
  const [previewImage, setPreviewImage]=useState()
  const [final, setFinal] = useState(false)
  const [caption, setCaption] = useState('')
    const onDrop = useCallback( async acceptedFiles => {
        setImages(acceptedFiles)
        const file = acceptedFiles[0]
        const base64 = await convertToBase64(file);
        setPreviewImage(base64)
      }, [])

      const convertToBase64 = (file) =>{
        return new Promise((resolve, reject)=>{
          const fileReader = new FileReader()
          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            resolve(fileReader.result)
          }
          fileReader.onerror = (error) =>{
            reject(error)
          }})}
      
      const createPost = async() =>{
        const formData = {
          images: images,
          caption: caption 
        }

        const res = await axios.post(`${BASE_URL}/post/${user.id}`, formData,{
          headers: {
            'content-type':'multipart/form-data',
          }
        })
        setIsOpen(false)
        console.log(res)
      }

      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
      return (
        <div className='overlay post-card-overlay' onClick={()=> setIsOpen(false)}>
        <div className='flex-column post-card create-post-card' onClick={(e)=> e.stopPropagation()}>
     {previewImage && !final ?  <div className='preview-header flex'> <FontAwesomeIcon icon="fa-solid fa-arrow-left" className='dropzone-arrow pointer' onClick={()=>setPreviewImage(null)}/><div className="dropzone-img-text">preview Images</div><button className="dropzone-btn ff-acme pointer" onClick={()=> setFinal(true)}>Next</button></div> : ! final ? <div className='post-card-header flex'>
        <div className='post-header-label'>iOta Post</div>
        <FontAwesomeIcon icon="fa-solid fa-xmark" className="post-close pointer" onClick={()=> setIsOpen(false)}/></div> : <div className='flex preview-header'> <FontAwesomeIcon icon="fa-solid fa-arrow-left" className='dropzone-arrow pointer' onClick={()=>setFinal(false)}/><div>iOta Post</div><FontAwesomeIcon icon="fa-solid fa-xmark" className="post-close pointer" onClick={()=> setIsOpen(false)}/></div>}
        {
            final ? <div className="flex-column final-post-display"><div className='final-preview' ><img src={previewImage} className='final-preview final-preview-img' /></div><div className="post-caption flex-column"><div className="flex dropzone-caption-label"><img src={user.image} className="dropzone-profile-img"/><h4>{user.username}</h4><button className='dropzone-btn dropzone-share pointer' onClick={createPost}>share</button></div><span role='textbox'  className="dropzone-input" onInput={(e)=>setCaption(e.target.textContent)} contentEditable/></div></div>:''
          }{ !final ?
        <div {...getRootProps()} className='dropzone'>
          <input {...getInputProps()} />
          {
            isDragActive ?
              "" : previewImage && !final ? <div><img src={previewImage} className='dropzone'/></div> : !final ?
              <div><FontAwesomeIcon icon="fa-regular fa-images" className='dropzone-icon'/>
                <div className="flex-column dropzone-text"><p>Drag 'n' drop images here,</p><p className="dropzone-text">or click to select from computer</p></div> </div> : ''
          }
        </div>:''}
        </div></div>
      )
}

const mapStateToProps =(state)=>{
  return{
    user: state.userState.user
  }
}

export default connect(mapStateToProps)(PostCard)