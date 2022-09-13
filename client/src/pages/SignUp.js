import {useState} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import {connect} from 'react-redux'
import {SetUser} from '../store/actions/UserActions'
import { SetAuthTokens} from '../store/actions/AuthActions'
import BASE_URL from '../globals'

const SignUp=({setAuthTokens, setUser})=>{
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [formInfo, setFormInfo] = useState({
        firstname: '',
        lastname: '',
        birthday: '',
        username: '',
        email:'',
        password:'',
        confirmPassword:'',
    })

    const handleClick = async(e)=>{
        e.preventDefault()
        if(formInfo.password !== formInfo.confirmPassword){
            alert('your password must match!')
            return
        }

        const res = await axios.post(`${BASE_URL}/register`,{
            firstname: formInfo.firstname,
            lastname: formInfo.lastname,
            birthday: formInfo.birthday,
            username: formInfo.username,
            email: formInfo.email,
            password: formInfo.password
        }).catch(function(e){
            const error = e.response.data
            if(Object.keys(error).includes('username')){
                setMessage(error.username[0])
            }
            else if(Object.keys(error).includes('birthday')){
                setMessage(error.birthday[0])
            }
            else if(Object.keys(error).includes('email')){
                setMessage(error.email[0])
            }
        })

            const tokens = { refresh: res.data.refresh,
            access: res.data.access}
            setAuthTokens(tokens)
            setUser(res.data.payload)
            localStorage.setItem('authTokens', tokens)
            navigate('/feed')
}

    return(
        <div className='flex-column form gradient-bkg'>
            <div className='form-fields'>
                <input type='text' required onChange={(e)=>setFormInfo({...formInfo, firstname: e.target.value})}></input>
                <label>First Name</label>
            </div>
            <div className='form-fields'>
                <input type='text' required onChange={(e)=>setFormInfo({...formInfo, lastname: e.target.value})}></input>
                <label>Last Name</label>
            </div>
            <div className='form-fields'>
                <input type='text' required onChange={(e)=>setFormInfo({...formInfo, birthday: e.target.value})}></input>
                <label>Birthdate</label>
            </div>
            <div className='form-fields'>
                <input type='text' required onChange={(e)=>setFormInfo({...formInfo, username: e.target.value})}></input>
                <label>Username</label>
            </div>
            <div className='form-fields'>
                <input type='text' required onChange={(e)=>setFormInfo({...formInfo, email: e.target.value})}></input>
                <label>Email</label>
            </div>
            <div className='form-fields'>
                <input type='text' required onChange={(e)=>setFormInfo({...formInfo, password: e.target.value})}></input>
                <label>Password</label>
            </div>
            <div className='form-fields'>
                <input type='text' required onChange={(e)=>setFormInfo({...formInfo, confirmPassword: e.target.value})}></input>
                <label>Confirm Password</label>
            </div>
            <div className='user-prompt'><h3>Already have an account? <Link to='/login'>Login</Link></h3></div>
            <h5 hidden={message===''? 'hidden':''}>{message}</h5>
            <button className='landing-btn box-shadow ff-acme' onClick={(e)=>handleClick(e)}>Sign Up</button>
        </div>
    )
}

const mapActionsToProps = (dispatch) => {
    return {
            setAuthTokens: (authTokens) => dispatch(SetAuthTokens(authTokens)),
            setUser: (user) => dispatch(SetUser(user)),
    }
}

export default connect(null, mapActionsToProps)(SignUp)