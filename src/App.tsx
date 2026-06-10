import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Courts from './pages/Courts';
import Trainers from './pages/Trainers';
import Schedule from './pages/Schedule';
import Booking from './pages/Booking';
import Pricing from './pages/Pricing';
import Contacts from './pages/Contacts';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/courts" element={<Courts />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
