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
    InputValue: BookName,
    showError: BookNameShowError,
    onBlur: BookNameonBlur,
    onChangeValue: BookNameOnChangeValue,
    isValid: BookNameIsValid,
    onSubmit: BookNameOnSubmit,
    reset: BookNameReset,
  } = useInput(FirstNameValidity);
  const {
    InputValue: AuthorName,
    showError: AuthorNameShowError,
    onBlur: AuthorNameonBlur,
    onChangeValue: AuthorNameOnChangeValue,
    isValid: AuthorNameIsValid,
    onSubmit: AuthorNameOnSubmit,
    reset: AuthorNameReset,
  } = useInput(FirstNameValidity);
  const {
    InputValue: BorrowedBy,
    showError: BorrowedByShowError,
    onBlur: BorrowedByonBlur,
    onChangeValue: BorrowedByOnChangeValue,
    isValid: BorrowedByIsValid,
    onSubmit: BorrowedByOnSubmit,
    reset: BorrowedByReset,
  } = useInput((x) => true);
  const {
    InputValue: DateOfBorrow,
    showError: DateOfBorrowShowError,
    onBlur: DateOfBorrowonBlur,
    onChangeValue: DateOfBorrowOnChangeValue,
    isValid: DateOfBorrowIsValid,
    onSubmit: DateOfBorrowOnSubmit,
    reset: DateOfBorrowReset,
  } = useInput((x) => true);
  const {
    InputValue: DateOfReturn,
    showError: DateOfReturnShowError,
    onBlur: DateOfReturnonBlur,
    onChangeValue: DateOfReturnOnChangeValue,
    isValid: DateOfReturnIsValid,
    onSubmit: DateOfReturnOnSubmit,
    reset: DateOfReturnReset,
  } = useInput((x) => true);

  const isFormValid = BookNameIsValid && AuthorNameIsValid;
  const [loading, handleLoading] = useState(false);
  const [error, showError] = useState(null);
  const [success, showSucces] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      BookNameOnSubmit();
      AuthorNameOnSubmit();
      return;
    }
    const obj = {
      author_name: AuthorName,
      book_name: BookName,
      borrowed_by: BorrowedBy,
      date_of_borrow: DateOfBorrow,
      date_of_return: DateOfReturn,
    };
    try {
      handleLoading(true);
      const res = await axios({
        method: "POST",
        url: "http://localhost:8000/api/v1/books",
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
    BookNameReset();
    AuthorNameReset();
    DateOfBorrowReset();
    DateOfReturnReset();
    BorrowedByReset();
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error !== null && <Card className="error small">{error} !!</Card>}
      {success !== null && <Card className="small complete">{success}</Card>}
      <form onSubmit={submitHandler}>
        <Card className="student-form">
          <h1>Add Book Form</h1>
          <label htmlFor="firstname" className="input-heading">
            Book Name
          </label>
          <input
            type="text"
            name="firstname"
            value={BookName}
            id="firstname"
            onBlur={BookNameonBlur}
            onChange={BookNameOnChangeValue}
          />
          {BookNameShowError && (
            <p className="error">Please Enter a Valid First Name</p>
          )}
          <label htmlFor="lastname" className="input-heading">
            Author Name
          </label>
          <input
            type="text"
            name="lastname"
            value={AuthorName}
            id="lastname"
            onBlur={AuthorNameonBlur}
            onChange={AuthorNameOnChangeValue}
          />
          {AuthorNameShowError && (
            <p className="error">Please Enter a Valid Last Name</p>
          )}
          <label htmlFor="borrowname" className="input-heading">
            Borrower Name
          </label>
          <input
            type="text"
            name="borrowname"
            value={BorrowedBy}
            id="lastname"
            onBlur={BorrowedByonBlur}
            onChange={BorrowedByOnChangeValue}
          />
          {BorrowedByShowError && (
            <p className="error">Please Enter a Valid Last Name</p>
          )}
          <label htmlFor="dateofborrow" className="input-heading">
            Date Of Borrow
          </label>
          <input
            type="date"
            name="dateofborrow"
            value={DateOfBorrow}
            id="lastname"
            onBlur={DateOfBorrowonBlur}
            onChange={DateOfBorrowOnChangeValue}
          />
          {DateOfBorrowShowError && (
            <p className="error">Please Enter a Valid Last Name</p>
          )}
          <label htmlFor="dateofreturn" className="input-heading">
            Date of Return
          </label>
          <input
            type="date"
            name="dateofreturn"
            value={DateOfReturn}
            id="lastname"
            onBlur={DateOfReturnonBlur}
            onChange={DateOfReturnOnChangeValue}
          />
          {DateOfReturnShowError && (
            <p className="error">Please Enter a Valid Last Name</p>
          )}
          <input type="submit" value="Submit" id="submit" />
        </Card>
      </form>
    </>
  );
};

export default AddStudent;
