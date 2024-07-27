import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
function App() {
  return (
    <>
    <Routes>
      <Route to="/" element={<HomePage />}/>
      <Route to="/login" element={<Login />}/>
      <Route to="/register" element={<Register />}/>
      <Route to="/*" element={<NotFound />}/>
    </Routes>
    </>
  );
}

export default App;
