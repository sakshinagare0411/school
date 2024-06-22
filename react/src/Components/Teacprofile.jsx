import React, { useState,useRef } from 'react';
import './Teacprofile.css';
import QRCode from "react-qr-code";
import QrScanner from "qr-scanner";
import QrReader from 'react-qr-reader';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Teacprofile() {

  const navigate = useNavigate();

  const saveTable = () => {
    const tableData = [];
    const rows = document.querySelectorAll('#timetable tr');

    for (let i = 1; i < rows.length; i++) {
      const rowData = [];
      const cells = rows[i].querySelectorAll('td');

      for (let j = 1; j < cells.length; j++) {
        rowData.push(cells[j].innerText);
      }

      tableData.push(rowData);
    }

    console.log(tableData);
    alert('Table data saved successfully!');
  };

  const clearTable = () => {
    const cells = document.querySelectorAll('#timetable td[contentEditable="true"]');

    cells.forEach((cell) => {
      cell.innerText = '';
    });
  };



  const[inputValue, setInputValue] = useState({
    mobile:"",
    studentId:"",
  });

    //download 
    const download = () => {
        const svg = document.getElementById("QRCode");
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");

            //name of image
            downloadLink.download = `${inputValue}`;
            downloadLink.href = `${pngFile}`;
            downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    };

    const[result, setResult] = useState("")
    
   
    //read qr code
    const readCode = (e) => {
      const file = e.target.files[0];
      if (!file) {
          return;
      }
      QrScanner.scanImage(file, { returnDetailedScanResult: true })
          .then(result => setResult(result.data))
          .catch(e => console.log(e));
     }


//web cam 
const qrRef = useRef(null);
const [webCamResult,setWebCamResult] = useState();
const webcamError = (error) => {
  if(error){
      console.log(error);
  }
  };

  const webcamScan = (result) => {
    if (result) {

      const mobile = result.split("-")[0];
      setWebCamResult(mobile);
      sendSMS(mobile);
      alert("Message has been sent successfully");
    }
  };

  const sendSMS = (mobile) => {
    axios.post('http://localhost:8000/teacher/mark_attendance_and_send_message/', {
      mobile_number: mobile,
    })
   .then(response => {
      console.log(response);
    })
   .catch(error => {
      console.error(error);
    });
  };

  //  Validation for adding Student

   const [StudformData, setStudFormData] = useState({
      name: "",
      sclass: "",
      regid: "",
      rollNo: "",
      add: "",
      father:"",
      mother:"",
      mobno:"",
      passw:"",
      confirmPass:"",
      image: null,
      qrcode:""
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    if (event.target.name === "image") {
      // If the input is an image, set the image property in formData
      setStudFormData({
        ...StudformData,
        image: event.target.files[0], // Set the image file
      });
    } else {
      // For other inputs, update the formData as usual
      setStudFormData({
        ...StudformData,
        [event.target.name]: event.target.value,
      });
    }
    setErrors({});
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const errors = validateForm(StudformData);
    if (Object.keys(errors).length === 0) {
      // Form is valid, submit the data
      try {
        const formDataToSend = new FormData();
        // Append all form data to formDataToSend
        Object.keys(StudformData).forEach((key) => {
          formDataToSend.append(key, StudformData[key]);
        });

        const response = await axios.post(
          "http://localhost:8000/teacher/add_student/",
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
          console.error("Error adding student data: Forbidden");
        } else {
          console.error("Error adding student data:", error);
        }
      }
    } else {
      setErrors(errors);
    }
  };

  const validateForm = (StudformData) => {
    const errors = {};
    if (!StudformData.name) {
      errors.name = "Name is required";
    }
    if (!StudformData.sclass) {
      errors.sclass = "Class is required";
  } else if (!/^[1-9]$|^10$/.test(StudformData.sclass)) {
    errors.sclass = "Class should be a number between 1 to 10";
  }
    if(!StudformData.regid){
      errors.regid = "ID is required";
    }

    if (!StudformData.mobno){
      errors.mobno = "Mobile number is required";
    } else if (!/^\d{10}$/.test(StudformData.mobno)) {
      errors.mobno = "Mobile number is invalid";
    }

    if (!StudformData.rollNo) {
      errors.rollNo = "Roll number is required";
    } else if (!/^\d+$/.test(StudformData.rollNo)) {
      errors.rollNo = "Roll number should have numbers only";
    }

    if (!StudformData.add) {
      errors.add = "Address is required";
    }

    if (!StudformData.father) {
      errors.father = "Father Name is required";
    }

    if (!StudformData.mother) {
      errors.mother = "Mother Name is required";
    }
    if (!StudformData.passw.trim()){
      errors.passw = "Password is required";
    }
    else if(StudformData.passw.length < 8)
    {
      errors.passw = "password should be at least 8 char"
    }
    if(!StudformData.confirmPass.trim()){
      errors.confirmPass = "Confirm Password is required";
    }
    else if(StudformData.confirmPass!=StudformData.passw)
    {
      errors.confirmPass = "Password and Confirm Password should be same";
    }

    return errors;
  };

  const fileInputRef = useRef(null);

  
  const resetForm = () => {
    // Reset the form data and errors
    setStudFormData({
      name: "",
      sclass: "",
      regid: "",
      rollNo: "",
      add: "",
      father:"",
      mother:"",
      mobno:"",
      passw:"",
      confirmPass:"",
      image: null,
    });
    setErrors({});
    fileInputRef.current.value = "";
  };



  // Validation for Notice
  const [form, setForm] = useState({
    noticeTitle: "",
    noticeContent: "",
    noticeDate: "",
  });
  
  const handleInputChangeNotice = (event) => {
    
    // For other inputs, update the formData as usual
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  
    setErrors({});
  };
  const handleFormSubmit = async(event) => {
    
    event.preventDefault();
    const errors = validateNotice(form);
    if (Object.keys(errors).length === 0) {
      // Form is valid, submit the data
      try {
        const formDataToSend = new FormData();
        // Append all form data to formDataToSend
        Object.keys(form).forEach((key) => {
          formDataToSend.append(key, form[key]);
        });

        const response = await axios.post(
          "http://localhost:8000/teacher/add_notice/",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
            },
          }
        );
        console.log(response.data);
        // Reset the form data and errors
        resetFormNotice();
      } catch (err) {
        if (err.response && err.response.status === 403) {
          console.error("Error adding notice data: Forbidden");
        } else {
          console.error("Error adding notice data:", err);
        }
      }
    } else {
      setErrors(errors);
    }
  };
  const validateNotice = (form) => {
    const errors = {};
    if (!form.noticeTitle) {
      errors.noticeTitle = "Title is required";
    }
    if (!form.noticeContent) {
      errors.noticeContent = "Content is required";
    }
    if (!form.noticeDate) {
      errors.noticeDate = "Date is required";
    }
    return errors;
  };
 
  const resetFormNotice = () => {
    // Reset the form data and errors
    setForm({
      noticeTitle: "",
    noticeContent: "",
    noticeDate: "",
    });
    setErrors({});
 
  };

  
  // Validation For achivement
  const [data, setData] = useState({
    title:"",
    content:"",
    image:null,
  });

  const handleInputChangeAchivement = (event) =>{
    if(event.target.title === "image") {
      // If the input is an image, set the image property in formData
      setData({
        ...data,
        image: event.target.files[0], // Set the image file
      });
    } else {
      // For other inputs, update the formData as usual
      setData({
        ...data,
        [event.target.name]: event.target.value,
      });
    }
    setErrors({});
  };

  const handleSubmitAchivement = async (event) => {
    event.preventDefault();
    const errors = ValidateAchivement(data);
    if (Object.keys(errors).length === 0) {
      // Form is valid, submit the data
      try {
        const formDataToSend = new FormData();
        // Append all form data to formDataToSend
        Object.keys(data).forEach((key) => {
          formDataToSend.append(key, data[key]);
        });

        const response = await axios.post(
          "http://localhost:8000/teacher/add_achievements/",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
            },
          }
        );
        console.log(response.data);
        // Reset the form data and errors
        resetFormAchivement();
      } catch (error) {
        if (error.response && error.response.status === 403) {
          console.error("Error adding achivement data: Forbidden");
        } else {
          console.error("Error adding achivement data:", error);
        }
      }
    } else {
      setErrors(errors);
    }
  };

  const ValidateAchivement = (data) => {
    const errors = {};
    if(!data.title)
    {
      errors.title = "Title is required";
    }
    if(!data.content)
    {
      errors.content = "Content is required";
    }
    return errors;
  };

  const resetFormAchivement = () => {
    setData({
      title:"",
      content:"",
      image:null,
    });
    setErrors({});
    fileInputRef.current.value = "";
  };

  return (
    <div className=" light-style flex-grow-1 container-p-y" id='teacher-profile'>
      <h4 className="font-weight-bold py-3 mb-4 teacher-profile-title">Teacher Portal</h4>
      <div className="">
        <div className="">
          <div className="col-md-15 pt-0">
            <div className="list-group list-group-flush account-settings-links">
              <a
                className="list-group-item list-group-item-action active"
                data-toggle="list"
                href="#account-general"
              >
                Student Details
              </a>
              <a
                className="list-group-item list-group-item-action"
                data-toggle="list"
                href="#account-profile"
              >
                Profile
              </a>
              <a
                className="list-group-item list-group-item-action"
                data-toggle="list"
                href="#account-notices"
              >
                Add notices
              </a>
              <a
                className="list-group-item list-group-item-action"
                data-toggle="list"
                href="#account-student"
              >
                Create Student Time-Table
              </a>
              <a
                className="list-group-item list-group-item-action"
                data-toggle="list"
                href="#account-teacher"
              >
                Create Self Time-Table
              </a>
              
              <a
                className="list-group-item list-group-item-action"
                data-toggle="list"
                href="#account-qr-scan"
              >
                Scan and Mark Attendence
              </a>
              <a
                className="list-group-item list-group-item-action"
                data-toggle="list"
                href="#account-tt"
              >
                Time-Table
              </a>
              <a
                className="list-group-item list-group-item-action"
                data-toggle="list"
                href="#achivement-tt"
              >
                Add Achivements
              </a>
              <button type="button" onClick={() => navigate('/')} className="list-group-item list-group-item-action" data-toggle="list"> Logout</button>
            </div>
          </div>
          <div className="col-md-9">
            <div className="tab-content">
              

    <div className="tab-pane fade active show" id="account-general">
    <form onSubmit={handleSubmit} action="student" method="post" id="student-form">
      {/* <div className="card-body media align-items-center">
        <img
          src="https://bootdey.com/img/Content/avatar/avatar1.png"
          alt="photo"
          className="d-block ui-w-80"
        />
        <div className="media-body ml-4">
          <label htmlFor="file-input" className="btn btn-outline-primary">
            Upload new photo
            <input type="file" className="account-settings-fileinput" id='file-input' name='image' onChange={handleInputChange} ref={fileInputRef} accept="image/*" aria-label="Upload new photo" required 
            />
          </label>{" "}
          <button type="button" className="btn btn-default md-btn-flat" onClick={resetForm}>
            Reset
          </button>
          <div className="text-light small mt-1">
            Allowed JPG, GIF or PNG. Max size of 800K
          </div>
        </div>
      </div> */}
      <hr className="border-light m-0" />
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="name-input" className="form-label">Name</label>
              <input type="text" className="form-control mb-1" id='name-input' name="name" required value={StudformData.name} onChange={handleInputChange} placeholder='Enter Name' />
              {errors.name && (
                        <p className="text-danger">{errors.name}</p>
                      )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor='class-input' className="form-label">Class</label>
              <input type="text" className="form-control" id='class-input' name="sclass" required value={StudformData.class} onChange={handleInputChange} placeholder='Enter Class' />
              {errors.sclass && (
                        <p className="text-danger">{errors.sclass}</p>
                      )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor='id-input' className="form-label">Registration ID</label>
              <input type="text" className="form-control mb-1" id='id-input' name="regid" required value={StudformData.regid} onChange={handleInputChange} placeholder='Enter Registration ID' />
              {errors.regid && (
                        <p className="text-danger">{errors.regid}</p>
                      )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor='roll-input' className="form-label">Roll No</label>
              <input type="text" className="form-control mb-1" id='roll-input' name="rollNo" required value={StudformData.rollNo} onChange={handleInputChange} placeholder='Enter Roll No' />
              {errors.rollNo && (
                        <p className="text-danger">{errors.rollNo}</p>
                      )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor='add-input' className="form-label">Address</label>
              <input type="text" className="form-control" id='add-input' name="add" required value={StudformData.add} onChange={handleInputChange} placeholder='Enter Address' />
              {errors.add && (
                        <p className="text-danger">{errors.add}</p>
                      )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor='father-input' className="form-label">Father's Name</label>
              <input type="text"className="form-control mb-1" id='father-input' name="father" required value={StudformData.father} onChange={handleInputChange}  placeholder="Enter Father's Name" />
              {errors.father && (
                        <p className="text-danger">{errors.father}</p>
                      )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor='mother-input' className="form-label">Mother's Name</label>
              <input type="text" className="form-control mb-1" id='mother-input' name="mother" required value={StudformData.mother} onChange={handleInputChange} placeholder="Enter Mother's Name" />
              {errors.mother && (
                        <p className="text-danger">{errors.mother}</p>
                      )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor='mobile-input' className="form-label">Mobile No</label>
              <input type="tel"className="form-control mb-1" id='mobile-input' name="mobno" required value={StudformData.mobno} onChange={handleInputChange} placeholder='Enter Mobile No' />
              {errors.mobno && (
                        <p className="text-danger">{errors.mobno}</p>
                      )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="pass-input" className="form-label">Enter Password</label>
              <input type="password" className="form-control mb-1" id="pass-input" name="passw" required value={StudformData.passw} onChange={handleInputChange} placeholder="Enter Password" />
              {errors.passw && (
                        <p className="text-danger">{errors.passw}</p>
                      )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="confirm-input" className="form-label">Confirm Password</label>
              <input type="password" className="form-control mb-1" id='confirm-input' name="confirmPass" required value={StudformData.confirmPass} onChange={handleInputChange} placeholder="Confirm Password" />
              {errors.confirmPass && (
                        <p className="text-danger">{errors.confirmPass}</p>
                      )}
            </div>
            <input
                      type="text"
                      placeholder="Enter Mobile Number and Student ID"
                      onChange={(e) =>
                        setInputValue(e.target.value)
                      }
                  />
                  <input type="button" onClick={download} value="Download"></input>
          </div>
         
        </div>
        {/* <div className="save">

        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button type="button" className="btn btn-default" onClick={resetForm}>
          Cancel
        </button>
      </div> */}
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
            <div className="gen">
                <h1>Generate QR Code</h1>
                  <div style={{height: "auto", margin: "0 auto", maxWidth: 64, width: "100%"}}>
                    <QRCode 
                      size={256}
                      style={{height: "auto", maxwidth: "100%", width: "100%"}}
                      value={inputValue}
                      viewBox={`0 0 256 256`}
                      id="QRCode"
                      />
                  </div>
                  {/* <input
                      type="text"
                      placeholder="Enter Mobile Number and Student ID"
                      onChange={(e) =>
                        setInputValue(e.target.value)
                      }
                  />
                  <input type="button" onClick={download} value="Download"></input> */}
                  
              </div>
            </div>
          </div>
          <div className="col-md-6" >
          <div className="save">

<button type="submit" className="btn btn-primary">
  Save
</button>
<button type="button" className="btn btn-default" onClick={resetForm}>
  Cancel
</button>
</div>      
          </div>
        </div>
      </div>
      
      
      </form>
    </div>

             
              <div className="tab-pane fade" id="account-profile">
                            <div className="tab-content">
                                <div className="tab-pane fade active show" id="account-general">
                                    {/* <div className="card-body media align-items-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="d-block ui-w-80" />
                                    </div> */}
                                    <hr className="border-light m-0" />
                                    <div className="card-body">
                                        <div>
                                            <p><strong>Name :</strong> Hatkar Mam</p>
                                        </div>
                                        <div>
                                            <p><strong>Email-Id :</strong> hatkarpatil@gmail.com</p>
                                        </div>
                                        <div>
                                            <p><strong>Mobile No :</strong> 9765332445</p>
                                        </div>
                                        <div>
                                            <p><strong>Education :</strong> MTech</p>
                                        </div>
                                        <div>
                                            <p><strong>Post :</strong> Class Teacher</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                        <div className="tab-pane fade" id="account-tt">
                            <div className="container-fluid">
                                
                                    <h2>Time Table</h2>
                                    <div className="table-responsive">
                                    <table className="table time-table">
                                        <thead>
                                            <tr>
                                                <th>Day</th>
                                                <th>9:30-10:20</th>
                                                <th>10:20-11:10</th>
                                                <th>11:10-12:00</th>
                                                <th>12:00-12:40</th>
                                                <th>12:40-1:30</th>
                                                <th>1:30-2:20</th>
                                                <th>2:20-3:10</th>
                                                <th>3:10-4:00</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="highlight"><b>Monday</b></td>
                                                <td>Eng</td>
                                                <td>Mat</td>
                                                <td>Che</td>
                                                <td rowSpan="6" className="special"><b>LUNCH</b></td>
                                                <td colSpan="3" className="special">LAB</td>
                                                <td>Phy</td>
                                            </tr>
                                            <tr>
                                                <td className="highlight"><b>Tuesday</b></td>
                                                <td colSpan="3" className="special">LAB</td>
                                                <td>Eng</td>
                                                <td>Che</td>
                                                <td>Mat</td>
                                                <td className="special">SPORTS</td>
                                            </tr>
                                            <tr>
                                                <td className="highlight"><b>Wednesday</b></td>
                                                <td>Mat</td>
                                                <td>Phy</td>
                                                <td>Eng</td>
                                                <td>Che</td>
                                                <td colSpan="3">LIBRARY</td>
                                            </tr>
                                            <tr>
                                                <td className="highlight"><b>Thursday</b></td>
                                                <td>Phy</td>
                                                <td>Eng</td>
                                                <td>Che</td>
                                                <td colSpan="3" className="special">LAB</td>
                                                <td>Mat</td>
                                            </tr>
                                            <tr>
                                                <td className="highlight"><b>Friday</b></td>
                                                <td colSpan="3" className="special">LAB</td>
                                                <td>Mat</td>
                                                <td>Che</td>
                                                <td>Eng</td>
                                                <td>Phy</td>
                                            </tr>
                                            <tr>
                                                <td className="highlight"><b>Saturday</b></td>
                                                <td>Eng</td>
                                                <td>Che</td>
                                                <td>Mat</td>
                                                <td colSpan="3">SEMINAR</td>
                                                <td className="special">SPORTS</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>


                        <div className="tab-pane fade" id="account-notices">
                            <div className="container">
                                <h2 className="text-center mb-4">Add Notices</h2>
                                <form onSubmit={handleFormSubmit} action="notice" method="post" id="form-notice">
                                    <div className="form-group">
                                        <label htmlFor="title-input">Notice Title</label>
                                        <input type="text" className="form-control" id="title-input" name='noticeTitle' placeholder="Enter notice title" value={form.noticeTitle} onChange={handleInputChangeNotice} />
                                        {errors.noticeTitle && (
                                          <p className="text-danger">{errors.noticeTitle}</p>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="content-input">Notice Content</label>
                                        <textarea className="form-control" id="content-input" name='noticeContent' rows="5" placeholder="Enter notice content" value={form.noticeContent} onChange={handleInputChangeNotice} ></textarea>
                                        {errors.noticeContent && (
                                          <p className="text-danger">{errors.noticeContent}</p>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="date-input">Date</label>
                                        <input type="date" className="form-control" max={new Date().toISOString().split('T')[0]} id="date-input" name="noticeDate" value={form.noticeDate} onChange={handleInputChangeNotice} />
                                        {errors.noticeDate && (
                                          <p className="text-danger">{errors.noticeDate}</p>
                                        )}
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                                </form>
                            </div>
                        </div>


                        <div className="tab-pane fade" id="account-student">
                            <div className="container-fluid">
                            <h1>TIME TABLE</h1>
                            <div className="table-responsive">
                            <table id="timetable">
                              <thead>
                                <tr>
                                    <th>Day/Period</th>
                                    <th contentEditable="true" suppressContentEditableWarning>I<br />9:30-10:20</th>
                                    <th contentEditable="true" suppressContentEditableWarning>II<br />10:20-11:10</th>
                                    <th contentEditable="true" suppressContentEditableWarning>III<br />11:10-12:00</th>
                                    <th contentEditable="true" suppressContentEditableWarning>12:00-12:40</th>
                                    <th contentEditable="true" suppressContentEditableWarning>IV<br />12:40-1:30</th>
                                    <th contentEditable="true" suppressContentEditableWarning>V<br />1:30-2:20</th>
                                    <th contentEditable="true" suppressContentEditableWarning>VI<br />2:20-3:10</th>
                                    <th contentEditable="true" suppressContentEditableWarning>VII<br />3:10-4:00</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="highlight"><b>Monday</b></td>
                                    <td contentEditable="true" suppressContentEditableWarning>Eng</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Mat</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Che</td>
                                    <td rowSpan="6" className="special" contentEditable="true" suppressContentEditableWarning><b>LUNCH</b></td>
                                    <td contentEditable="true" suppressContentEditableWarning>LAB</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                </tr>
                                <tr>
                                    <td className="highlight"><b>Tuesday</b></td>
                                    <td contentEditable="true" suppressContentEditableWarning>LAB</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Eng</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Che</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Mat</td>
                                    <td contentEditable="true" suppressContentEditableWarning>SPORTS</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                </tr>
                                <tr>
                                    <td className="highlight"><b>Wednesday</b></td>
                                    <td contentEditable="true" suppressContentEditableWarning>Mat</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Eng</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Che</td>
                                    <td contentEditable="true" suppressContentEditableWarning>LIBRARY</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                </tr>
                                <tr>
                                    <td className="highlight"><b>Thursday</b></td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Eng</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Che</td>
                                    <td contentEditable="true" suppressContentEditableWarning>LAB</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Mat</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                </tr>
                                <tr>
                                    <td className="highlight"><b>Friday</b></td>
                                    <td className="special" contentEditable="true" suppressContentEditableWarning>LAB</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Mat</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Che</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Eng</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                </tr>
                                <tr>
                                    <td className="highlight"><b>Saturday</b></td>
                                    <td contentEditable="true" suppressContentEditableWarning>Eng</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Che</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Mat</td>
                                    <td contentEditable="true" suppressContentEditableWarning>SEMINAR</td>
                                    <td contentEditable="true" suppressContentEditableWarning>SPORTS</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                </tr>
                                </tbody>
                                </table>
                                <div className="btn-container">
                                    <button onClick={saveTable}>Save</button>
                                    <button onClick={clearTable}>Clear</button>
                                </div>
                                
                            
                        </div>
                        </div>
                        </div>


                        <div className="tab-pane fade" id="account-teacher">
                            <div className="container-fluid">
                            <h1>TIME TABLE</h1>
                            <div className="table-responsive">
                            <table id="timetable">
                              <thead>
                                <tr>
                                    <th>Day/Period</th>
                                    <th contentEditable="true" suppressContentEditableWarning>I<br />9:30-10:20</th>
                                    <th contentEditable="true" suppressContentEditableWarning>II<br />10:20-11:10</th>
                                    <th contentEditable="true" suppressContentEditableWarning>III<br />11:10-12:00</th>
                                    <th contentEditable="true" suppressContentEditableWarning>12:00-12:40</th>
                                    <th contentEditable="true" suppressContentEditableWarning>IV<br />12:40-1:30</th>
                                    <th contentEditable="true" suppressContentEditableWarning>V<br />1:30-2:20</th>
                                    <th contentEditable="true" suppressContentEditableWarning>VI<br />2:20-3:10</th>
                                    <th contentEditable="true" suppressContentEditableWarning>VII<br />3:10-4:00</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="highlight"><b>Monday</b></td>
                                    <td contentEditable="true" suppressContentEditableWarning>Eng</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Mat</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Che</td>
                                    <td rowSpan="6" className="special" contentEditable="true" suppressContentEditableWarning><b>LUNCH</b></td>
                                    <td contentEditable="true" suppressContentEditableWarning>LAB</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                </tr>
                                <tr>
                                    <td className="highlight"><b>Tuesday</b></td>
                                    <td contentEditable="true" suppressContentEditableWarning>LAB</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Eng</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Che</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Mat</td>
                                    <td contentEditable="true" suppressContentEditableWarning>SPORTS</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                </tr>
                                <tr>
                                    <td className="highlight"><b>Wednesday</b></td>
                                    <td contentEditable="true" suppressContentEditableWarning>Mat</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Eng</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Che</td>
                                    <td contentEditable="true" suppressContentEditableWarning>LIBRARY</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                </tr>
                                <tr>
                                    <td className="highlight"><b>Thursday</b></td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Eng</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Che</td>
                                    <td contentEditable="true" suppressContentEditableWarning>LAB</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Mat</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                </tr>
                                <tr>
                                    <td className="highlight"><b>Friday</b></td>
                                    <td className="special" contentEditable="true" suppressContentEditableWarning>LAB</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Mat</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Che</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Eng</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                </tr>
                                <tr>
                                    <td className="highlight"><b>Saturday</b></td>
                                    <td contentEditable="true" suppressContentEditableWarning>Eng</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Che</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Mat</td>
                                    <td contentEditable="true" suppressContentEditableWarning>SEMINAR</td>
                                    <td contentEditable="true" suppressContentEditableWarning>SPORTS</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                    <td contentEditable="true" suppressContentEditableWarning>Phy</td>
                                </tr>
                                </tbody>
                                </table>
                                <div className="btn-container">
                                    <button onClick={saveTable}>Save</button>
                                    <button onClick={clearTable}>Clear</button>
                                </div>
                                
                        </div>
                        </div>
                        </div>

                        <div className="tab-pane fade" id="account-qr-scan">
                          <div className="scan">
                            <h1>Mark Attendence</h1>
                            <input type="file" onChange={(e) => readCode(e)}></input>
                            <p>Result is {result}</p>
                          </div>
                          <div className='webcam'>
                          <div>
                    <div>
                        <h3>Webcam</h3>
                    </div>
                    <div>
                    <QrReader
                        delay={300}
                        onError={webcamError}
                        onScan={webcamScan}
                        legacyMode={false}
                        facingMode={"user"}
                        />
                    </div>
                    <div>
                        <h6>Result {webCamResult}</h6>
                    </div>
                </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="achivement-tt">
                          <div className="achivement">
                            <h1>Add Achivements</h1>
                            <form onSubmit={handleSubmitAchivement} action='achivement' method='post' id=''>
                                    <div className="card-body media align-items-center">
                                      <img
                                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                        alt="photo"
                                        className="d-block ui-w-80"
                                      />
                                      <div className="media-body ml-4">
                                        <label htmlFor='file-input' className="btn btn-outline-primary">
                                          Upload new photo
                                          <input type="file" className="account-settings-fileinput" id='file-input' name='image' onChange={handleInputChangeAchivement} ref={fileInputRef} accept="image/*" aria-label="Upload new photo" required />
                                        </label>{' '}
                                        <button type="button" className="btn btn-default md-btn-flat" onClick={resetForm}>
                                          Reset
                                        </button>
                                        <div className="text-light small mt-1">
                                          Allowed JPG, GIF or PNG. Max size of 800K
                                        </div>
                                      </div>
                                    </div>
                                    <hr className="border-light m-0" />
                                    <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="achivementTitle">Achivement Title</label>
                                        <input type="text" className="form-control" id="achivementTitle" name="title" placeholder="Enter Achivement title" value={data.title} onChange={handleInputChangeAchivement} required />
                                        {errors.title && (
                                                <p className="text-danger">{errors.title}</p>
                                         )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="achivementContent">Achivement Content</label>
                                        <textarea className="form-control" id="achivementContent" name='content' rows="5" placeholder="Enter Achivement content" value={data.content} onChange={handleInputChangeAchivement} required ></textarea>
                                        {errors.content && (
                                                <p className="text-danger">{errors.content}</p>
                                         )}
                                    </div>
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                            </form>
                          </div>
                        </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teacprofile;
