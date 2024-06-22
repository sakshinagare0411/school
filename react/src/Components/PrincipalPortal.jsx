import React from "react";
import Nav from "./Nav.jsx";
import Principal from "./Principal.jsx";
import Footer from "./Footer.jsx";

function StudentPortal() {
  return (
    <>
      <Nav />
      <div id="principal-profile">
        < Principal/>
      </div>
      <Footer />
    </>
  );
}

export default StudentPortal;