import axios from "axios"
import { useReducer } from "react"
import { useState } from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import BASE_URL from "../globals"
import { SetProfile } from "../store/actions/ProfileActions"
import {SetUser, RemoveId, SetFollowingIds} from "../store/actions/UserActions"


const FollowCard = ({follower, label, mainUser, profile, setUser, followingIds, removeId, setProfile, setFollowingIds})=>{
    const navigate = useNavigate()
    const [followed, setFollowed] = useState(label === 'Followers'? false : true)
    const user = label === "Followers" ? follower.user : follower.follow

    const goToProfile = ()=>{
        navigate(`/${user.username}`)
    }

    const followProfile = async() =>{
        const res = await axios.post(`${BASE_URL}/follow`,{
            user: mainUser.id,
            follow: user.id
        })

        let currentUser = mainUser
        currentUser.following.push({follow: res.data})
        setUser(currentUser)

        setFollowed(true)

        let currentFollowing = followingIds
        currentFollowing.push(res.data.id)
        setFollowingIds(currentFollowing)

        if(mainUser.id === profile.id){
            let currentProfile = profile
            currentProfile.following.push({follow: res.data})
            setProfile(currentProfile)
        }

    }

    const unfollowProfile = async() =>{
        const currentUser = mainUser
        currentUser.following.map((follow, i)=>{
            const result = follow.follow.id === user.id ? currentUser.following.splice(i,1): ''
        })  
        setUser(currentUser)
        removeId(user.id)
        setFollowed(false)

        const res = await axios.delete(`${BASE_URL}/unfollow/${mainUser.id}/${user.id}`)


    }
    return(
        <div className="flex follow-card">
            <div className="flex">
            <img src={user.image} className="follow-profile-img pointer" onClick={goToProfile}></img>
            <div className="flex-column follow-card-names">
            <h4 onClick={goToProfile} className='pointer'>{user.username}</h4>
            <h5 className='ff-sans-serif follow-name cursor-default'>{user.firstname} {user.lastname}</h5>
            </div></div>
           {mainUser.id === profile.id && label ==='Following' && followed ? <button className="ff-acme follow-button pointer" onClick={unfollowProfile}>unfollow</button> : followingIds.includes(user.id) || followed ? <button className="ff-acme follow-button pointer" onClick={unfollowProfile}>following</button> : user.id !== mainUser.id ? <button className="ff-acme follow-button pointer" onClick = {followProfile} >follow</button> : ''}
        </div>
    )
}

const mapStateToProps = (state) =>{
    return{
        mainUser: state.userState.user,
        profile: state.profileState.profile,
        followingIds: state.userState.followingIds
    }
}
const mapActionsToProps = (dispatch)=>{
    return{
        setUser: (user)=> dispatch(SetUser(user)),
        removeId: (id)=> dispatch(RemoveId(id)),
        setFollowingIds: (ids) => dispatch(SetFollowingIds(ids)),
        setProfile: (profile)=> dispatch(SetProfile(profile))
    }
}
export default connect(mapStateToProps, mapActionsToProps)(FollowCard)