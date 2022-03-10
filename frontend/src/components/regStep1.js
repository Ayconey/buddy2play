import React, { Component } from 'react'
import {Form,Button,Row,Col} from 'react-bootstrap';

export default class regStep1 extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <div>
                <h1>Register</h1>
                <Row>
                    <Col></Col>
                    <Col>
                    <Form onSubmit={this.props.Continue}>

                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" name='username' onChange={this.props.handleChange}   />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name='email' onChange={this.props.handleChange}  />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else, except your mom.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name='password1' onChange={this.props.handleChange}  />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckPassword">
                        
                        <Form.Control type="password" placeholder="Check password" name='password2' onChange={this.props.handleChange}  />
                    </Form.Group>

                    <Button variant="primary" type="submit" >
                        Continue
                    </Button>
                    
                    </Form>
                    </Col>
                    <Col></Col>
                </Row>
            </div>
        )
    }
}
