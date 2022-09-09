import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connect } from 'react-redux'
import { SetAuthTokens} from "../store/actions/AuthActions"
import { SetUser } from "../store/actions/UserActions"
const Nav=({user, setUser, SetAuthTokens})=>{
    const handleClick = ()=>{
        SetAuthTokens(null)
        setUser(null)
    }

    return(
        <div className="nav flex gradient-bkg">
            <div className='nav-elems'>
            <h1 className="ff-dancing lettering-logo">iOta</h1>
            </div>
            {user ? (
            <div className="nav-icons flex">
            <FontAwesomeIcon icon="home" className="nav-icon"/>       
            <FontAwesomeIcon icon="fa-regular fa-square-plus" className="nav-icon"/>
            <FontAwesomeIcon icon="fa-regular fa-heart" className='nav-icon'/>
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="nav-icon"/>
            <h3 onClick={handleClick}>Logout</h3>
            </div>
            ):''}
        </div>
    )
}

const mapStateToProps=(state)=>{
    return{
        user: state.userState.user
    }
}
const mapActionsToProps=(dispatch)=>{
    return{
        setUser: (user)=> dispatch(SetUser(user)),
        SetAuthTokens: (authTokens)=> dispatch(SetAuthTokens(authTokens))
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Nav)