import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import Chat from './pages/Chat';
import Login from './pages/Login';
import SetAvatar from './pages/SetAvatar';
import Contacts from './components/Contacts';

export default function App() {
  return (

    <BrowserRouter>

      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/setAvatar' element={<SetAvatar />} />
        <Route path='/contact' element={<Contacts />} />

        <Route path='/' element={<Chat />} />

      </Routes>
    </BrowserRouter>

  )
}