import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap'
import { connect } from 'react-redux'
import { addItems } from '../actions/itemAction'

class ItemModal extends React.Component {
    state = {
        modal: false,
        name: ''
    }
    toggle = () => {
        this.setState(state => ({
            ...state,
            modal: !this.state.modal
        })) 
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            name: this.state.name
        }
        this.props.addItems(newItem)
        this.toggle()
    }
    render () {
        return (
            <div>
                <Button color="dark" style={{marginBottom: "2rem"}} onClick={this.toggle}>Add Item</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Email</Label>
                                <Input type="text" name="name" id="item" placeholder="Add a List item" onChange={this.onChange} />
                                <Button color="dark" style={{marginTop: "1.5rem"}} block>Create Item</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default connect(null, {addItems})(ItemModal)