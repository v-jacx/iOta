import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {connect} from 'react-redux'
import { SetAuthTokens} from "../store/actions/AuthActions"
import { SetUser } from "../store/actions/UserActions"
import Privacy from './Privacy'

const UserMenu = ({user, isActive, setIsActive, setUser, setAuthTokens}) =>{
    const navigate = useNavigate()
    const [isHovering, setIsHovering] = useState(false)
    const goToProfile=()=>{
        navigate(`${user.username}`)
        setIsActive(!isActive)
    }
    const logout = ()=>{
        localStorage.clear()
        setAuthTokens(null)
        setUser(null)
        setIsActive(!isActive)
    }
    return(
        <div className='flex-column user-menu box-shadow'>
        <h3 className ='menu-item' onClick={goToProfile}>Profile</h3>
            <h3 className ='menu-item'>Account</h3>
            <h3 className ='menu-item'>Display</h3>
            <div className ='flex privacy-menu' onMouseOver={()=>setIsHovering(true)} onMouseOut={()=> setIsHovering(false)}>
                {isHovering ? <Privacy/>:''}
                <h3 className='privacy-item'>Privacy</h3>
            </div>
            <h3 className ='menu-item' onClick={logout}>Log Out</h3>
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
        setAuthTokens: (authTokens)=> dispatch(SetAuthTokens(authTokens))
    }
}

export default connect(mapStateToProps, mapActionsToProps)(UserMenu)