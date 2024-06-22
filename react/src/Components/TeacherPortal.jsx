import React from "react";
import Nav from "./Nav.jsx";
import TeacProfile from "./Teacprofile.jsx";
import Footer from "./Footer.jsx";

function StudentPortal() {
  return (
    <>
      <Nav />
      <div id="teacher-profile">
        < TeacProfile/>
      </div>
      <Footer/>
    </>
  );
}

export default StudentPortal;