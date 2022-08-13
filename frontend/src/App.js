import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Update from './pages/Update'
import Admin from './pages/Admin'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/update' element={<Update />} />
            <Route path='/' element={<ProtectedRoute />}>
              <Route path='admin' element={<Admin />} />
              <Route path='register' element={<Register />} />
            </Route>
            {/* <Route path='/admin' element={<Admin />} /> */}
            {/* <Route path='/register' element={<Register />} /> */}
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;