import FollowCard from "../components/FollowCard"
import { useNavigate, useParams} from "react-router-dom"
import {connect} from 'react-redux'

const Follow = ({profile})=>{
    const navigate= useNavigate()
    const label = useParams().label
    console.log(label)

    const goToProfile = (e)=>{
        e.preventDefault()
        navigate(`/${profile.username}`)
    }

    return profile ? (
        <div className=" overlay " onClick={(e)=>goToProfile(e)}>
        <div onClick={(e)=> e.stopPropagation()} className="flex-column follow-container box-shadow">
            <div className="follow-header">{label}<span className="follow-close ff-sans-serif" onClick={(e)=>goToProfile(e)}>X</span></div>
            <div className = 'follow-card-container'>
            {label === 'Followers' ? profile.followers.map((follower)=> <FollowCard follower={follower} label={label}/>) : profile.following.map((follow)=> <FollowCard follower = {follow} label={label}/>)}</div>
        </div></div>
    ): ''
}

const mapStateToProps = (state)=>{
    return{
        profile: state.profileState.profile
    }
}
export default connect(mapStateToProps)(Follow)