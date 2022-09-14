import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Picker from 'emoji-picker-react'
import {useState, React} from 'react'
const FeedPostCard =()=>{
    const [comment, setComment] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const onEmojiClick = (e, emojiObject) =>{
        setComment(prevComment => prevComment + emojiObject.emoji)
        console.log(comment)
    }

    return(
        <div className='flex-column post-card box-shadow'>
            <img src='/assets/static-logo.png' className='post-img'/>
            <div className="flex post-icons">
            <FontAwesomeIcon icon="fa-regular fa-heart" className='post-icon'/>
            <FontAwesomeIcon icon="fa-regular fa-comments" className='post-icon'/>
            </div>
            <div className='flex-column comments'>
                <div className='grid comment'>
                    <img src='/assets/static-logo.png' className='comment-profile-img'/>
                    <div className='comment-content-container'>
                        <h4 className='comment-content'>USERNAME</h4>
                        <p className='comment-content ff-sans-serif'>commment dtgjeoj  dfosdjge sdfjosdfg hnrogivkj fjdslkjeoinf dsfoisdhroefn dskfh;dotj odnhofdpfoi</p>
                    </div>
                </div>
            </div>

            <div className='comment-input-container flex'>
                <FontAwesomeIcon icon="fa-regular fa-face-smile-beam" className='comment-icon' onClick={()=>setIsOpen(!isOpen)}/>
                <input className='comment-input ff-acme' onChange={(e)=>setComment(e.target.value)} value={comment} placeholder='comment here...'/>
                <button className='ff-acme comment-btn'>POST</button>
            </div>
            {isOpen ? <div className='emoji-picker'><Picker onEmojiClick={onEmojiClick} /></div> : ''}
        </div>
    )
}

export default FeedPostCard