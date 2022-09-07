const SignUp=()=>{
    return(

        <div className='flex-column form gradient-bkg'>
            <div className='form-fields'>
                <input type='text'></input>
                <label>First Name</label>
            </div>
            <div className='form-fields'>
                <input type='text'></input>
                <label>Last Name</label>
            </div>
            <div className='form-fields'>
                <input type='text'></input>
                <label>Email</label>
            </div>
            <div className='form-fields'>
                <input type='text'></input>
                <label>Password</label>
            </div>
            <div className='form-fields'>
                <input type='text'></input>
                <label>Confirm Password</label>
            </div>
            <button className='landing-btn box-shadow ff-acme'>Sign Up</button>
        </div>  
    )
}

export default SignUp