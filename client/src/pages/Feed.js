import { useEffect } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {SetUser} from '../store/actions/UserActions'
import FeedPostCard from "../components/FeedPostCard"
import BASE_URL from '../globals'


const Feed=(props)=>{
    const {user}= props.userState
    const {setUser} = props

    const getUser = async()=>{
        const res = await axios.get(`${BASE_URL}/profile/${user.id}`)

        setUser(res.data)  
    }

    useEffect(()=>{
        getUser()
    })

    return(
        <div className="flex-column feed-primary-layout">
            <FeedPostCard/>
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {userState: state.userState}
}
const mapActionsToProps = (dispatch) => {
    return {setUser: (user) => dispatch(SetUser(user))}
}  

export default connect(mapStateToProps, mapActionsToProps)(Feed)