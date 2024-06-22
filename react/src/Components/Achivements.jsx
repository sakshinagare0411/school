import React, { useEffect,useState } from "react";
import './Achivements.css';
import img1 from '../Images/s1.jpg';
import img2 from '../Images/s2.jpeg';
import img3 from '../Images/s3.jpeg';
import axios from "axios";

const Achivement = () => {
  const [Achivements, setAchivements] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/teacher/getAchivement/")
    .then(response => {
      setAchivements(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  },[]);

  return (
    <div className="containerAchivement" id="achivement">
      <div className="row">
        <div className="col-lg-12">
          <h4 className="mb-4 achievements-heading mt-minus-4 text-center hover-effect">Achievements</h4>
        </div>
      </div>

      {/* Achievement Cards */}
      <div className="row">
        {Achivements.map(achivements=>(
        <div key={achivements.achivementsId}>
        
        <div className="col-lg-4 col-md-6">
          <div className="card achievement hover-effect">
            <img src={achivements.achivementsImage} className="card-img-top" alt="Achievement 1" />
            <div className="card-body">
              <h5 className="card-title">Title:{achivements.achivementsTitle}</h5>
              <p className="card-text">{achivements.achivementsContent}</p>
            </div>
          </div>
        </div>

        
      </div>
        ))}

    </div>
    </div>
  );
};

export default Achivement;