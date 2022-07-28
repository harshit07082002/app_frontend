import React, { useEffect, useState } from "react";
import Student_Table from "../components/Student_Table";
import "./Student.css";

const Student = () => {
  const [loadingState, handleLoadingState] = useState(false);
  const [PrintError, handleError] = useState(null);
  const [data, changeData] = useState([]);
  useEffect(() => {
    const StudentTableDetails = async () => {
      handleLoadingState(true);
      const data = await fetch("http://localhost:8000/api/v1/student");
      if (!data.ok) throw new Error("Something went wrong!!");
      return await data.json();
    };
    StudentTableDetails()
      .then((val) => {
        console.log(val);
        changeData(val);
        handleLoadingState(false);
      })
      .catch((e) => {
        handleError(e.message);
        handleLoadingState(false);
      });
  }, []);
  return (
    <div>
      <h1 className="student-heading">Student Details:</h1>
      {loadingState && <p className="center">Loading...</p>}
      {!loadingState && PrintError === null && <Student_Table data={data} />}
      {!loadingState && PrintError !== null && (
        <p className="center error">{PrintError} !</p>
      )}
    </div>
  );
};

export default Student;
