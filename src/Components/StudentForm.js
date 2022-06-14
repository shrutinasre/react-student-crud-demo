import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useEffect } from "react";
import { updateStudent, createStudent } from "../Services/studentServiceFromLocal";

function StudentForm({ student, resetForm, showModal }) {
  //N-New Mode,  E-Edit Mode
  const [mode, setMode] = useState("N");
  useEffect(() => {
    if (student && student.id > 0) {
      setMode("E");
    } else {
      setMode("N");
    }
  }, [student]);

  const doFormReset = () => {
    resetForm();
    formik.handleReset();
  };

  const formik = useFormik({
    initialValues: student,
    validationSchema: Yup.object({
      fname: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
      lname: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
      dob: Yup.string().required("Required"),
      gender: Yup.string().required("Required"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("mode:", mode, values);
      if (mode == "E") {
        //update student
        console.log("updating student");
        updateStudent(student.id, values.fname, values.lname, values.dob, values.gender);
        showModal(false);
      } else {
        // create student
        console.log("creating student");
        createStudent(values.fname, values.lname, values.dob, values.gender);
        showModal(false);
      }
    },
  });
  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="fnameInput" className="form-label">
                First Name
              </label>
              <input type="text" className={"form-control " + (formik.touched.fname && formik.errors.fname ? "is-invalid" : "")} id="fnameInput" placeholder="Please Enter First Name" name="fname" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fname} />
              <small className="text-danger fw-bold">{formik.touched.fname && formik.errors.fname ? <div>{formik.errors.fname}</div> : null}</small>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="lnameInput" className="form-label">
                Last Name
              </label>
              <input type="text" className={"form-control " + (formik.touched.fname && formik.errors.fname ? "is-invalid" : "")} id="lnameInput" placeholder="Please Enter Last Name" name="lname" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lname} />
              <small className="text-danger fw-bold">{formik.touched.lname && formik.errors.lname ? <div>{formik.errors.lname}</div> : null}</small>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="dobInput" className="form-label">
                Date of Birth
              </label>
              <input type="date" className={"form-control " + (formik.touched.fname && formik.errors.fname ? "is-invalid" : "")} id="lnameInput" placeholder="Please Enter your date of birth" name="dob" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.dob} />
              <small className="text-danger fw-bold">{formik.touched.dob && formik.errors.dob ? <div>{formik.errors.dob}</div> : null}</small>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <div className="form-check">
              {/*Use  {...formik.getFieldProps('fieldName')} in place of  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.gender} */}
              <input className="form-check-input" type="radio" name="gender" id="maleRadio" onChange={formik.handleChange} value="male" checked={formik.values.gender == "male" ? true : false} />
              <label className="form-check-label" htmlFor="maleRadio">
                Male
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="gender" id="femaleRadio" onChange={formik.handleChange} value="female" checked={formik.values.gender == "female" ? true : false} />
              <label className="form-check-label" htmlFor="femaleRadio">
                Female
              </label>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <button type="submit" className={"btn me-2 " + (mode == "N" ? "btn-primary" : "btn-warning")}>
              {mode == "N" ? "Save Student" : "Update Student"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => doFormReset()}>
              Reset
            </button>
          </div>
        </div>
      </Form>
    </>
  );
}

export default StudentForm;
