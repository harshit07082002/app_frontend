import { useEffect, useState } from "react";
import Books_Table from "../components/Books_Table";
import "./Books.css";

const Books = () => {
  const [loadingState, handleLoadingState] = useState(false);
  const [PrintError, handleError] = useState(null);
  const [data, changeData] = useState([]);
  useEffect(() => {
    const BookTableDetails = async () => {
      handleLoadingState(true);
      const data = await fetch("http://localhost:8000/api/v1/books");
      if (!data.ok) throw new Error("Something went wrong!!");
      return await data.json();
    };
    BookTableDetails()
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
      <h1 className="books-heading">Books Details:</h1>
      {loadingState && <p className="center">Loading...</p>}
      {!loadingState && PrintError === null && <Books_Table data={data} />}
      {!loadingState && PrintError !== null && (
        <p className="center error">{PrintError} !</p>
      )}
    </div>
  );
};

export default Books;
