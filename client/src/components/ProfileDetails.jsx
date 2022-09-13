import axios from 'axios'
import { useEffect, useState} from 'react'
import {connect} from 'react-redux'
import { useParams, Outlet, useNavigate} from 'react-router-dom'
import BASE_URL from '../globals'
import { SetProfile} from '../store/actions/ProfileActions'
import {SetFollowingIds, SetUser, RemoveId} from '../store/actions/UserActions'


const ProfileDetails = ({user, setProfile, profile, setUser, followingIds, setFollowingIds, removeId})=>{
        const {username} = useParams()
        const navigate = useNavigate()
        const [followed, setFollowed] = useState(false)


        const getProfile = async()=>{
            const res = await axios.get(`${BASE_URL}/profile/${username}`)
            setProfile(res.data)
            setFollowed(false)
        }

        const handleClick = (e) =>{
            e.target.id === 'followers' ? navigate(`/${username}/Followers`) :  navigate(`/${username}/Following`)
        }

        const followProfile = async() =>{
            const res = await axios.post(`${BASE_URL}/follow`, {
                user: user.id,
                follow: profile.id
            })

            let currentUser = user
            currentUser.following.push({follow: res.data})
            setUser(currentUser)

            let currentProfile = profile
            currentProfile.followers.push(({user: user}))
            setProfile(currentProfile)

            let currentFollowIds = followingIds
            currentFollowIds.push(profile.id)
            setFollowingIds(currentFollowIds)
            setFollowed(true)
        }

        const unfollowProfile = async()=>{
            const currentUser = user
            currentUser.following.map((follow, i)=>{
                const result = follow.follow.id === profile.id ? currentUser.following.splice(i,1): ''
            })  
            setUser(currentUser)
            removeId(profile.id)
            setFollowed(false)

            let currentProfile = profile
            currentProfile.followers.map((follow, i)=>{
                const result = follow.user.id === user.id ? currentProfile.followers.splice(i,1): ''
            })
            setProfile(currentProfile )

            const res = await axios.delete(`${BASE_URL}/unfollow/${user.id}/${profile.id}`)

            console.log(res)
        }

        useEffect(()=>{
            getProfile()
        },[username])

    return profile && user.following ? (
        <div className="flex-column profile-container">
            <Outlet/>
            <div className="grid profile">
                <img src={profile.image} className="profile-img"/>
                <div className='profile-username'>{profile.username}</div>
                <div className="flex post-follow ff-sans-serif">
                    <div><span className='profile-nums'>{profile.posts.length}</span>POSTS</div>
                    <div onClick={(e)=>handleClick(e)} id='followers' className='pointer'><span className='profile-nums'>{profile.id === user.id ? user.followers.length : profile.followers.length}</span>FOLLOWERS</div>
                   <div onClick={(e)=>handleClick(e)} className='pointer' ><span className='profile-nums'>{profile.id === user.id ? user.following.length : profile.following.length}</span>FOLLOWING</div>
                </div>
                <div className='bio-display flex-column'>
                    <div className='profile-name'>{profile.firstname} {profile.lastname}</div>
                    <p className='profile-bio ff-sans-serif'>{profile.bio}</p>
                </div>
               {user.id === profile.id ? <button className='profile-btn ff-acme'>Edit Profile</button> : followingIds.includes(profile.id) || followed ? <button className='profile-btn ff-acme' onClick={unfollowProfile}>Unfollow</button> : <button className='profile-btn ff-acme' onClick={followProfile}>Follow</button>}
            </div>
            <div className="flex img-display-layout">
                <img src='/assets/static-logo.png' className="img-display" />
                <img src='/assets/static-logo.png' className="img-display"/>
                <img src='/assets/static-logo.png' className="img-display"/>
            </div>
        </div>
        
    ) : ''
}


const mapStateToProps=(state)=>{
    return{
        user: state.userState.user,
        profile: state.profileState.profile,
        followingIds: state.userState.followingIds
    }
}

const mapActionsToProps=(dispatch)=>{
    return{
        setProfile: (profile)=> dispatch(SetProfile(profile)),
        setUser: (user)=> dispatch(SetUser(user)),
        setFollowingIds: (ids)=> dispatch(SetFollowingIds(ids)),
        removeId: (id)=> dispatch(RemoveId(id))
    }
}
export default connect(mapStateToProps, mapActionsToProps)(ProfileDetails)