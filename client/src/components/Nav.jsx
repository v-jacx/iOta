import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { connect } from 'react-redux'
import {useState} from 'react'
import { useNavigate, Link} from "react-router-dom"
import UserMenu from "./UserMenu"
import PostCard from "./PostCard"


const Nav=({user})=>{
    const [isActive, setIsActive]=useState(false)
    const [isOpen, setIsOpen]= useState(false)


    return(
        <nav className="nav flex gradient-bkg">
            {isOpen ? <PostCard setIsOpen={setIsOpen}/> : ''}
            <div className='nav-elems'>
            <h1 className="ff-dancing lettering-logo">iOta</h1>
            </div>
            {user ? (
            <div className="nav-icons flex">
            <Link to='/feed'><FontAwesomeIcon icon="home" className="nav-icon"/></Link>    
            <FontAwesomeIcon icon="fa-regular fa-square-plus" className="nav-icon" onClick={()=> setIsOpen(true)}/>
            <FontAwesomeIcon icon="fa-regular fa-heart" className='nav-icon'/>
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="nav-icon"/>
            <div className='flex profile-icon-menu'>
            <img src={user.image} className ='profile-icon' onClick={()=>setIsActive(!isActive)}/>
            {isActive ? <UserMenu isActive={isActive} setIsActive={setIsActive}/> : ''}
            </div>
            </div>
            ):''}
        </nav> 
    
    )
}

const mapStateToProps=(state)=>{
    return{
        user: state.userState.user
    }
}

export default connect(mapStateToProps)(Nav)