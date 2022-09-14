import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Picker from 'emoji-picker-react'
import { useEffect } from 'react'
import {useState, React} from 'react'
import {connect} from 'react-redux'
import SimpleImageSlider from "react-simple-image-slider";

const FeedPostCard =({follow, post, images})=>{
    const [comment, setComment] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const onEmojiClick = (e, emojiObject) =>{
        setComment(prevComment => prevComment + emojiObject.emoji)
        console.log(comment)
    }
    return(
        <div className='flex-column post-card fit-content box-shadow'>
                <div className='post-img'>
                    <SimpleImageSlider
                        width={350}
                        height={350}
                        images={images}
                        showBullets={true}
                        showNavs={true}
                        className='post-img'
                    />
                </div>
            <div className="flex post-icons">
            <FontAwesomeIcon icon="fa-regular fa-heart" className='post-icon'/>
            <FontAwesomeIcon icon="fa-regular fa-comments" className='post-icon'/>
            </div>
            <div className='flex-column comments'>
                <div className='grid comment'>
                    <img src={follow.follow.image} className='comment-profile-img'/>
                    <div className='comment-content-container'>
                        <h4 className='comment-content'>{follow.follow.username}</h4>
                        <p className='comment-content ff-sans-serif'>{post.caption}</p>
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

const mapStateToProps = (state)=>{
    return {user: state.userState.user}
}
export default connect(mapStateToProps)(FeedPostCard)