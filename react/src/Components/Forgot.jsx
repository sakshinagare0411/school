import React, {useState} from "react";
import './Student.css';
{/* Import images import user_icon from "../images/user_icon.png"
import email_icon from "../images/email_icon.png"
import password_icon from "../images/password_icon.png"
*/}

const Student = () => {
  const [action,setAction] = useState("Forgot Password");
  const [formData, setFormData] = useState({
        email: '',
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

    if(!formData.email.trim()) {
        validationErrors.email = "email is required"
    } else if(!/\S+@\S+\.\S+/.test(formData.email)){
        validationErrors.email = "email is not valid"
    }

    setErrors(validationErrors)

    if(Object.keys(validationErrors).length === 0) {
        alert("Email Send successfully")
    }

  }

  return (
    <div id="forgot-password">
    <form onSubmit={handleSubmit}>
    <div className="container-login">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
        <div className="input">
          <img src="" alt="" />
          <input type="email" name="email" placeholder="example@gmail.com" autoComplete='off' onChange={handleChange} />
          {errors.email && <span>{errors.email}</span>} 
        </div>
      <div className="submit-container">
      <button className={action==="Forgot Password"?"submit":"submit gray"} type="submit">Submit</button>
      </div>
    </div>
    </form>
    </div>
  )
}

export default Student;