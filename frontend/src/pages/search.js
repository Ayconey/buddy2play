import axios from 'axios';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';


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
        const lft = event.target.lft.value;
        const lfcg = event.target.lfcg.value;
        const age_min = event.target.age_min.value;
        const age_max = event.target.age_max.value;
        const country = event.target.country.value;
        const city = event.target.city.value;

        const data = {
            "sport": sport,
            "gender": gender,
            "lft": lft,
            "lfcg": lfcg,
            "age_min": age_min,
            "age_max": age_max,
            "country": country,
            "city": city,
            
        }
        axios.post('http://127.0.0.1:8000/api/users/searched/', data)
            .then(Response => {
                this.setState({users:Response.data})
                console.log(Response)
            })
            .catch(error => { console.log(error) })
    }

    render() {
            return (
                <div>
                    <h1>Filter</h1>
                    <Row>
                        <Col></Col>
                        <Col>
                            <Form onSubmit={this.handleSubmit} >
    
                                <Form.Group className="mb-3" controlId="formf1">
                                    <Form.Label>Sport</Form.Label>
                                    <Form.Control type="text" placeholder="Sport" name='sport' />
                                </Form.Group>
    
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Looking for a team" name='lft' />
                                </Form.Group>
    
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Looking for casual games" name='lfcg' />
                                </Form.Group>
    
                                <Form.Group className="mb-3" controlId="formf2">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Control type="text" placeholder="Gender" name='gender' />
                                </Form.Group>
    
                                <Form.Group className="mb-3" controlId="formf3">
                                    <Form.Label>Age min</Form.Label>
                                    <Form.Control type="text" placeholder="age min" name='age_min' />
                                </Form.Group>
    
                                <Form.Group className="mb-3" controlId="formf4">
                                    <Form.Label>Age max</Form.Label>
                                    <Form.Control type="text" placeholder="age max" name='age_max' />
                                </Form.Group>
    
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
                        </Col>
                        <Col></Col>
                    </Row>
                    <br></br>
                    <br></br>
                    <div className='users'>
                <h2>Users</h2>
                {this.state.users.map(user=>(
                    <div key={user.user}>
                        <h2>{user.name} {user.surname}</h2>
                        <Link to ={`/profile/${user.user}`} >Profile</Link>
                    </div>
                ))
                }
            </div>
                </div>
            )
        
    }
}
