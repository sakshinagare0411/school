import React, { useEffect, useState } from "react";
import './Notice.css';
import axios from "axios";
// import img from "../Images/notice1.jpg";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Notice = () => {
    const [Notices, setNotices] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/teacher/getNotice/")
            .then(response => {
                const sortedNotices = response.data.sort((a, b) => new Date(b.noticeDate) - new Date(a.noticeDate));
                setNotices(sortedNotices);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    const cardStyle = {
        position: 'relative',
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '20px',
        margin: '10px',
        border: '2px solid #007bff', // Add border here
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    };
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
    

    //   const CustomButtonGroupAsArrows = ({ next, previous }) => {
    //     return (
    //         <div>
    //             <button className="custom-arrow prev" onClick={previous}>‹</button>
    //             <button className="custom-arrow next" onClick={next}>›</button>
    //         </div>
    //     );
    // };



    return (
        <div id="notice-section">
            <div className="page-content container note-has-grid" id="notice">
                <h1 className="Heading text-center hover-effect">Notice Board</h1>
                {/* <img className="h-100 w-100" src={img} alt={`Slide ${index + 1}`} /> */}
                <div className="tab-content bg-transparent">
                    <div id="note-full-container" className="note-has-grid">
                        
                    <Carousel 
                            responsive={responsive}
                        >
                        <div className="single-note-item all-category">
                            <div className="card1 board hover-effect" style={cardStyle}>
                                <span className="side-stick"></span>
                                <h5 className="note-title text-truncate w-75 mb-0" data-noteheading="Example Notice Title">
                                    Title: Example Notice <i className="point fa fa-circle ml-1 font-10"></i></h5>
                                <p className="note-date font-12 text-muted">Date: 2024-06-20</p>
                                <div className="note-content">
                                    <p className="note-inner-content text-muted"
                                        data-notecontent="This is an example notice content.">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum voluptatem corrupti quaerat modi ad mollitia facere, officia amet nihil provident dolorem voluptatum temporibus architecto perspiciatis, aut sunt nostrum earum laudantium.
                                            
                                      
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="single-note-item all-category">
                            <div className="card1 board hover-effect" style={cardStyle}>
                                <span className="side-stick"></span>
                                <h5 className="note-title text-truncate w-75 mb-0" data-noteheading="Example Notice Title">
                                    Title: Example Notice <i className="point fa fa-circle ml-1 font-10"></i></h5>
                                <p className="note-date font-12 text-muted">Date: 2024-06-20</p>
                                <div className="note-content">
                                    <p className="note-inner-content text-muted"
                                        data-notecontent="This is an example notice content.">
                                              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum voluptatem corrupti quaerat modi ad mollitia facere, officia amet nihil provident dolorem voluptatum temporibus architecto perspiciatis, aut sunt nostrum earum laudantium.
                                        
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="single-note-item all-category">
                            <div className="card1 board hover-effect" style={cardStyle}>
                                <span className="side-stick"></span>
                                <h5 className="note-title text-truncate w-75 mb-0" data-noteheading="Example Notice Title">
                                    Title: Example Notice <i className="point fa fa-circle ml-1 font-10"></i></h5>
                                <p className="note-date font-12 text-muted">Date: 2024-06-20</p>
                                <div className="note-content">
                                    <p className="note-inner-content text-muted"
                                        data-notecontent="This is an example notice content.">
                                           Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum voluptatem corrupti quaerat modi ad mollitia facere, officia amet nihil provident dolorem voluptatum temporibus architecto perspiciatis, aut sunt nostrum earum laudantium.
                                     
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="single-note-item all-category">
                            <div className="card1 board hover-effect" style={cardStyle}>
                                <span className="side-stick"></span>
                                <h5 className="note-title text-truncate w-75 mb-0" data-noteheading="Example Notice Title">
                                    Title: Example Notice <i className="point fa fa-circle ml-1 font-10"></i></h5>
                                <p className="note-date font-12 text-muted">Date: 2024-06-20</p>
                                <div className="note-content">
                                    <p className="note-inner-content text-muted"
                                        data-notecontent="This is an example notice content.">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum voluptatem corrupti quaerat modi ad mollitia facere, officia amet nihil provident dolorem voluptatum temporibus architecto perspiciatis, aut sunt nostrum earum laudantium.
                                     
                                    </p>
                                </div>
                            </div>
                        </div>

                        {Notices.map(notice => (
                            <div key={notice.noticeId}>
                                <div className="single-note-item all-category">
                                    <div className="card1 board hover-effect">
                                        <span className="side-stick"></span>
                                        <h5 className="note-title text-truncate w-75 mb-0" data-noteheading="Book a Ticket for Movie">
                                            Title: {notice.noticeTitle} <i className="point fa fa-circle ml-1 font-10"></i></h5>
                                        <p className="note-date font-12 text-muted">Date: {notice.noticeDate}</p>
                                        <div className="note-content">
                                            <p className="note-inner-content text-muted"
                                                data-notecontent="Blandit tempus porttitor aasfs. Integer posuere erat a ante venenatis.">
                                                {notice.noticeContent}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Notice
