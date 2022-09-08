import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
const FeedPostCard =()=>{
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
                <FontAwesomeIcon icon="fa-regular fa-face-smile-beam" className='comment-icon'/>
                <input type='text' placeholder='Add a comment...' className='comment-input ff-acme'/>
                <button className='ff-acme comment-btn'>POST</button>
            </div>
        </div>
    )
}

export default FeedPostCard