import React from "react";
import Home from "./Components/Home.jsx";
import StudentLogin from "./Components/StudentLogin.jsx"
import StudentPortal from "./Components/StudentPortal.jsx";
import TeacherLogin from "./Components/TeacherLogin.jsx";
import TeacherPortal from "./Components/TeacherPortal.jsx";
import PrincipalPortal from "./Components/PrincipalPortal.jsx";
import ForgotPassword from "./Components/ForgotPassword.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route path="/notice" element={<Home />} />
        <Route path="/contact" element={<Home />} />
        <Route path="/achivement" element={<Home />} />
        <Route path="/student" element={<StudentLogin />} />
        <Route path="/Studentprofile" element={<StudentPortal />} />
        <Route path="/teacher" element={<TeacherLogin />} />
        <Route path="/Teacherprofile" element={<TeacherPortal />} />
        <Route path="/Principalprofile" element={<PrincipalPortal />} />
        <Route path="/Forgot" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;