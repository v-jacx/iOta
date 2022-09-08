import { Link } from 'react-router-dom'
const Login=()=>{
         return( 
                <div className='flex-column form gradient-bkg'>
                        <div className='form-fields'>
                                <input type='text' required></input>
                                <label>Username</label>
                        </div>
                        <div className='form-fields'>
                                <input type='text' required></input>
                                <label>Password</label>
                        </div>
                        <div className='user-prompt'><h3>Need an account? <Link to='/register'>Sign Up</Link></h3></div>
                        <button className='landing-btn box-shadow ff-acme'>Login</button>
                </div>  
                )
}

export default Login
