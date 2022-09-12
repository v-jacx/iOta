import { useCallback } from "react"
import {useDropzone} from "react-dropzone"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
const PostCard = ({setIsOpen}) =>{
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
      }, [])
      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
      return (
        <div className='overlay post-card-overlay' onClick={()=> setIsOpen(false)}>
        <div className='flex-column post-card create-post-card'>
        <div className='post-card-header flex'>
        <div>iOta Post</div>
        <div className="post-close pointer" onClick={()=> setIsOpen(false)}>X</div></div>
        <div {...getRootProps()} className='dropzone'>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
             <div><FontAwesomeIcon icon="fa-regular fa-images" className='dropzone-icon'/>
               <div className="flex-column dropzone-text"><p>Drag 'n' drop images here,</p><p className="dropzone-text">or click to select from computer</p></div> </div>
          }
        </div>
        </div></div>
      )
}

export default PostCard