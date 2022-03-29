import React, { Component } from 'react'
import {Form,Button,Row,Col} from 'react-bootstrap'
import axios from 'axios';
export default class CreateTeam extends Component {
    constructor(props){
        super(props)
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const sport = event.target.sport.value;
        const name = event.target.name.value;
        const city = event.target.city.value;
        const country = event.target.country.value;
        const max_users = event.target.max_users.value;
        const admin = this.props.user_id;
        const users = [admin];
        
        const data = {
            "sport":sport,
            "name":name,
            "city":city,
            "country":country,
            "admin":admin,
            "users":users,
            "max_users":max_users,
        }

        axios.post('http://127.0.0.1:8000/api/teams/create/', data)
            .then(Response => {
                this.setState({users:Response.data})
                console.log(Response)
            })
            .catch(error => { console.log(error) })

    }
    
    render() {
        return (
            <div>
                <h1>Create Your Team!</h1>
                <Row>
                    <Col></Col>
                    <Col xs={4}>
                    <Form onSubmit={this.handleSubmit}>

                    <Form.Group className="mb-3" controlId="formSport">
                        <Form.Label>Sport</Form.Label>
                        <Form.Control type="text" placeholder="sport" name='sport' />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>name</Form.Label>
                        <Form.Control type="text" placeholder="name" name='name' />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formCity">
                        <Form.Label>city</Form.Label>
                        <Form.Control type="text" placeholder="city" name='city' />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="formCountry">
                        <Form.Label>country</Form.Label>
                        <Form.Control type="text" placeholder="country" name='country' />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formCountry">
                        <Form.Label>max number of people</Form.Label>
                        <Form.Control type="text" placeholder="max number of people" name='max_users' />
                    </Form.Group>

                    <Button variant="primary" type="submit" >
                        Create
                    </Button>

                    </Form>
                    </Col>
                    <Col></Col>
                </Row>
                
            </div>
        )
    }
}
