import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import MainBody from "./Pages/MainBody";
import Books from "./Pages/Books";
import Student from "./Pages/Student";
import EditStudent from "./Pages/EditStudent";
import EditBooks from "./Pages/EditBooks";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainBody />} />
        <Route path="/student" element={<Student />} />
        <Route path="/books" element={<Books />} />
        <Route path="/student/edit" element={<EditStudent />} />
        <Route path="/books/edit" element={<EditBooks />} />
      </Routes>
    </div>
  );
};

export default App;
