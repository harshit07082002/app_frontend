import React from "react";
import Card from "../UI/Card";
import useInput from "../Hooks/use-input";
import "./EditStudentDetails.css";
import { useState } from "react";
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

  const {
    InputValue: NewFirstName,
    showError: NewFirstNameShowError,
    onBlur: NewFirstNameonBlur,
    onChangeValue: NewFirstNameOnChangeValue,
    isValid: NewFirstNameIsValid,
    onSubmit: NewFirstNameOnSubmit,
    reset: NewFirstNameReset,
  } = useInput(FirstNameValidity);
  const {
    InputValue: NewLastName,
    showError: NewLastNameShowError,
    onBlur: NewLastNameonBlur,
    onChangeValue: NewLastNameOnChangeValue,
    isValid: NewLastNameIsValid,
    onSubmit: NewLastNameOnSubmit,
    reset: NewLastNameReset,
  } = useInput(FirstNameValidity);

  const isFormValid =
    LastNameIsValid &&
    FirstNameIsValid &&
    NewLastNameIsValid &&
    NewFirstNameIsValid;

  const [loading, handleLoading] = useState(false);
  const [error, showError] = useState(null);
  const [success, showSucces] = useState(null);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      FirstNameOnSubmit();
      LastNameOnSubmit();
      NewFirstNameOnSubmit();
      NewLastNameOnSubmit();
      return;
    }
    const obj = {
      first_name: FirstName,
      last_name: LastName,
      new_first_name: NewFirstName,
      new_last_name: NewLastName,
    };
    try {
      handleLoading(true);
      const res = await axios({
        method: "POST",
        url: "http://localhost:8000/api/v1/student/update",
        data: obj,
      });
      console.log(res);
      handleLoading(false);
      showSucces("Data Changed Sucessfully!!");
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
    NewLastNameReset();
    NewFirstNameReset();
  };

  return (
    <>
      {loading && <p className="small">Loading...</p>}
      {error !== null && <Card className="error small">{error} !!</Card>}
      {success !== null && <Card className="small complete">{success}</Card>}
      <form onSubmit={submitHandler}>
        <Card className="student-form">
          <h1>Edit Student Details Form</h1>
          <label htmlFor="firstname" className="input-heading">
            Previous First Name
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
            Previous Last Name
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
          <label htmlFor="newfirstname" className="input-heading">
            Changed First Name
          </label>
          <input
            type="text"
            name="newfirstname"
            value={NewFirstName}
            id="firstname"
            onBlur={NewFirstNameonBlur}
            onChange={NewFirstNameOnChangeValue}
          />
          {NewFirstNameShowError && (
            <p className="error">Please Enter a Valid First Name</p>
          )}
          <label htmlFor="newlastname" className="input-heading">
            Changed Last Name
          </label>
          <input
            type="text"
            name="newlastname"
            value={NewLastName}
            id="lastname"
            onBlur={NewLastNameonBlur}
            onChange={NewLastNameOnChangeValue}
          />
          {NewLastNameShowError && (
            <p className="error">Please Enter a Valid Last Name</p>
          )}
          <input type="submit" value="Submit" id="submit" />
        </Card>
      </form>
    </>
  );
};

export default AddStudent;
