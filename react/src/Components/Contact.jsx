import React, { useState } from "react";
import './Contact.css';

const Contact = () => {
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div id="contact">
      <header>
        <h1 className="heading-contact text-center hover-effect">Contact Us</h1>
      </header>
      <div className="containerContact">
        <div className="row">
          <div className="col-md-6">
            <div className="card-contact hover-effect">
              <div className="card-body-contact">
                <h5 className="card-title text-center" style={{ color: "black" }}>Fill the form </h5>
                <form action="https://api.web3forms.com/submit" method="POST"> 
                  <input type="hidden" name="access_key" value="8b127829-cc47-4f06-bb44-d8b2abff73aa" />
                  <div className="form-group">
                    <input type="text" className="form-control contact-input" id="name" name="name" value={name} placeholder="Enter Name"
                      onChange={(event) => setName(event.target.value)} required />
                    {errors.name && <div className="error">{errors.name}</div>}
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-control contact-input" id="email" name="email" value={email} placeholder="Enter Email"
                      onChange={(event) => setEmail(event.target.value)} required />
                    {errors.email && <div className="error">{errors.email}</div>}
                  </div>
                  <div className="form-group">
                    <textarea className="form-control contact-input" id="message" name="message" value={message} placeholder="Enter Message"
                      onChange={(event) => setMessage(event.target.value)} rows="4" required></textarea>
                    {errors.message && <div className="error">{errors.message}</div>}
                  </div>
                  <button type="submit" className="btn btn-primary btn-block contact-input submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="map-section">
              <div className="gmap-frame">
                <iframe width="100%" height="400" src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=Ankai%20Tal,%20Yeola%20District,%20Nashik,%20Maharashtra,%20423104+(Punyashlok%20Ahilyadevi%20Holkar%20Madhamik%20Vidyalaya%20Ankai)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps vehicle tracker</a></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;