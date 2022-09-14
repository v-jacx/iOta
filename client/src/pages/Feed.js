import { useEffect } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import FeedPostCard from "../components/FeedPostCard"
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory'


const Feed=({user})=>{
    console.log(user)
    return user && user.following ? (
        <div className="flex-column feed-primary-layout">
            {user.following.map((follow)=>(
               follow.follow.posts.length !==0 ? follow.follow.posts.map((post)=>(
               <FeedPostCard follow={follow} post={post} images={post.images.map((image)=> image.photo)}/> 
               )) : ''
            ))}
            
        </div>
    ): ''
}

const mapStateToProps = (state)=>{
    return {user: state.userState.user}
}

export default connect(mapStateToProps)(Feed)