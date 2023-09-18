import Home from "./components/Home/home";
import Login from "./components/Login/login";
import Register from "./components/Register/register";
import ForgotPassword from "./components/Forgotpassword/forgotpassword";
import NotFound from "./components/Notfound/notfound";
import AppLayout from "./components/appLayout/AppLayout";
import RegisterStudent from './components/RegisterStudent/RegisterStudent'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notice from './components/Notice/notice';



function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="register-student" element={<RegisterStudent />} />
            <Route path="notice" element={<Notice />} />


          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
