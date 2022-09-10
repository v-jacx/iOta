import FollowCard from "../components/FollowCard"

const Follow = ({})=>{
    return(
        <div className="flex-column follow-container box-shadow">
            <div className="follow-header">FOLLOW <span className="follow-close ff-sans-serif">X</span></div>
            <FollowCard/>
            <FollowCard/>
            <FollowCard/>
        </div>
    )
}

export default Follow