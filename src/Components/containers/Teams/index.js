import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import axios from "axios";
import AddTeams from './addTeams';
import EditTeam from './editTeam';

export default class Team extends Component {
    constructor(props) {
        super(props);
        this.state = {
          teams: [],
          newTeamData: {
            name: "",
            
          },
          isLoading: false,
          status: "",
          newTeamModal: false,
          editTeamData: {
            id: "",
            name: "",
            
          },
          editTeamModal: false,
          noDataFound: "",
        };
      }

    componentDidMount() {
        this.getTeams();
      }      
    getTeams() {
    axios.get("http://localhost:8000/api/team").then((response) => {
        if (response.status === 200) {
        this.setState({
            teams: response.data.data ? response.data.data : [],
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

    toggleNewTeamModal = () => {
        this.setState({
          newTeamModal: !this.state.newTeamModal,
        });
      };
    onChangeAddTeamHandler = (e) => {
        let { newTeamData } = this.state;
        newTeamData[e.target.name] = e.target.value;
        this.setState({ newTeamData });
    };
    addTeam = () => {
        axios
          .post(
            "http://localhost:8000/api/create-team",
            this.state.newTeamData
          )
          .then((response) => {
            const { teams } = this.state;
            const newTeams = [...teams];
            newTeams.push(response.data);
            this.setState(
              {
                teams: newTeams,
                newTeamModal: false,
                newTeamData: {
                  name: "",
                },
              },
              () => this.getTeams()
            );
          });
      };

      toggleEditTeamModal = () => {
        this.setState({
          editTeamModal: !this.state.editTeamModal,
        });
      };

      onChangeEditTeamHandler = (e) => {
        let { editTeamData } = this.state;
        editTeamData[e.target.name] = e.target.value;
        this.setState({ editTeamData });
      };

      editTeam = (id, name) => {
        this.setState({
          editTeamData: { id, name },
          editTeamModal: !this.state.editTeamModal,
        });
      };
      
      updateTeam = () => {
        let {
          id,
          name,
          
        } = this.state.editTeamData;
        this.setState({
          isLoading: true,
        });
        axios
          .post("http://localhost:8000/api/create-team", {
            name,
            
          })
          .then((response) => {
            this.getTeams();
            this.setState({
              editTeamModal: false,
              editTeamData: { name },
              isLoading:false,
            });
          })
          .catch((error) => {
            this.setState({isLoading:false})
            console.log(error.response);
          });
      };
    
      deleteTeam = (id) => {
        this.setState({
          isLoading: true,
        });
        axios
          .delete("http://localhost:8000/api/team/" + id)
          .then((response) => {
            this.setState({
              isLoading: false,
            });
            this.getTeams();
          })
          .catch((error) => {
            this.setState({
              isLoading: false,
            });
          });
      };
  
    
  render() {
    const { newTeamData,editTeamData,noDataFound,teams} = this.state;
      let teamsDetails = [];
      if (teams.length) {
        teamsDetails = teams.map((team) => {
          return (
            <tr key={team.id}>
              <td>{team.id}</td>
              <td>{team.name}</td>
             
              <td>
                <Button
                  color="success"
                  className="mr-3"
                  size="sm"
                  onClick={() =>
                    this.editTeam(
                      team.id,
                      team.name
                      
                    )
                  }
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => this.deleteTeam(team.id)}
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
           <h4 className="font-weight-bold">Teams Creation</h4> 
            {/* Model for Add Team Record */}
           <AddTeams
                toggleNewTeamModal={this.toggleNewTeamModal}
                newTeamModal={this.state.newTeamModal}
                onChangeAddTeamHandler={this.onChangeAddTeamHandler}
                addTeam={this.addTeam}
                newTeamData={newTeamData}
          />
         {/* Model for Edit Team Record */}
            <EditTeam
            toggleEditTeamModal={this.toggleEditTeamModal}
            editTeamModal={this.state.editTeamModal}
            onChangeEditTeamHandler={this.onChangeEditTeamHandler}
            editTeam={this.editTeam}
            editTeamData={editTeamData}
            updateTeam={this.updateTeam}
            />
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
             
              <th>Actions</th>
            </tr>
          </thead>
          {teams.length === 0 ? (
            <tbody>
              <h3>{noDataFound}</h3>
            </tbody>
          ) : (
            <tbody>{teamsDetails}</tbody>
          )}
        </Table>
      </div>
    );
  }
}