/* ----- addTeams.js -----*/
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
        <Button className="float-right mb-4" color="primary">
          Add Team
        </Button>
        <Modal>
          <ModalHeader>Add new Team</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input id="name" name="name" />
            </FormGroup>
           
          </ModalBody>
          <ModalFooter>
            <Button color="primary"> Add </Button>
            <Button color="secondary"> Cancel </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}