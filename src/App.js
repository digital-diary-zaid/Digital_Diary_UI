import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Signup from './components/SignUp/Signup'

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </Router>
  )
}

export default App