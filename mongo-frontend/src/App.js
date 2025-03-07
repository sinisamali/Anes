import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'; // Navigation bar
import HomePage from './pages/HomePage'; // Home page
import AllUserPages from './pages/AllUserPages'; // Paginated user list
import UserDetails from './pages/UserDetails'; // User details
import VideoPage from './pages/VideoPage'; // Video page
// import SignUp from './pages/SignUp'; // Sign-up page

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home Page */}
        <Route path="/users" element={<AllUserPages />} /> {/* User List */}
        <Route path="/user/:id" element={<UserDetails />} /> {/* User Details */}
        <Route path="/videos" element={<VideoPage />} /> {/* Video Page */}
        {/* <Route path="/sign-up" element={<SignUp />} /> Sign-Up Page */}
      </Routes>
    </Router>
  );
}

export default App;
