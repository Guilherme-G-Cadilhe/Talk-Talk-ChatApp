import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, LoginView, RegisterView, SettingsView } from './views/export.views';
import { Navbar } from './components/export.components';

const App = () => {


  return (
    <Router>
      <Navbar />
      <div className='content-wrapper'>
        <Routes>
          <Route path="/settings" element={<SettingsView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;