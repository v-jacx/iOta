const ProfileDetails = ()=>{
    return(
        <div className="flex-column profile-container">
            <div className="grid profile">
                <img src='/assets/static-logo.png' className="profile-img"/>
                <div className="flex post-follow">
                    <div>POSTS</div>
                    <div>FOLLOWERS</div>
                    <div>FOLLOWING</div>
                </div>
                <div className='bio-display flex-column'>
                    <div>USERNAME</div>
                    <p>fjdsoiten dfdnvorhgroln fwhotfenvn fsatygref dgoewfhn dsaoendf </p>
                </div>
                <button className='edit-profile-btn'>Edit Profile</button>
            </div>
            <div className="flex img-display-layout">
                <img src='/assets/static-logo.png' className="img-display" />
                <img src='/assets/static-logo.png' className="img-display"/>
                <img src='/assets/static-logo.png' className="img-display"/>
            </div>
        </div>
    )
}

export default ProfileDetails