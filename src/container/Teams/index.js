/*------------ index.js ---------------*/
import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import axios from "axios";
import AddStudents from './addStudents';

export default class Student extends Component {
    constructor(props){
        super(props);
        this.state = {
            students: [],
            newStudentData: {
              first_name: "",
              last_name: "",
              email: "",
              phone: "",
            },
            isLoading: false,
            status: "",
            newStudentModal: false,
        }
    }

    componentDidMount() {
        this.getStudents();
      }      
    getStudents() {
    axios.get("http://localhost:8000/api/students").then((response) => {
        if (response.status === 200) {
        this.setState({
            students: response.data.data ? response.data.data : [],
        });
        }
        if (
        response.data.status === "failed" &&
        response.data.success === false
        ) {
        this.setState({
            noDataFound: response.data.message,
        });
        }
    });
    } 

    toggleNewStudentModal = () => {
        this.setState({
          newStudentModal: !this.state.newStudentModal,
        });
      };
    onChangeAddStudentHandler = (e) => {
        let { newStudentData } = this.state;
        newStudentData[e.target.name] = e.target.value;
        this.setState({ newStudentData });
    };
    addStudent = () => {
        axios
          .post(
            "http://localhost:8000/api/create-student",
            this.state.newStudentData
          )
          .then((response) => {
            const { students } = this.state;
            const newStudents = [...students];
            newStudents.push(response.data);
            this.setState(
              {
                students: newStudents,
                newStudentModal: false,
                newStudentData: {
                  first_name: "",
                  last_name: "",
                  email: "",
                  phone: "",
                },
              },
              () => this.getStudents()
            );
          });
      };
    
  render() {
    const { newStudentData, noDataFound, students} = this.state;
      let studentsDetails = [];
      if (students.length) {
        studentsDetails = students.map((student) => {
          return (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{student.full_name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>
                <Button
                  color="success"
                  className="mr-3"
                  size="sm"
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  size="sm"
                >
                  Delete
                </Button>
              </td>
            </tr>
          );
        });
      }
  
      if (this.state.isLoading) {
        return <div className="spinner-border text-center" role="status"> <span className="sr-only">Loading...</span>
      </div>
      } 
    return (
      <div className="App container mt-4">
           <h4 className="font-weight-bold">Students Registration</h4> 
           <AddStudents
                toggleNewStudentModal={this.toggleNewStudentModal}
                newStudentModal={this.state.newStudentModal}
                onChangeAddStudentHandler={this.onChangeAddStudentHandler}
                addStudent={this.addStudent}
                newStudentData={newStudentData}
          />
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          {students.length === 0 ? (
            <tbody>
              <h3>{noDataFound}</h3>
            </tbody>
          ) : (
            <tbody>{studentsDetails}</tbody>
          )}
        </Table>
      </div>
    );
  }
}