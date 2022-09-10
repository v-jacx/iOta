import axios from 'axios'
import { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import BASE_URL from '../globals'
import { SetProfile} from '../store/actions/ProfileActions'
import Follow from '../pages/Follow'

const ProfileDetails = ({user, setProfile, profile})=>{
        const navigate = useNavigate()
        const [isOpen, setIsOpen] = useState(false)
        const {username} = useParams()

        const handleClick = (e)=>{
            e.preventDefault()
            navigate(`followers`)
        }
        const getProfile = async()=>{
            const res = await axios.get(`${BASE_URL}/profile/${username}`)
            setProfile(res.data)
        }


        console.log(profile)
        useEffect(()=>{
            getProfile()
        },[username])

        
    return profile && user.following ? (
        <div className="flex-column profile-container">
            <div className="grid profile">
                <img src={profile.image} className="profile-img"/>
                <div className='profile-username'>{profile.username}</div>
                <div className="flex post-follow ff-sans-serif">
                    <div><span className='profile-nums'>{profile.posts.length}</span>POSTS</div>
                    <div onClick={(e)=>handleClick(e)}><span className='profile-nums'>{profile.followers.length}</span>FOLLOWERS</div>
                    <div><span className='profile-nums'>{profile.following.length}</span>FOLLOWING</div>
                </div>
                <div className='bio-display flex-column'>
                    <div className='profile-name'>{profile.firstname} {profile.lastname}</div>
                    <p className='profile-bio ff-sans-serif'>{profile.bio}</p>
                </div>
               {user.id === profile.id ? <button className='profile-btn ff-acme'>Edit Profile</button> : user.following.includes(profile) ? <button className='profile-btn ff-acme'>Following</button>: <button className='profile-btn ff-acme'>Following</button>}
            </div>
            <div className="flex img-display-layout">
                <img src='/assets/static-logo.png' className="img-display" />
                <img src='/assets/static-logo.png' className="img-display"/>
                <img src='/assets/static-logo.png' className="img-display"/>
            </div>
            {/* <div className='follow-page'>
               <Follow/> 
            </div>
             */}
        </div>

    ) : ''
}


const mapStateToProps=(state)=>{
    return{
        user: state.userState.user,
        profile: state.profileState.profile
    }
}

const mapActionsToProps=(dispatch)=>{
    return{
        setProfile: (profile)=> dispatch(SetProfile(profile))
    }
}
export default connect(mapStateToProps, mapActionsToProps)(ProfileDetails)