import { useEffect } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import FeedPostCard from "../components/FeedPostCard"


const Feed=({user})=>{
    
    return(
        <div className="flex-column feed-primary-layout">
            <FeedPostCard/>
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {user: state.userState.user}
}

export default connect(mapStateToProps)(Feed)