import React from 'react'
import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import {logout, update, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'


const Update = () => {

  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )
    
  const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        dateOfBirth: '',
        mobile: user.mobile,
        password: ''
       
    })

    const {firstName, lastName, dateOfBirth, mobile, password} = formData
    

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
     
          const userData = {
            firstName,
            lastName,
            dateOfBirth,
            mobile,
            password,
          }
        
          
          dispatch(update(userData))
          alert('Profile updated')
          dispatch(logout())
          window.location.href = 'http://localhost:3000/'
      }
    
      if (isLoading) {
        return <Spinner />
      }

  return(
  <>
    <section className='heading'>
       <h1>
         <FaUser /> Update
       </h1>
       <p>Please Update your account</p>
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
              type='date'
              className='form-control'
              id='dateOfBirth'
              name='dateOfBirth'
              required
              value={dateOfBirth}
              placeholder='Enter date of birth'
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <input
              type='number'
              className='form-control'
              id='mobile'
              name='mobile'
              required
              value={mobile}
              placeholder='Enter mobile number'
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              required
              value={password}
              placeholder='Enter new password'
              onChange={onChange}
            />
          </div>
          
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Update
            </button>
            <br />
          </div>
        </form>
      </section>
  </>
  )
}

export default Update