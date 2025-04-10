import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup/Signup';
import Login from './Components/Signup/Login';
import Home from './Pages/Home';
import Changepassword from './Components/Changepassword/Changepassword';
import Buy from './Pages/Cart';
import Cart from './Pages/last';
import Update from './Pages/Update';
const App = () => {
  return (
      <div>
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/changepassword" element={<Changepassword />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/order/:userId" element={<Cart />} />
          <Route path="/update/:userId" element={<Update />} />
        </Routes>
    </Router>
      </div>
  );
};

export default App;
