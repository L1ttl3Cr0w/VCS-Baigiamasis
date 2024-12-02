import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ToolDetails from './pages/ToolDetails';
import Booking from './pages/Booking';
import Confirmation from './pages/Confirmation';
import AdminPanel from './pages/AdminPanel';
import AdminReservations from "./components/admin/AdminReservations";
import AdminUsers from "./components/admin/AdminUsers";
import AdminToolNewForm from "./components/admin/AdminToolNewForm";
import AdminTools from "./components/admin/AdminTools";
import AdminToolEditForm from "./components/admin/AdminToolEditForm";
import AdminReservationsEditForm from "./components/admin/AdminReservationsEditForm";
import AdminUsersEditForm from "./components/admin/AdminUsersEditForm";
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tools from './pages/Tools';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import TermsOfUse from './components/TermsOfUse';
import PrivacyPolicy from './components/PrivacyPolicy';
import FAQ from './components/FAQ';

function App() {
  return (
    <Router>
      <Header />
      <div className="min-h-[80vh] bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/:id" element={<ToolDetails />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/admin" element={<AdminPanel />}>
            <Route path="tools" element={<AdminTools />}>
              <Route path="edit/:id" element={<AdminToolEditForm />} />
              <Route path="new" element={<AdminToolNewForm />} />
            </Route>
            <Route path="reservations" element={<AdminReservations />}>
              <Route path="edit/:id" element={<AdminReservationsEditForm />} />
              {/* <Route path="new" element={< AdminReservationsNewForm/>} /> */}
            </Route>
            <Route path="users" element={<AdminUsers />}>
              <Route path="edit/:id" element={<AdminUsersEditForm />} />
              {/* <Route path="new" element={< AdminUsersNewForm/>} /> */}
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/terms" element={<TermsOfUse/>}/> */}
          {/* <Route path="/privacy" element={<PrivacyPolicy/>}/> */}
          {/* <Route path="/faq" element={<FAQ/>}/> */}
        </Routes>
      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <Footer />
    </Router>
  );
}

export default App;