import React, { Component } from 'react'
import axios from 'axios'
import {Button,Form,Row,Col,Modal} from 'react-bootstrap'
import { Navigate } from "react-router-dom";
export default class YourProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            user:{},
            edit_mode:false,
            changed_user:{},
            show_popup:false,
            deleted:false,
        }
    }

    componentDidMount(){
        this.getData();
    }

    getData = () => {
        axios.get(`http://127.0.0.1:8000/api/users/${this.props.user_id}/profile/`)
        .then(Response=>{
            
            this.setState({user:Response.data})
        })
        .catch(error=>{console.log(error)})
    }

    handleDelete = () => {
        axios.delete(`http://127.0.0.1:8000/api/users/${this.props.user_id}/`)
        .then(Response=>{
            
            this.setState({deleted:true})
        })
        .catch(error=>{console.log(error)})
    }

    changeMode = () =>{
        this.setState({edit_mode:!this.state.edit_mode})
    }

    handleSubmit = (event) =>{ //without state
        event.preventDefault();
        let data = {
            "user":this.props.user_id,
            "name":event.target.name.value,
            "surname":event.target.surname.value,
            "sport":event.target.sport.value,
            "gender":event.target.gender.value,
            "country":event.target.country.value,
            "city":event.target.city.value,
        }
        
        axios.put(`http://127.0.0.1:8000/api/users/${this.props.user_id}/profile/`,data)
        .then(response =>{
             
        })
        .catch(error => {console.log(error)})
    }

  render() {
    if(this.state.deleted){
        return <Navigate to='/'/>
    }
    if(this.state.edit_mode){
        return (
            <div>
            <Row>
                <Col></Col>
                <Col>
                    <Form onSubmit={this.handleSubmit}>
                    <h1>Your Profile</h1>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>name</Form.Label>
                        <Form.Control type="text" defaultValue={this.state.user.name} name='name' />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>surname</Form.Label>
                        <Form.Control type="text" defaultValue={this.state.user.surname} name='surname' />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>sport</Form.Label>
                        <Form.Control type="text" defaultValue={this.state.user.sport} name='sport' />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>gender</Form.Label>
                        <Form.Control type="text" defaultValue={this.state.user.gender} name='gender' />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>country</Form.Label>
                        <Form.Control type="text" defaultValue={this.state.user.country} name='country' />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>city</Form.Label>
                        <Form.Control type="text" defaultValue={this.state.user.city} name='city' />
                    </Form.Group>

                    <Button type="submit">Confirm</Button><Button onClick={()=>{this.changeMode()}}>Cancel</Button>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
            
            </div>
          )
    }
    return (
      <div>
        <Modal show={this.state.show_popup} onHide={()=>{this.setState({show_popup:false})}}>
        <Modal.Header closeButton>
            <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <p>Are you sure you want to delete your account?</p>
            <p>you will never be able to restore your profile</p>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" onClick={()=>{this.setState({show_popup:false})}}>Cancel</Button>
            <Button variant="primary" onClick={this.handleDelete}>Yes</Button>
        </Modal.Footer>
        </Modal>
        <h1>Your Profile</h1>
        <h2>name: {this.state.user.name}</h2>
        <h2>surname: {this.state.user.surname}</h2>
        <h2>sport: {this.state.user.sport}</h2>
        <h2>gender: {this.state.user.gender}</h2>
        <h2>country: {this.state.user.country}</h2>
        <h2>city: {this.state.user.city}</h2>
        <Button onClick={()=>{this.changeMode()}}>Edit</Button>
        <Button variant="danger" onClick={()=>{this.setState({show_popup:true})}}>Delete Your Account</Button>
      </div>
    )
  }
}
