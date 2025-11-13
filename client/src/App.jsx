import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import Result from './pages/result.jsx'
import BuyCredit from './pages/buyCredit.jsx'
import NavBar from './components/navbar.jsx'
import Footer from './components/footer.jsx'
import Login from './components/login.jsx'
import { AppContext } from './context/appContext.jsx'
import { ToastContainer} from 'react-toastify';

const App = () => {
  
  const {showLogin} = useContext(AppContext) 
  
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28
    min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
      <ToastContainer position='bottom-right'/>
      <NavBar/>
      {showLogin && <Login/>}

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/result' element={<Result/>}/>         
        <Route path='/buy' element={<BuyCredit/>}/>         
      </Routes>
      
      <Footer/>

    </div>
  )
}

export default App