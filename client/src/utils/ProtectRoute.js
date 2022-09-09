import {Navigate, Outlet} from 'react-router-dom'
import {connect} from 'react-redux'

const ProtectRoute = ({children, user}) =>{
    

    if(!user){
        return <Navigate to='/login' replace/>
    }
    
    return <Outlet/>
}

const mapStateToProps = (state)=>{
    return {user: state.userState.user}
}
export default connect(mapStateToProps)(ProtectRoute)