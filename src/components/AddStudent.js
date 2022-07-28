import React, { useState } from "react";
import Card from "../UI/Card";
import useInput from "../Hooks/use-input";
import "./AddStudent.css";
import axios from "axios";

const FirstNameValidity = (name) => {
  if (name.trim().length > 0) return true;
  return false;
};

const AddStudent = () => {
  const {
    InputValue: FirstName,
    showError: FirstNameShowError,
    onBlur: FirstNameonBlur,
    onChangeValue: FirstNameOnChangeValue,
    isValid: FirstNameIsValid,
    onSubmit: FirstNameOnSubmit,
    reset: FirstNameReset,
  } = useInput(FirstNameValidity);
  const {
    InputValue: LastName,
    showError: LastNameShowError,
    onBlur: LastNameonBlur,
    onChangeValue: LastNameOnChangeValue,
    isValid: LastNameIsValid,
    onSubmit: LastNameOnSubmit,
    reset: LastNameReset,
  } = useInput(FirstNameValidity);

  const isFormValid = LastNameIsValid && FirstNameIsValid;
  const [loading, handleLoading] = useState(false);
  const [error, showError] = useState(null);
  const [success, showSucces] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      FirstNameOnSubmit();
      LastNameOnSubmit();
      return;
    }
    const obj = {
      first_name: FirstName,
      last_name: LastName,
    };
    try {
      handleLoading(true);
      const res = await axios({
        method: "POST",
        url: "http://localhost:8000/api/v1/student",
        data: obj,
      });
      handleLoading(false);
      showSucces("Data added Sucessfully!!");
      setTimeout(() => {
        showSucces(null);
      }, 3000);
    } catch (error) {
      handleLoading(false);
      showError(error.message);
      setTimeout(() => {
        showError(null);
      }, 3000);
    }
    LastNameReset();
    FirstNameReset();
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error !== null && <Card className="error small">{error} !!</Card>}
      {success !== null && <Card className="small complete">{success}</Card>}
      <form onSubmit={submitHandler}>
        <Card className="student-form">
          <h1>Add Student Form</h1>
          <label htmlFor="firstname" className="input-heading">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            value={FirstName}
            id="firstname"
            onBlur={FirstNameonBlur}
            onChange={FirstNameOnChangeValue}
          />
          {FirstNameShowError && (
            <p className="error">Please Enter a Valid First Name</p>
          )}
          <label htmlFor="lastname" className="input-heading">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            value={LastName}
            id="lastname"
            onBlur={LastNameonBlur}
            onChange={LastNameOnChangeValue}
          />
          {LastNameShowError && (
            <p className="error">Please Enter a Valid Last Name</p>
          )}
          <input type="submit" value="Submit" id="submit" />
        </Card>
      </form>
    </>
  );
};

export default AddStudent;
