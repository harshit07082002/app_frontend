import React, { useState } from "react";
import Card from "../UI/Card";
import AddBooks from "../components/AddBooks";
import EditBooksDetails from "../components/EditBooksDetails";
import "./EditStudent.css";

const EditBooks = () => {
  const [editType, editTypeHandler] = useState(0);

  const addStudentHandler = () => {
    editTypeHandler(1);
  };
  const editStudentHandler = () => {
    editTypeHandler(2);
  };
  let editDetails = <Card className="choose">Choose an Edit Option</Card>;
  if (editType === 1) {
    editDetails = <AddBooks />;
  } else if (editType === 2) {
    editDetails = <EditBooksDetails />;
  }
  return (
    <>
      <div className="editStudent">
        <button
          to={"/student"}
          className="addStudent"
          onClick={addStudentHandler}
        >
          Add new Book
        </button>
        <button
          to={"/student"}
          className="addStudent"
          onClick={editStudentHandler}
        >
          Edit Existing Book
        </button>
      </div>
      {editDetails}
    </>
  );
};

export default EditBooks;
