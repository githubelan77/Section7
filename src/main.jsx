import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Lab1 from './Components/lab1.jsx'
import Lab2 from './Components/Lab2.jsx'
import Lab3 from './Components/Lab3.jsx'
import Lab4 from './Components/Lab4.jsx'
import Lab5 from './Components/Lab5.jsx'
import Lab6 from './Components/Lab6.jsx'
import Parent from './Components/Parent.jsx'
import Lab7 from './Components/Lab7.jsx'
import Lab8 from './Components/Lab8.jsx'
import Lab9 from './Components/Lab9.jsx'
import Lab10 from './Components/Lab10.jsx'
import MyAPICRUD from './Components/MyApiCRUD.jsx'
import Sec7GChat from './Components/Sec7GChat.jsx'
import Lab10a from './Components/Lab10a.jsx'
import AdminDboard from './Components/AdminDboard.jsx'
import UserDboard from './Components/UserDboard.jsx'
import Lab12 from './Components/Lab12.jsx'



createRoot(document.getElementById('root')).render(
 
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/lab1" element={<Lab1 />} />
      <Route path="/lab2" element={<Lab2 />} />
      {/* <Route path="/lab3" element={<Lab3 />} /> */}
      <Route path="/lab3" element={<Parent/>} />
      <Route path="/lab4" element={<Lab4 />} />
      <Route path="/lab5" element={<Lab5 />} />
      <Route path="/lab6" element={<Lab6 />} />
      <Route path="/lab7" element={<Lab7 />} />
      <Route path="/lab8123" element={<Lab8 />} />
      <Route path="/lab9" element={<Lab9 />} />
      <Route path="/lab10" element={<Lab10 />} />
      <Route path="/myapi" element={<MyAPICRUD />} />
      <Route path="/chatbox" element={<Sec7GChat />} />
      <Route path="/Lab10a" element={<Lab10a />} />
      <Route path="/Lab12" element={<Lab12 />} />
      <Route path="/admindashboard" element={<AdminDboard />} />
      <Route path="/userdashboard" element={<UserDboard />} />
    </Routes>
  </BrowserRouter>
)
