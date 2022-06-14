import React, { Component } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { deleteStudent, getAllStudents } from "../Services/studentServiceFromLocal";
import StudentForm from "./StudentForm";
import { Table, Modal, Button } from "react-bootstrap";

function StudentList() {
  const defaultFormValues = {
    id: 0,
    fname: "",
    lname: "",
    dob: "",
    gender: "",
  };
  const [studentArray, setStudentArray] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(defaultFormValues);
  const handleModalClose = () => {
    setModalShow(!modalShow);
  };
  useEffect(() => {
    setStudentArray(getAllStudents());
  }, [studentArray]);

  const handleDelete = (studId) => {
    console.log("handleDelete::", studId);
    deleteStudent(studId);
    setStudentArray(getAllStudents());
    console.log("handleDelete studentArray::", studentArray);
  };
  const handleEdit = (stud) => {
    setModalShow(true);
    console.log("handleEdit::", stud);
    setSelectedStudent(stud);
  };
  const handleFormReset = () => {
    console.log("from handleFormReset");
    setSelectedStudent(defaultFormValues);
  };

  const handleUpdateList = () => {
    //setStudentArray(getAllStudents());
    setModalShow(false);
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mt-3">Student List</h2>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setSelectedStudent(defaultFormValues);
                handleModalClose();
              }}
            >
              + Add New Student
            </button>
          </div>

          <hr />
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date Of Birth</th>
            <th>Gender</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {studentArray.map((stud, idx) => {
            console.log("idx", idx);
            return (
              <tr key={idx}>
                <td className="text-center">{stud.id}</td>
                <td>{stud.fname}</td>
                <td>{stud.lname}</td>
                <td>{stud.dob}</td>
                <td>{stud.gender}</td>
                <td className="text-center">
                  <Button
                    variant="danger"
                    className="me-2"
                    onClick={() => {
                      handleDelete(stud.id);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => {
                      handleEdit(stud);
                    }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Modal show={modalShow} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedStudent.id > 0 ? "Update Student" : "Add New Student"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StudentForm student={selectedStudent} resetForm={handleFormReset} showModal={setModalShow} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default StudentList;
