
import '../Css/App.css'
import AdminSignUp from './AdminSignUp.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminLogin from './AdminLogin.jsx'
import AdminProduct from './AdminProduct.jsx'
import UserProduct from'./UserProduct.jsx'
import UserSignUp from './UserSignup.jsx'
import UserLogin from './UserLogin.jsx'
import StartPage from './StartPage.jsx'
function App() {
  
                           
  return (
    <>
      <Routes>
        <Route path='/AdminSignUp' element={<AdminSignUp />} />
        <Route path='/AdminLogin' element={<AdminLogin />} />
        <Route path='/AdminProduct' element={<AdminProduct/>}/>
        <Route path='/UserProduct' element ={<UserProduct/>} />
        <Route path='/UserSignUp' element={<UserSignUp/>}/>
        <Route path='/UserLogin' element={<UserLogin/>}/>
        <Route path='/' element={<StartPage/>}/>
      </Routes>
     
       
    </> 
  )
}

export default App
