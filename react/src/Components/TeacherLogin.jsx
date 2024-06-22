import React from "react";
import Nav from "./Nav.jsx";
import Teacher from "./Teacher.jsx";
import Footer from "./Footer.jsx";

function TeacherPortal() {
  return (
    <>
      <Nav />
      <div id="teacher">
        <Teacher />
      </div>
      <Footer />
    </>
  );
}

export default TeacherPortal;