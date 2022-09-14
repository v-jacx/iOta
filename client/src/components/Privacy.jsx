import {connect} from 'react-redux'
import {useState} from 'react'
import axios from 'axios'
import BASE_URL from '../globals'
import { SetUser } from '../store/actions/UserActions'
const Privacy = ({user, setUser})=>{
    const [privacy, setPrivacy]=useState(user.private)

    const handleClick = async()=>{
        setPrivacy(!privacy)
        const data={
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            private: !privacy
        }

        const res = await axios.post(`${BASE_URL}/profile/update/${user.id}`, data)
        const currentUser = user
        currentUser.private = res.data.private
        setUser(currentUser)
    }
    return (
        <div className='flex privacy-container'>
            <label>Private</label>
            <div className={`toggle ${privacy ? '':'false'}`}onClick={handleClick}>
                <div className='toggle-switch'>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps =(state) =>{
    return{
        user: state.userState.user
    }
}

const mapActionsToProps = (dispatch)=>{
    return{
        setUser: (user)=> dispatch(SetUser(user))
    }
}
export default connect(mapStateToProps, mapActionsToProps)(Privacy)