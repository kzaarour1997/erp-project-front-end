import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input,
  } from "reactstrap";

export default class addTeams extends Component {
  render() {
    return (
      <div>
        <Button
          className="float-right mb-4"
          color="primary"
          onClick={this.props.toggleNewTeamModal}
        >
          Add Team
        </Button>
        <Modal
          isOpen={this.props.newTeamModal}
          toggle={this.props.toggleNewTeamModal}
        >
          <ModalHeader toggle={this.props.toggleNewTeamModal}>
            Add new Team
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Team Name</Label>
              <Input
                id="name"
                name="name"
                value={this.props.newTeamData.name}
                onChange={this.props.onChangeAddTeamHandler}
              />
            </FormGroup>
           

           
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.props.addTeam()}>
              Add
            </Button>{" "}
            <Button color="secondary" onClick={this.props.toggleNewTeamModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}