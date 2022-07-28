import Card from "../UI/Card";
import React from "react";
import { Link } from "react-router-dom";
import "./Details.css";

const Details = (props) => {
  const name = props.name;
  const where = name === "Student" ? "student" : "books";
  return (
    <div>
      <Card className="container">
        <h1>{name} Details</h1>
        <Link to={`/${where}`} className="button">
          Show {name} Details
        </Link>
        <Link to={`/${where}/edit`} className="button">
          Edit {name} Details
        </Link>
      </Card>
    </div>
  );
};

export default Details;
