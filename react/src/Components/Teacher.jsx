import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import './Student.css';
// import nm from '../Images/username.png';
// import pass from '../Images/password.jpg';
{/* Import images import user_icon from "../images/user_icon.png"
import email_icon from "../images/email_icon.png"
import password_icon from "../images/password_icon.png"
*/}

const Student = () => {
  const [action,setAction] = useState("Teacher");
  const [formData, setFormData] = useState({
    
    email: '',
    password: '',
    
  })

  const [errors, setErrors] = useState({})
  const navigate = useNavigate();
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
        ...formData, [name] : value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = {}
    if(!formData.email.trim()) {
      validationErrors.email = "email is required"
  } else if(!/\S+@\S+\.\S+/.test(formData.email)){
      validationErrors.email = "email is not valid"
  }

  if(!formData.password.trim()) {
      validationErrors.password = "password is required"
  } else if(formData.password.length < 8){
      validationErrors.password = "password should be at least 8 char"
  }

    setErrors(validationErrors);

    // Check if there are no validation errors
    if (Object.keys(validationErrors).length === 0) {
      // Navigate to the appropriate page based on the user role
      if (action === "Teacher") {
        navigate("/Teacherprofile");
      } else if (action === "Principal") {
        navigate("/Principalprofile");
      }
    }
  };
  const handleForgotPassword = () => {
    navigate("/Forgot");
  };
  return (
    <form onSubmit={handleSubmit} id="teacher">
    <div className="container-login hover-effect">
      <div className="box box1">
        <div className="stud">Teachers Portal</div>
        <div className="text stud-1">{action}</div>
        <div className="underline"></div>
    
      <div className="submit-container">
        <div className="hover-effect">
          <div className={action==="Principal"?"submit gray":"submit"} onClick={()=>{setAction("Teacher")}}>Teacher's Login</div>
        </div>
        <div className="hover-effect">
          <div className={action==="Teacher"?"submit gray":"submit"} onClick={()=>{setAction("Principal")}}>Principal's Login</div>
        </div>
      </div>

      {/* <div className="inputs"> */}
        <div className="input_box">
          <img  alt="" />
          <input type="email" name="email" placeholder="example@gmail.com" autoComplete='off' onChange={handleChange} />
          {errors.email && <span>{errors.email}</span>} 
        </div>

        <div className="input_box">
          <img  alt="" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />
          {errors.password && <span>{errors.password}</span>}
        </div>
      
      {action === "Teacher" ? (
          <div className="forgot-password" onClick={handleForgotPassword}>
            Forgot Password?<span>Click Here</span>
          </div>
        ) : (
          <div></div>
        )}
      {action === "Principal" ? (
          <div className="forgot-password" onClick={handleForgotPassword}>
            Forgot Password?<span>Click Here</span>
          </div>
        ) : (
          <div></div>
        )}
      <div className="submit-container hover-effect">
      <button className={action==="Principal's Login Teacher's Login"?"submit gray":"submit"} type="submit">Submit</button>
      </div>
      </div>
    </div>
    </form>
  );
};

export default Student;