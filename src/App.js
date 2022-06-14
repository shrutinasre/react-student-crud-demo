import React, { Component } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import StudentList from "./Components/StudentList";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Container>
        <StudentList />
      </Container>
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;
