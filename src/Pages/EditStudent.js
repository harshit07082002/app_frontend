import React, { useState } from "react";
import Card from "../UI/Card";
import AddStudent from "../components/AddStudent";
import EditStudentDetails from "../components/EditStudentDetails";
import "./EditStudent.css";

const EditStudent = () => {
  const [editType, editTypeHandler] = useState(0);

  const addStudentHandler = () => {
    editTypeHandler(1);
  };
  const editStudentHandler = () => {
    editTypeHandler(2);
  };
  let editDetails = <Card className="choose">Choose an Edit Option</Card>;
  if (editType === 1) {
    editDetails = <AddStudent />;
  } else if (editType === 2) {
    editDetails = <EditStudentDetails />;
  }
  return (
    <>
      <div className="editStudent">
        <button
          to={"/student"}
          className="addStudent"
          onClick={addStudentHandler}
        >
          Add new Student
        </button>
        <button
          to={"/student"}
          className="addStudent"
          onClick={editStudentHandler}
        >
          Edit Existing Student
        </button>
      </div>
      {editDetails}
    </>
  );
};

export default EditStudent;
