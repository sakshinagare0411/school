import React from "react";
import Nav from "./Nav.jsx";
import Studprofile from "./Studprofile.jsx";
import Footer from "./Footer.jsx";

function StudentPortal() {
  return (
    <>
      <Nav />
      <div id="studProfile">
        <Studprofile />
      </div>
      <Footer />
    </>
  );
}

export default StudentPortal;