import { toast } from "react-toastify";

let studentArray = [
  {
    id: 1,
    fname: "Shruti",
    lname: "Nasre",
    dob: "22",
    gender: "female",
  },
  {
    id: 2,
    fname: "XYZ",
    lname: "Nasre",
    dob: "22",
    gender: "male",
  },
  {
    id: 3,
    fname: "ABC",
    lname: "Nasre",
    dob: "26",
    gender: "female",
  },
];

export const getAllStudents = () => {
  return studentArray;
};

export const createStudent = (fname, lname, dob, gender) => {
  const student = {
    id: studentArray.length + 1,
    fname,
    lname,
    dob,
    gender,
  };
  studentArray.push(student);
  toast.success("Student added successfully");
};

export const deleteStudent = (id) => {
  console.log("before delete::", studentArray);
  //getting index of an object
  const studIndex = studentArray.findIndex((stud) => stud.id == id);
  //passing index to splice method to remove object
  //studentArray.splice(studIndex, 1);
  const newArr = studentArray.filter((st) => st.id != id);
  studentArray = newArr;
  console.log("after delete::", studentArray);
  toast.success("Student deleted successfully");
};

export const updateStudent = (id, fname, lname, dob, gender) => {
  //getting index of an object
  const studIndex = studentArray.findIndex((stud) => stud.id == id);
  //passing index to splice method to update object
  studentArray[studIndex].fname = fname;
  studentArray[studIndex].lname = lname;
  studentArray[studIndex].dob = dob;
  studentArray[studIndex].gender = gender;

  toast.success("Student updated successfully");
};
