import React from 'react'
import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { FaUserPlus } from 'react-icons/fa'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName:'',
        email: '',
        password: '',
        password2: '',
    })

    const {firstName, lastName, email, password, password2} = formData
    
    const navigate = useNavigate ()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
      (state) => state.auth
    )

    useEffect(() => {
      if (isError) {
        toast.error(message)
      }
  
      if(!user) {
        navigate('/')
      } 
  
      dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])
  

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }

      const onSubmit = (e) => {
        e.preventDefault()
    
        if (password !== password2) {
          toast.error('Passwords do not match')
        } else {
          const userData = {
            firstName,
            lastName,
            email,
            password,
          }
    
          dispatch(register(userData))
          navigate('/admin')
        }
      }
    
      if (isLoading) {
        return <Spinner />
      }

  return(
  <>
    <section className='heading'>
       <h1>
         <FaUserPlus /> Register
       </h1>
       <p>Please create an account</p>
    </section>

    <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='firstName'
              required
              name='firstName'
              value={firstName}
              placeholder='Enter first name'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='lastName'
              required
              name='lastName'
              value={lastName}
              placeholder='Enter last name'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              required
              name='email'
              value={email}
              placeholder='Enter email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              required
              name='password'
              value={password}
              placeholder='Enter temporary password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              required
              name='password2'
              value={password2}
              placeholder='Confirm temporary password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
  </>
  )
}

export default Register