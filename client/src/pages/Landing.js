import {Link} from 'react-router-dom'

const Landing=()=>{
    
    return(
        <div className="flex landing">
            <img src='/assets/iota-logo.gif' className='landing-logo'></img>
            <div className="flex-column landing-greeting box-shadow gradient-bkg">
            <div className='landing-txt'>
                    <p className= "upper-txt">Share all your memorable moments with your friends!</p>
                    <p className='lower-txt'>Join iOta today.</p>
                </div>
                <div className="flex landing-btns">
                    <button className="landing-btn box-shadow ff-acme">Login</button>
                   <Link to='/register'><button className='landing-btn box-shadow ff-acme'>Sign Up</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Landing