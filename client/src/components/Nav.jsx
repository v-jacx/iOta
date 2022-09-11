import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connect } from 'react-redux'
import {useState} from 'react'
import { useNavigate } from "react-router-dom"
import UserMenu from "./UserMenu"


const Nav=({user})=>{
    const navigate = useNavigate()
    const [isActive, setIsActive]=useState(false)

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
            <div className='flex profile-icon-menu'>
            <img src={user.image} className ='profile-icon' onClick={()=>setIsActive(!isActive)}/>
            {isActive ? <UserMenu isActive={isActive} setIsActive={setIsActive}/> : ''}
            </div>
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

export default connect(mapStateToProps)(Nav)