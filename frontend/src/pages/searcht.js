import axios from 'axios';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';


export default class Searcht extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams:[],

        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const sport = event.target.sport.value;
        const name = event.target.name.value;
        const country = event.target.country.value;
        const city = event.target.city.value;

        const data = {
            "sport": sport,
            "name":name,
            "country": country,
            "city": city,
            
        }
        axios.post('http://127.0.0.1:8000/api/teams/searched/', data)
            .then(Response => {
                this.setState({teams:Response.data})
                console.log(Response)
            })
            .catch(error => { console.log(error) })
    }

    render() {
            return (
                <div>
                    <h1>Filter Teams</h1>
                    <Row>
                        <Col></Col>
                        <Col>
                            <Form onSubmit={this.handleSubmit} >
    
                                <Form.Group className="mb-3" controlId="formf1">
                                    <Form.Label>Sport</Form.Label>
                                    <Form.Control type="text" placeholder="Sport" name='sport' />
                                </Form.Group>
    
                                <Form.Group className="mb-3" controlId="formf2">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Name" name='name' />
                                </Form.Group>
    
                                <Form.Group className="mb-3" controlId="formf3">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control type="text" placeholder="Country" name='country' />
                                </Form.Group>
    
                                <Form.Group className="mb-3" controlId="formf4">
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
                    <div className='teams'>
                <h2>Teams</h2>
                {this.state.teams.map(team=>(
                    <div key={team.id}>
                        <h2>{team.name} {team.city}</h2>
                        <Link to ={`/teams/${team.id}`} >team page</Link>
                    </div>
                ))
                }
            </div>
                </div>
            )
        
    }
}
