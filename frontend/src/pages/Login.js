import React, { Component,useRef } from 'react';
import {Form,Button,Row,Col} from 'react-bootstrap';
import { Navigate } from "react-router-dom";
import axios from 'axios';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state ={
            'logged':false,
        }
        
    }

    /*handleChange = (event) =>{
        const name = event.target.name;
        const val = event.target.value;
        let data = {};
        data[name]=val;
        this.setState(data);
        console.log(this.state);
    }*/

    handleSubmit = (event) =>{ //without state
        const email = event.target.email.value;
        const password = event.target.password.value;
        const username = event.target.username.value;
        let data = {
            "username":username,
            "email":email,
            "password":password
        }
        
        axios.post('http://127.0.0.1:8000/dj-rest-auth/login/',data)
        .then(response =>{
            this.props.setToken(response.data.key);
            
            
        })
        .catch(error => {console.log(error)})
        this.setState({'logged':true})
    }

    render() {
        if(this.state.logged){
            return <Navigate to='/'/>
        }
            return (
                <div>
                    <h1>Login</h1>
                    <Row>
                        <Col></Col>
                        <Col>
                        <Form onSubmit={this.handleSubmit}>
    
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" name='username' /* onChange={this.handleChange} */  />
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name='email' /* onChange={this.handleChange} */  />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else, except your mom.
                            </Form.Text>
                        </Form.Group>
    
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name='password' /* onChange={this.handleChange} */  />
                        </Form.Group>
    
                        <Button variant="primary" type="submit" >
                            Submit
                        </Button>
                        </Form>
                        </Col>
                        <Col></Col>
                    </Row>
                </div>
            )
        }
}
