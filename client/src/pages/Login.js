import { Link, useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import {SetAuthTokens} from '../store/actions/AuthActions'
import axios from 'axios'
import BASE_URL from "../globals"
import { SetUser} from '../store/actions/UserActions'
import jwt_decode from 'jwt-decode'

const Login=({setAuthTokens, setUser})=>{
        const navigate = useNavigate()
        const [message, setMessage] = useState('')
        const [formFields, setFormFields] = useState({
                username: '',
                password: ''
        })

        const handleOnClick = async(e) =>{
                e.preventDefault()

                const res = await axios.post(`${BASE_URL}/login`, formFields).catch(function(e){
                     setMessage(e.response.data.detail)   
                })

                setAuthTokens(res.data)
                const user = jwt_decode(res.data.access)
                setUser(user)
                localStorage.setItem('authTokens',JSON.stringify(res.data))
                navigate('/feed')
        }


         return( 
                <div className='flex-column form gradient-bkg'>
                        <div className='form-fields'>
                                <input type='text' required onChange={(e)=>setFormFields({...formFields, username: e.target.value})}></input>
                                <label>Username</label>
                        </div>
                        <div className='form-fields'>
                                <input type='password' required onChange={(e)=>setFormFields({...formFields, password: e.target.value})}></input>
                                <label>Password</label>
                        </div>
                        <h5 className='response' hidden={message===''? 'hidden':''}>{message}</h5>
                        <div className='user-prompt'><h3>Need an account? <Link to='/register'>Sign Up</Link></h3></div>
                        <button className='landing-btn box-shadow ff-acme' onClick={(e)=>handleOnClick(e)}>Login</button>
                </div>  
                )
}

const mapActionsToProps = (dispatch) => {
        return {
                setAuthTokens: (authTokens) => dispatch(SetAuthTokens(authTokens)),
                setUser: (user) => dispatch(SetUser(user)),
        }
    }
 
    
    export default connect(null, mapActionsToProps)(Login)