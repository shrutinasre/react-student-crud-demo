import axios from "axios";
import { toast } from "react-toastify";

export const getStudents = async () => {
  try {
    const studentResponse = await axios.get("http://localhost:5005/api/student");
    const students = await studentResponse.json();
    return students;
  } catch (e) {
    console.log("Error Occured::", e);
    toast.error("Unable to get students data");
    return [];
  }
};

export const addStudent = async (fname, lname, dob, gender, address, city, mobile, email) => {
  let isAdded = false;
  try {
    const studentResponse = await axios.post("http://localhost:5005/api/student", {
      fname,
      lname,
      dob,
      gender,
      address,
      city,
      mobile,
      email,
    });
    console.log("studentResponse", studentResponse);
    const newStudent = studentResponse.data;
    if (newStudent && newStudent.id > 0) {
      isAdded = true;
      toast.success("Student added successfully");
    } else {
      isAdded = false;
      toast.error("Unable to add student. Please try again.");
    }
  } catch (e) {
    console.log("Error Occured::", e);
    toast.error("Error Occured while adding student");
  }
  return isAdded;
};

export const updateStudent = async (fname, lname, dob, gender, address, city, mobile, email) => {
  let isUpdated = false;
  try {
    const studentResponse = await axios.put("http://localhost:5005/api/student", {
      fname,
      lname,
      dob,
      gender,
      address,
      city,
      mobile,
      email,
    });
    console.log("studentResponse::", studentResponse);
    const newStudent = studentResponse.data;
    if (newStudent && newStudent.id) {
      isUpdated = true;
      toast.success("Student Updated successfully");
    } else {
      isUpdated = false;
      toast.error("Unable to update student. Please try again.");
    }
  } catch (e) {
    console.log("Error Occured::", e);
    toast.error("Error Occured while updating student");
  }
  return isUpdated;
};

export async function deleteStudent(id) {
  let isDeleted = false;
  try {
    const response = await axios.delete("http://localhost:5005/api/emp/" + id);
    console.log("response", response);
    toast.success("Employee deleted successfully");
  } catch (e) {
    console.log("Error Occured::", e);
    toast.error("Error Occured while deleting student");
  }

  return isDeleted;
}
