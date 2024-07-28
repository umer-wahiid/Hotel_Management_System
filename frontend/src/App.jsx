import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateRoom from './pages/Room/CreateRoom'
import DeleteRoom from './pages/Room/DeleteRoom'
import EditRoom from './pages/Room/EditRoom'
import ViewRoom from './pages/Room/ViewRoom'

const App = () => {
  return (
    //<div className='bg-red-400 text-white'>App</div>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/rooms/create' element={<CreateRoom />} />
      <Route path='/rooms/details/:id' element={<ViewRoom />} />
      <Route path='/rooms/edit/:id' element={<EditRoom />} />
      <Route path='/rooms/delete/:id' element={<DeleteRoom />} />
    </Routes>
  )
}

export default App