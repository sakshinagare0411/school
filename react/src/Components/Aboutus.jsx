import React from "react";
import "./About.css";
import img3 from "../Images/about.jpeg";
import play from "../Images/play.png";

const About = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <>
      <div id="about-section">
        <h1 className="Heading text-center hover-effect">About</h1>
        <div className="about">
          {/* <div className="page-content container note-has-grid" id="notice"> */}

          <div className="about-left">
            <img src={img3} alt="aboutimg" className="aboutimg" />
            <img src={play} alt="" className="play-icon" />
          </div>

          <div className="about-right">
            <h2>Vision and Mission</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
              ducimus quod placeat, laboriosam vitae mollitia provident iusto
              qui cumque aliquam reprehenderit vel incidunt minima consequatur
              modi error in quisquam esse?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
              velit placeat blanditiis dolorem quasi totam sapiente id expedita
              laudantium repudiandae possimus dicta voluptatibus sunt quaerat,
              cumque quia. Praesentium, vitae voluptatem!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
