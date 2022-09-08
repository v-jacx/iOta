import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Nav=()=>{
    return(
        <div className="nav flex gradient-bkg">
            <div className='nav-elems'>
            <h1 className="ff-dancing lettering-logo">iOta</h1>
            </div>
            <div className="nav-icons flex">
            <FontAwesomeIcon icon="home" className="nav-icon"/>       
            <FontAwesomeIcon icon="fa-regular fa-square-plus" className="nav-icon"/>
            <FontAwesomeIcon icon="fa-regular fa-heart" className='nav-icon'/>
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className="nav-icon"/>

            </div>
        </div>
    )
}

export default Nav