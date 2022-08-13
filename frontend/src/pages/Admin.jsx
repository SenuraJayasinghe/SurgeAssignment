import React from 'react'
import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Axios from 'axios';
import Modal from 'react-modal'
import Spinner from '../components/Spinner';

const Admin = () => {

  const navigate = useNavigate()
  
  const { user } = useSelector(
    (state) => state.auth
  )
  
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const [isLoading, setIsLoading] = useState(true)
  

const [modalIsOpen, setModalIsOpen] = useState(false);
const [modalData, setModalData] = useState(null);

const expandModal = (student) => {
  setModalData(student);
  setModalIsOpen(true);
}

const closeModal = () => {
  setModalData(null);
  setModalIsOpen(false);
}

const customStyles = {
  overlay: {
    position: 'fixed',
    backgroundColor: 'transparent'
  },
  content: {
    top: '35%',
    left: '45%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '60%',
    transform: 'translate(-40%, -10%)',
    background: 'rgba(250, 250, 253, .5)',

  }
}

  
    useEffect(() => {

      if(!user) {
        navigate('/')
      } 

      Axios.get("/api/users/all")
      .then((res) => {
        setStudents(res.data)
        setIsLoading(false)
        console.log(res.data);
      })
      
    }, [user, navigate]);   

    if(isLoading) {
      return <Spinner />
    }
  
          return (
                <div>              
                    <h2 className='heading'>
                        Admin Dashboard
                    </h2>
                    <div>
                      <input className='searchBar' type="text" placeholder='Search by name, email, id' onChange={(e) => {
                        setSearch(e.target.value);
                      }}/>
                    </div>            
                        <div>
                            <table className='table'>
                                <thead>
                                  <tr>                              
                                    <th scope="col">First Name</th>                    
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                {students
                                .filter((student) => {                                    
                                    if(search === "") {
                                        return student
                                    }else if(student._id.toString().toLowerCase().includes(search.toLowerCase())
                                      || student.firstName.toString().toLowerCase().includes(search.toLowerCase())
                                      || student.lastName.toString().toLowerCase().includes(search.toLowerCase())
                                      || student.email.toString().toLowerCase().includes(search.toLowerCase())                                        
                                    ) {
                                        return student
                                    }                                      
                                })                            
                                .map((student) => {                                                     
                                    return(                                        
                                        <tr key={student._id} >                                                                             
                                        <td>{student.firstName}</td>
                                        <td>{student.lastName}</td> 
                                        <td>{student.email}</td>                           
                                        <td>
                                            <div>                                             
                                                <button className='btnAlt' onClick={() => expandModal(student)}>view</button>
                                                <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
                                                    <h2>Student details</h2>
                                                    <p>First Name: {modalData && modalData.firstName}</p>
                                                    <p>Last Name: {modalData && modalData.lastName}</p>                                                    
                                                    <p>Email: {modalData && modalData.email}</p>
                                                    <p>DOB: {modalData && modalData.dateOfBirth}</p>
                                                    <p>Contact Number: {modalData && modalData.mobile}</p>
                                                    <button className="btnAlt" onClick={closeModal}>Close</button>
                                                </Modal>
                                            </div>                                            
                                        </td>                                      
                                        </tr>
                                    )})}
                                </tbody>
                            </table>
                        </div>
                    </div>
           
            )        
}

export default Admin