import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup/Signup';
import Login from './Components/Signup/Login';
import Home from './Pages/Home';
import Changepassword from './Components/Changepassword/Changepassword';
import Demo1 from './Pages/demo1';
import Buy from './Pages/Buy';
import OrderHistory from './Pages/OrderHistory';
const App = () => {
  return (
      <div>
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/changepassword" element={<Changepassword />} />
          <Route path="/demo1" element={<Demo1 />} />
          <Route path="/buy/:userId" element={<Buy />} />
          <Route path="/order-history/:userId" element={<OrderHistory />} />
        </Routes>
    </Router>
      </div>
  );
};

export default App;
