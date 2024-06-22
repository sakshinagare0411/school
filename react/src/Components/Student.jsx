import React, {useState} from "react";
import './Student.css';
// import nm from '../Images/username.png';
// import pass from '../Images/password.jpg';
import { useNavigate } from "react-router-dom";
{/* Import images import user_icon from "../images/user_icon.png"
import email_icon from "../images/email_icon.png"
import password_icon from "../images/password_icon.png"
*/}
//
const Student = () => {
  const [action,setAction] = useState("Login");
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
        ...formData, [name] : value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = {}
    if(!formData.username.trim()) {
        validationErrors.username = "username is required"
    }


    if(!formData.password.trim()) {
        validationErrors.password = "password is required"
    } else if(formData.password.length < 6){
        validationErrors.password = "password should be at least 6 char"
    }

   
    setErrors(validationErrors)

    // If there are no validation errors, navigate to /Studentprofile page
    if (Object.keys(validationErrors).length === 0) {
      navigate("/Studentprofile");
    }

  }


  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit} id="student">
    <div className="container-login hover-effect">
      <div className="box">
        <div className="stud">Student Portal</div>
        <div className="text stud-1">{action}</div>
        <div className="underline"></div>
      
      {/* <div className="inputs"> */}
        <div className="input_box">
          <img  alt="" /> {/*src={user_icon}*/}
          <input type="text" name="username" placeholder="Username" autoComplete='off' onChange={handleChange} />
          {errors.username && <span>{errors.username}</span>}
        </div>

        <div className="input_box">
          <img  alt="" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />
          {errors.password && <span>{errors.password}</span>}
        </div>
        <div className="submit-container hover-effect">
      <button className={action==="Login"?"submit":"submit gray"} type="submit">Submit</button>
      </div>
      </div>
      
      {/* <div className="submit-container">
      <button className={action==="Login"?"submit":"submit gray"} type="submit">Submit</button>
      </div> */}
    {/* </div> */}
    </div>
    </form>
  )
}

export default Student;