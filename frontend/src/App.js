import Home from "./components/Home/home";
import Login from "./components/Login/login";
import Register from "./components/Register/register";
import ForgotPassword from "./components/Forgotpassword/forgotpassword";
import NotFound from "./components/Notfound/notfound";
import AppLayout from "./components/appLayout/AppLayout";
import RegisterStudent from "./components/RegisterStudent/RegisterStudent";
import EditStudent from "./components/RegisterStudent/EditStudent";
import { Routes, Route, useLocation } from "react-router-dom";
import Notice from "./components/Notice/notice";
import Studentlist from "./components/StudentList/studentlist";
import TeacherList from "./components/TeacherList/teacherlist";
import RegisterTeacher from "./components/RegisterTeacher/RegisterTeacher";
import TimeTable from "./components/TimeTable/timetable";
<<<<<<< HEAD
import SecuredPage from "./components/Welcome/SecuredPage";
=======
import EditTeacher from "./components/RegisterTeacher/EditTeacher";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { decodeToken } from "react-jwt";
>>>>>>> d8a51531de1dc92ea85ac21e87a29324e22dc83e

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = decodeToken(token);
      if (!user) {
        localStorage.removeItem("token");
        if (location.pathname === "/register") {
          navigate("/register");
        } else {
          navigate("/login");
        }
      } else {
        if (location.pathname === "/login") {
          navigate("/home");
        }
      }
    } else {
      if (location.pathname === "/register") {
        navigate("/register");
      } else {
        navigate("/login");
      }
    }
  }, []);

  return (
    <div>
<<<<<<< HEAD
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="register-student" element={<RegisterStudent />} />
            <Route path="notice" element={<Notice />} />
            <Route path="studentlist" element={<Studentlist />} />
            <Route path="timetable" element={<TimeTable />} />
          </Route>
          <Route path="welcome" element={<SecuredPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
=======
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="register-student" element={<RegisterStudent />} />
          <Route path="editStudent/:id" element={<EditStudent />} />
          <Route path="notice" element={<Notice />} />
          <Route path="studentlist" element={<Studentlist />} />
          <Route path="teacherList" element={<TeacherList />} />
          <Route path="registerTeacher" element={<RegisterTeacher />} />
          <Route path="editTeacher/:id" element={<EditTeacher />} />
          <Route path="timetable" element={<TimeTable />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgotPassword" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
>>>>>>> d8a51531de1dc92ea85ac21e87a29324e22dc83e
    </div>
  );
}

export default App;
