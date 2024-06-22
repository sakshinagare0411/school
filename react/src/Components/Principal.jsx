import React, { useState,useRef } from "react";
import { useNavigate } from 'react-router-dom';
import './Principal.css';
import axios from "axios";

const Principal = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    education: "",
    post: "",
    passw:"",
    image:null,   //Add image property to formData
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    if (event.target.name === "image") {
      // If the input is an image, set the image property in formData
    setFormData({
      ...formData,
      image: event.target.files[0], // Set the image file
    });
  }else {
    // For other inputs, update the formData as usual
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }
    setErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      // Form is valid, submit the data
      try {
        const formDataToSend = new FormData();
        // Append all form data to formDataToSend
        Object.keys(formData).forEach((key) => {
          formDataToSend.append(key, formData[key]);
        });

        const response = await axios.post(
          "http://localhost:8000/principal/add_teacher/",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
            },
          }
        );
        console.log(response.data);
        // Reset the form data and errors
        resetForm();
      } catch (error) {
        if (error.response && error.response.status === 403) {
          console.error("Error adding teacher data: Forbidden");
        } else {
          console.error("Error adding teacher data:", error);
        }
      }
    } else {
      setErrors(errors);
    }
  };


  const validateForm = (formData) => {
    const errors = {};
    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.mobile) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      errors.mobile = "Mobile number is invalid";
    }
    if (!formData.education) {
      errors.education = "Education is required";
    }
    if (!formData.post) {
      errors.post = "Post is required";
    }
    if (!formData.passw.trim()){
      errors.passw = "Password is required";
    }
    else if(formData.passw.length < 8)
    {
      errors.passw = "password should be at least 8 char"
    }
    if(!formData.confirmPass.trim()){
      errors.confirmPass = "Confirm Password is required";
    }
    else if(formData.confirmPass!=formData.passw)
    {
      errors.confirmPass = "Password and Confirm Password should be same";
    }
    return errors;
  };
  
  const fileInputRef = useRef(null);

  const resetForm = () => {
    // Reset the form data and errors
    setFormData({
      name: "",
      email: "",
      mobile: "",
      education: "",
      post: "",
      passw:"",
      confirmPass:"",
      image: null,
    });
    setErrors({});
    fileInputRef.current.value = "";
  };

  return (
    <div className=" light-style flex-grow-1 container-p-y" id="principal-profile">
      {/* Principal Profile */}
      <h4 className="font-weight-bold py-3 mb-4 teacher-profile-title">
        Principal Profile
      </h4>
      <div className="">
        <div className="">
          {/* Teacher Details */}
          <div className="col-md-15 pt-0">
            <div className="list-group list-group-flush account-settings-links">
              <a
                className="list-group-item list-group-item-action active"
                data-toggle="list"
                href="#account-general"
              >
                Teacher Details
              </a>
              <a
                className="list-group-item list-group-item-action"
                data-toggle="list"
                href="#account-change-password"
              >
                Profile
              </a>
              <button type="button" onClick={() => navigate('/')} className="list-group-item list-group-item-action" data-toggle="list"> Logout</button>
            </div>
          </div>
          {/* Teacher Details Form */}
          <div className="col-md-9">
            <div className="tab-content">
              <div className="tab-pane fade active show" id="account-general">
                <form onSubmit={handleSubmit} action="teacher" method="post" id="teacher-form">
                  {/* <div className="card-body media align-items-center">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      alt="photo"
                      className="d-block ui-w-80"
                    />
                    <div className="media-body ml-4">
                      <label htmlFor="file-input" className="btn btn-outline-primary">
                        Upload new photo
                        <input
                          type="file"
                          className="account-settings-fileinput"
                          id="file-input"
                          name="image"
                          onChange={handleInputChange}
                          accept="image/*"
                          ref={fileInputRef}
                          aria-label="Upload new photo"
                          required
                        />
                      </label>{" "}
                      
                      <button
                        type="button"
                        className="btn btn-default md-btn-flat"
                        onClick={resetForm}
                      >
                        Reset
                      </button>
                      <div className="text-light small mt-1">
                        Allowed JPG,GIF or PNG. Max size of 800K
                      </div>
                    </div>
                  </div> */}
                  <hr className="" />
                  <div className="">
                    <div className="form-group">
                      <label htmlFor="name-input" className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control mb-1"
                        id="name-input"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter name"
                        required
                      />
                      {errors.name && (
                        <p className="text-danger">{errors.name}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="email-input" className="form-label">Email-Id</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email-input"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter email"
                        required
                      />
                      {errors.email && (
                        <p className="text-danger">{errors.email}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="mobile-input" className="form-label">Mobile No</label>
                      <input
                        type="tel"
                        className="form-control mb-1"
                        id="mobile-input"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        placeholder="Enter mobile number"
                        required
                      />
                      {errors.mobile && (
                        <p className="text-danger">{errors.mobile}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="education-input" className="form-label">Education</label>
                      <input
                        type="text"
                        className="form-control"
                        id="education-input"
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        placeholder="Enter education"
                        required
                      />
                      {errors.education && (
                        <p className="text-danger">{errors.education}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="post-input" className="form-label">Post</label>
                      <input
                        type="text"
                        className="form-control mb-1"
                        id="post-input"
                        name="post"
                        value={formData.post}
                        onChange={handleInputChange}
                        placeholder="Enter post"
                        required
                      />
                      {errors.post && (
                        <p className="text-danger">{errors.post}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="pass-input" className="form-label">Enter Password</label>
                      <input
                        type="password"
                        className="form-control mb-1"
                        id="post-input"
                        name="passw"
                        value={formData.pass}
                        onChange={handleInputChange}
                        placeholder="Enter Password"
                        required
                      />
                      {errors.pass && (
                        <p className="text-danger">{errors.passw}</p>
                      )}
                      
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirm-input" className="form-label">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control mb-1"
                        id="confirm-input"
                        name="confirmPass"
                        value={formData.confirmPass}
                        onChange={handleInputChange}
                        placeholder="Confirm Password"
                        required
                      />
                      {errors.confirmPass && (
                        <p className="text-danger">{errors.confirmPass}</p>
                      )}
                      
                    </div>
                  </div>
                  <div className="text-right mt-3">
                    <button type="submit" className="btn btn-primary">
                      Save changes
                    </button>
                    <button type="button" className="btn btn-default" onClick={resetForm}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
              {/* Profile */}
              <div className="tab-pane fade" id="account-change-password">
                <div className="tab-content">
                  <div className="tab-pane fade active show" id="account-general">
                    {/* <div className="card-body media align-items-center">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        alt="Principal Photo"
                        className="d-block ui-w-80"
                      />
                    </div> */}
                    <hr className="border-light m-0" />
                    <div className="card-body">
                                        <div>
                                            <p><strong>Name :</strong> Yadnik</p>
                                        </div>
                                        <div>
                                            <p><strong>Email-Id :</strong> yadnik@gmail.com</p>
                                        </div>
                                        <div>
                                            <p><strong>Mobile No :</strong> 9765332445</p>
                                        </div>
                                        <div>
                                            <p><strong>Education :</strong> PHD</p>
                                        </div>
                                        <div>
                                            <p><strong>Post :</strong> Head</p>
                                        </div>
                                    </div>
                                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Principal;
