import { Link } from "react-router-dom"
import GenderCheckbox from "./GenderCheckbox"
import { useState } from "react"
import useSignup from "../../hooks/useSignup"


const SignUp = () => {

  const [input, setInput] = useState({ fullName: '', email: '', password: '', confirmPassword: '', gender: '' })
  const {loading,signup}=useSignup();
  const handleSubmit=async(e)=>{
    e.preventDefault()
    await signup(input);
    
  }
  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleCheckboxChange=(gender)=>{
    setInput({...input,gender})
  }
 
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Sign Up <span className='text-blue-500'> ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input type='text' placeholder='John Doe' className='w-full input input-bordered  h-10'
              value={input.fullName}
              onChange={onChange}
              name='fullName'
            />
          </div>
          <div>
            <label className='label p-2 '>
              <span className='text-base label-text'>Email</span>
            </label>
            <input type='text' placeholder='johndoe@gmail.com' className='w-full input input-bordered h-10'
              value={input.email}
              onChange={onChange}
              name='email'
            />
          </div>
          <div>
            <label className='label'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              className='w-full input input-bordered h-10'
              onChange={onChange}
              value={input.password}
              name='password'
            />
          </div>
          <div>
            <label className='label'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              type='password'
              placeholder='Confirm Password'
              className='w-full input input-bordered h-10'
              onChange={onChange}
              value={input.confirmPassword}
              name='confirmPassword'
            />
          </div>

          <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={input.gender} />

          <Link to="/login" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block' >
            Already have an account?
          </Link>
          <div>
            <button className='btn btn-block btn-sm mt-2 border border-slate-700'
            disabled={loading}
            >
            {loading ? <span className='spinner spinner-white spinner-sm'></span> : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
