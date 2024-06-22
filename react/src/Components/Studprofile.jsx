//DONE

import React, { useState,useRef,useEffect } from 'react';
import './Studprofile.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
const Studentprofile = () => {

    const navigate = useNavigate();
    const [attendanceData, setAttendanceData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    axios
      .get('/api/attendance/')
      .then((response) => {
        setAttendanceData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  const currentYear = new Date().getFullYear();
  const startDate = new Date(currentYear, selectedMonth, 1);
  const endDate = new Date(currentYear, selectedMonth + 1, 0);
  const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
  const presentDays = attendanceData.filter(
    (attendance) =>
      new Date(attendance.date).getMonth() === selectedMonth &&
      attendance.attendance === 'Present'
  ).length;
  const percentage = (presentDays / totalDays) * 100;

// const handleChange = (event) => {
//   setSelectedMonth(event.target.value);
//   updateAttendance(event.target.value);
// };

// const updateAttendance = (selectedMonth) => {
//   let attendance;

//   switch (selectedMonth) {
//     case 'january':
//       attendance = januaryAttendance.map((item) => ({ date: item.date, attendance: item.attendence }));
//       break;
//     case 'february':
//       attendance = februaryAttendance.map((item) => ({ date: item.date, attendance: item.attendence }));
//       break;
//     case 'march':
//       attendance = marchAttendance.map((item) => ({ date: item.date, attendance: item.attendence }));
//       break;
//     case 'april':
//       attendance = aprilAttendance.map((item) => ({ date: item.date, attendance: item.attendence }));
//       break;
//     case 'may':
//       attendance = mayAttendance.map((item) => ({ date: item.date, attendance: item.attendence }));
//       break;
//     case 'june':
//       attendance = juneAttendance.map((item) => ({ date: item.date, attendance: item.attendence }));
//       break;
//     case 'july':
//       attendance = julyAttendance.map((item) => ({ date: item.date, attendance: item.attendence }));
//       break;
//     case 'august':
//       attendance = augustAttendance.map((item) => ({ date: item.date, attendance: item.attendence }));
//       break;
//     case 'september':
//       attendance = septemberAttendance.map((item) => ({ date: item.date, attendance: item.attendence }));
//       break;
//     case 'october':
//       attendance = octoberAttendance.map((item) => ({ date: item.date, attendance: item.attendence }));
//       break;
//     case 'november':
//       attendance = novemberAttendance.map((item) => ({ date: item.date, attendance: item.attendence }));
//       break;
//     case 'december':
//       attendance = decemberAttendance.map((item) => ({ date: item.date, attendance: item.attendence }));
//       break;
//     default:
//       attendance = [];
//       break;
//   }

//   setAttendanceData(attendance);
// };

// const calculateTotalAttendance = (attendanceData) => {
//   const totalDays = attendanceData.length;
//   const presentDays = attendanceData.filter(
//       (attendance) => attendance.attendance === 'Present'
//   ).length;

//   return ((presentDays / totalDays) * 100).toFixed(2);
// };

  const [value, setValue] = React.useState('');
  return(
    <div className="container light-style flex-grow-1 container-p-y" id='studProfile'>
        <h4 className="font-weight-bold py-3 mb-4 teacher-profile-title">
            Student Profile
        </h4>
        <button type="button" onClick={() => navigate('/')} className="btn btn-default"> Logout</button>
        <div className="card overflow-hidden">
            <div className="row no-gutters row-bordered row-border-light">
                <div className="col-md-3 pt-0">
                    <div className="list-group list-group-flush account-settings-links">
                        <a className="list-group-item list-group-item-action active" data-toggle="list"
                            href="#account-general">Profile</a>
                        <a className="list-group-item list-group-item-action" data-toggle="list"
                            href="#account-attendance">Attendance</a>
                        <a className="list-group-item list-group-item-action" data-toggle="list"
                            href="#account-tt">Time-Table</a>
                            
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="account-general">
                            <div className="card-body media align-items-center">
                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""
                                    className="d-block ui-w-80" />
                            </div>
                            <hr className="border-light m-0" />
                            <div className="card-body">
                                <div>
                                    <p><strong>Name :</strong> John Doe</p>
                                </div>
                                <div>
                                    <p><strong>Registration Id :</strong> 001</p>
                                </div>
                                <div>
                                    <p><strong>Address :</strong> London</p>
                                </div>
                                <div>
                                    <p><strong>class :</strong> 10th</p>
                                </div>
                                <div>
                                    <p><strong>Roll No :</strong> 13</p>
                                </div>
                                <div>
                                    <p><strong>Father's Name :</strong> Johnny Doe</p>
                                </div>
                                <div>
                                    <p><strong>Mother's Name :</strong> Jiya Doe</p>
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
                                                <td>English</td>
                                                <td>Math</td>
                                                <td>Chemistry</td>
                                                <td rowSpan="6" className="special"><b>LUNCH</b></td>
                                                <td colSpan="3" className="special">LAB</td>
                                                <td>Physics</td>
                                            </tr>
                                            <tr>
                                                <td className="highlight"><b>Tuesday</b></td>
                                                <td colSpan="3" className="special">LAB</td>
                                                <td>English</td>
                                                <td>Chemistry</td>
                                                <td>Math</td>
                                                <td className="special">SPORTS</td>
                                            </tr>
                                            <tr>
                                                <td className="highlight"><b>Wednesday</b></td>
                                                <td>Math</td>
                                                <td>Physics</td>
                                                <td>English</td>
                                                <td>Chemistry</td>
                                                <td colSpan="3">LIBRARY</td>
                                            </tr>
                                            <tr>
                                                <td className="highlight"><b>Thursday</b></td>
                                                <td>Physics</td>
                                                <td>English</td>
                                                <td>Chemistry</td>
                                                <td colSpan="3" className="special">LAB</td>
                                                <td>Math</td>
                                            </tr>
                                            <tr>
                                                <td className="highlight"><b>Friday</b></td>
                                                <td colSpan="3" className="special">LAB</td>
                                                <td>Math</td>
                                                <td>Chemistry</td>
                                                <td>English</td>
                                                <td>Physics</td>
                                            </tr>
                                            <tr>
                                                <td className="highlight"><b>Saturday</b></td>
                                                <td>English</td>
                                                <td>Chemistry</td>
                                                <td>Math</td>
                                                <td colSpan="3">SEMINAR</td>
                                                <td className="special">SPORTS</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="account-attendance">
                            {/* <div className="container">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="dropdown" >
                                            <select value={selectedMonth} onChange={handleChange} className="btn btn-primary dropdown-toggle" id="dropdownMenuButton">
                                            <option value="">Select Month</option>
                                                {options.map((option) => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                              ))}

                                            </select>
                                            {/*
                                            <div className="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenuButton">
                                              
                                                <a className="dropdown-item" href="#">January</a>
                                                <a className="dropdown-item" href="#">February</a>
                                                <a className="dropdown-item" href="#">March</a>
                                                <a className="dropdown-item" href="#">April</a>
                                                <a className="dropdown-item" href="#">May</a>
                                                <a className="dropdown-item" href="#">June</a>
                                                <a className="dropdown-item" href="#">July</a>
                                                <a className="dropdown-item" href="#">August</a>
                                                <a className="dropdown-item" href="#">September</a>
                                                <a className="dropdown-item" href="#">October</a>
                                                <a className="dropdown-item" href="#">November</a>
                                                <a className="dropdown-item" href="#">December</a>
                                            </div>
                                            */}
                                        {/* </div>
                                    </div>
                                </div>
                                <div className="table-container">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Attendance</th>
                                            </tr>
                                        </thead>
                                        <tbody id="attendance-data">
                                          {attendanceData.map((attendance, index) => (
                                            <tr key={index}>
                                              <td>{attendance.date}</td>
                                              <td>{attendance.attendance}</td>
                                            </tr>
                                          ))}
                                            {/* Here goes the attendance data for the selected month */}
                                            {/* Attendance data will be dynamically inserted here */}
                                        {/* </tbody>
                                    </table>
                                    <p>Total Attendance:{' '} <span id="total-attendance">{calculateTotalAttendance(attendanceData)}%</span></p>
                                </div>
                            </div> */} 
                                <div>
      <h1>Student Portal</h1>
      <h2>
        Attendance for{' '}
        {new Date(currentYear, selectedMonth).toLocaleString('default', { month: 'long', year: 'numeric' }).replace(/\b0+/g, '')}
      </h2>
      <select value={selectedMonth} onChange={handleMonthChange}>
        {[...Array(12)].map((_, index) => (
          <option key={index} value={index}>
            {new Date(currentYear, index, 1).toLocaleString('default', { month: 'long', year: 'numeric' }).replace(/\b0+/g, '')}
          </option>
        ))}
      </select>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.filter(
            (attendance) => new Date(attendance.date).getMonth() === selectedMonth
          ).map((attendance, index) => (
            <tr key={index}>
              <td>{attendance.date}</td>
              <td>{attendance.attendance}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total Days: {totalDays}</h3>
      <h3>Present Days: {presentDays}</h3>
      <h3>Percentage: {percentage.toFixed(2)}%</h3>
    </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Studentprofile;