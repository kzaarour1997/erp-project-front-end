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

export default class editTeam extends Component {
  render() {  
    return (
      <div>
        <Modal
          isOpen={this.props.editTeamModal}
          toggle={this.props.toggleEditTeamModal}
        >
          <ModalHeader toggle={this.props.toggleEditTeamModal}>
            Update Team
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={this.props.editTeamData.name}
                onChange={this.props.onChangeEditTeamHandler}
              />
            </FormGroup>
         
          
           
          </ModalBody>
          <ModalFooter>
            <Button 
              color="primary" 
              onClick={this.props.updateTeam}
            >
              Update
            </Button>
            <Button
              color="secondary"
              onClick={this.props.toggleEditTeamModal}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}