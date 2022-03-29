import React, { Component } from 'react';
import {Form,Button,Row,Col} from 'react-bootstrap';

export default class regStep2 extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Personal Data</h1>
                <Row>
                    <Col></Col>
                    <Col>
                    <Form onSubmit={this.props.Continue}>

                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" name='name' onChange={this.props.handleChange}   />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formSurname">
                        <Form.Label>Surname</Form.Label>
                        <Form.Control type="Surname" placeholder="Surname" name='surname' onChange={this.props.handleChange}  />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select name='gender' onChange={this.props.handleChange}>
                                        <option></option>
                                        <option>male</option>
                                        <option>female</option>
                                    </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formbirthday">
                        <Form.Label>birthday</Form.Label>
                        <Row>
                            <Col><Form.Control type="text" placeholder="day" name='day' onChange={this.props.handleChange}  /></Col>
                            <Col><Form.Control type="text" placeholder="month" name='month' onChange={this.props.handleChange}  /></Col>
                            <Col><Form.Control type="text" placeholder="year" name='year' onChange={this.props.handleChange}  /></Col>
                        </Row>
                        
                        
                        
                        
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" placeholder="Country" name='country' onChange={this.props.handleChange}  />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="City" name='city' onChange={this.props.handleChange}  />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formSport">
                        <Form.Label>Sport</Form.Label>
                        <Form.Control type="text" placeholder="Sport" name='sport' onChange={this.props.handleChange}  />
                    </Form.Group>

                    <Button variant="primary" type="submit" >
                        Continue
                    </Button>
                    <Button variant="primary" onClick={this.props.Back} >
                        Back
                    </Button>
                    
                    </Form>
                    </Col>
                    <Col></Col>
                </Row>
                
            </div>
        )
    }
}
