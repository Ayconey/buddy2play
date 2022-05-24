import axios from 'axios';
import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import {Link} from 'react-router-dom';
import { Form, Button, Row, Col,ListGroup } from 'react-bootstrap';
import {BsFillPersonFill} from 'react-icons/bs'
import '../css/search.css'

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users:[],

        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const sport = event.target.sport.value;
        const gender = event.target.gender.value;
        const age_min = event.target.age_min.value;
        const age_max = event.target.age_max.value;
        const country = event.target.country.value;
        const city = event.target.city.value;

        const data = {
            "sport": sport,
            "gender": gender,
            "age_min": age_min,
            "age_max": age_max,
            "country": country,
            "city": city,
        }
        axios.post('http://127.0.0.1:8000/api/users/searched/', data)
            .then(Response => {
                this.setState({users:Response.data})
                
            })
            .catch(error => { console.log(error) })
    }

    render() {
            return (
                <div>
                    
                    <Row >
                        <h1>Filter</h1>
                        <Col></Col>
                        <Col>
                            <Form onSubmit={this.handleSubmit} >
    
                                <Form.Group className="mb-3" controlId="formf1">
                                    <Form.Label>Sport</Form.Label>
                                    <Form.Control type="text" placeholder="Sport" name='sport' />
                                </Form.Group>
    
                                <Form.Group className="mb-3" controlId="formf2">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Select name='gender'>
                                        <option></option>
                                        <option>male</option>
                                        <option>female</option>
                                    </Form.Select>
                                </Form.Group>

                                <Row>
                                    <Col><Form.Group className="mb-3" controlId="formf3">
                                        <Form.Label>Age min</Form.Label>
                                        <Form.Control type="text" placeholder="age min" name='age_min' />
                                    </Form.Group></Col>

                                    <Col><Form.Group className="mb-3" controlId="formf4">
                                        <Form.Label>Age max</Form.Label>
                                        <Form.Control type="text" placeholder="age max" name='age_max' />
                                    </Form.Group></Col>
                                </Row>
                                
                                <Form.Group className="mb-3" controlId="formf5">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control type="text" placeholder="Country" name='country' />
                                </Form.Group>
    
                                <Form.Group className="mb-3" controlId="formf6">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type="text" placeholder="City" name='city' />
                                </Form.Group>
    
    
                                <Button variant="primary" type="submit" >
                                    Search
                                </Button>
                            </Form>
                            <br></br>
                            <br></br>
                            <div className='users'>
                            <h2>Users</h2>
                            <ListGroup>
                                {this.state.users.map(user=>(
                                    <ListGroup.Item>
                                        <div key={user.user}>
                                            <h2>{user.name} {user.surname}</h2>
                                            <Link to ={`/profile/${user.user}`} ><Button>Profile <BsFillPersonFill></BsFillPersonFill></Button></Link>
                                        </div>
                                    </ListGroup.Item>
                                    
                                ))
                                }
                            </ListGroup>
                            
                            </div>
                        </Col>
                        <Col></Col>
                    </Row>
                    
                </div>
            )
        
    }
}
