import React from 'react'
import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Axios from 'axios';
import Modal from 'react-modal'

const Admin = () => {

  const navigate = useNavigate()
  
  const { user } = useSelector(
    (state) => state.auth
  )
  
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
 

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
  content: {
    top: '35%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '60%',
    transform: 'translate(-40%, -10%)',
  },
}
  
    useEffect(() => {

      if(!user) {
        navigate('/')
      } 

        Axios.get("/api/users/all")
            .then((res) => {
                setStudents(res.data)
                console.log(res.data);
            })
    }, [user, navigate]);   
  
          return (
                <div>
                    <h2>
                        Admin Dashboard
                    </h2>
                    <div>
                      <input type="text" placeholder='Search By First Name...' onChange={(e) => {
                        setSearch(e.target.value);
                      }}/>
                      <i className='bx bx-search'></i>
                    </div>            
                        <div>
                            <table>
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
                                    if(search == "") {
                                        return student
                                    }else if(student._id.toString().toLowerCase().includes(search.toLowerCase())
                                      ||student.firstName.toString().toLowerCase().includes(search.toLowerCase())
                                      ||student.lastName.toString().toLowerCase().includes(search.toLowerCase())
                                      ||student.email.toString().toLowerCase().includes(search.toLowerCase())                                      
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
                                                <button onClick={() => expandModal(student)}>view</button>
                                                <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
                                                    <h2>Student details</h2>
                                                    <p>First Name: {modalData && modalData.firstName}</p>
                                                    <p>Last Name: {modalData && modalData.lastName}</p>                                                    
                                                    <p>Email: {modalData && modalData.email}</p>
                                                    <p>DOB: {modalData && modalData.dateOfBirth}</p>
                                                    <p>Contact Number: {modalData && modalData.mobile}</p>
                                                    <button className="btnclose" onClick={closeModal}>Close</button>
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