const FollowCard = ()=>{
    return(
        <div className="flex follow-card">
            <img src='/assets/static-logo.png' className="follow-profile-img"></img>
            <div className="flex-column follow-card-names">
            <h4 >USERNAME</h4>
            <h5 className='ff-sans-serif follow-name'>FIRST LAST</h5>
            </div>
            <button className="ff-acme follow-button">Follow</button>
        </div>
    )
}

export default FollowCard