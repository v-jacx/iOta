import axios from 'axios'
import BASE_URL from '../globals'
import {connect} from 'react-redux'
import {useState} from 'react'
import {SetUser} from '../store/actions/UserActions'
import { SetProfile} from '../store/actions/ProfileActions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from 'react-router-dom'

const EditProfile = ({user, setUser, profile, setProfile})=>{
    const navigate = useNavigate()
    const [firstname, setFirstname]= useState(user.firstname)
    const [lastname, setLastname]= useState(user.lastname)
    const [username, setUsername]= useState(user.username)
    const [website, setWebsite] = useState(user.website ? user.website: '')
    const [bio, setBio] = useState(user.bio ? user.bio : '')

    const handleClick = async() =>{
        const data = {
            firstname: firstname,
            lastname: lastname,
            username: username,
            website: website,
            bio: bio,
        }
        const res = await axios.post(`${BASE_URL}/profile/update/${user.id}`, data)
        navigate(`/${res.data.username}`)
    }
    return(
        <div className='overlay margin-top'>
            <div className='flex-column edit-profile box-shadow'>
                <div className='flex edit-profile-header'>
                 <h3>Edit Profile</h3>
                 <FontAwesomeIcon icon="fa-solid fa-xmark" className="edit-profile-close pointer" onClick={()=>navigate(`/${profile.username}`)}/>
                 </div>
                 <div className='flex-column edit-profile-elems'>
                 <div className='flex edit-profile-img'>
                    <img src={user.image} className='comment-profile-img'/>
                    <div className='edit-profile-image'>
                        <h4 className='edit-username'>{user.username}</h4>
                        <h4 className='edit-image ff-sans-serif'>Change profile picture</h4>
                    </div>
                </div>
                <div className='flex edit-elem'>
                    <label>firstname</label>
                    <input type='text' className='edit-input' value={firstname} onChange={(e)=>setFirstname(e.target.value)}/> 
                </div>
                <div className='flex edit-elem'>
                    <label>lastname</label>
                    <input type='text' className='edit-input' value={lastname} onChange={(e)=>setLastname(e.target.value)}/>
                </div>
                <div className='flex edit-elem'>
                    <label>username</label>
                    <input type='text' className='edit-input' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <div className='flex edit-elem'>
                    <label>website</label>
                    <input type='text' className='edit-input' value={website} onChange={(e)=>setWebsite(e.target.value)}/>
                </div>
                <div className='flex edit-elem'>
                    <label>bio</label>
                    <textarea value={bio} onChange={(e)=>setBio(e.target.value)} className='edit-input'/>
                </div>

                 </div>
                <button onClick={handleClick} className='landing-btn ff-acme'>Submit</button>
        </div></div>
)}


const mapStateToProps=(state)=>{
    return{
        user: state.userState.user,
        profile: state.profileState.profile
    }
}
const mapActionsToProps=(dispatch)=>{
    return{
        setUser: (user)=> dispatch(SetUser(user)),
        setProfile: (profile) => dispatch(SetProfile(profile))
    }
}
export default connect(mapStateToProps, mapActionsToProps)(EditProfile)