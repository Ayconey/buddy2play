import React, { Component } from 'react'
import axios from 'axios'
import {Button,Form,Row,Col} from 'react-bootstrap'
export default class YourProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            user:{},
            edit_mode:false,
            changed_user:{},
        }
    }

    componentDidMount(){
        this.getData();
    }

    getData = () => {
        axios.get(`http://127.0.0.1:8000/api/users/${this.props.user_id}/profile/`)
        .then(Response=>{
            console.log(Response)
            this.setState({user:Response.data})
        })
        .catch(error=>{console.log(error)})
    }

    changeMode = () =>{
        this.setState({edit_mode:!this.state.edit_mode})
    }

    handleSubmit = (event) =>{ //without state
        event.preventDefault();
        let data = {
            "name":event.target.name.value,
            "surname":event.target.surname.value,
            "sport":event.target.sport.value,
            "gender":event.target.gender.value,
            "country":event.target.country.value,
            "city":event.target.city.value,
        }
        
        axios.put(`http://127.0.0.1:8000/api/users/${this.props.user_id}/profile/`,data)
        .then(response =>{
            this.props.setToken(response.data.key);
            
        })
        .catch(error => {console.log(error)})
        this.setState({'logged':true})
    }

  render() {
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
                        <Form.Control type="text" placeholder={this.state.user.name} name='name' />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>surname</Form.Label>
                        <Form.Control type="text" placeholder={this.state.user.surname} name='surname' />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>sport</Form.Label>
                        <Form.Control type="text" placeholder={this.state.user.sport} name='sport' />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>gender</Form.Label>
                        <Form.Control type="text" placeholder={this.state.user.gender} name='gender' />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>country</Form.Label>
                        <Form.Control type="text" placeholder={this.state.user.country} name='country' />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>city</Form.Label>
                        <Form.Control type="text" placeholder={this.state.user.city} name='city' />
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
        <h1>Your Profile</h1>
        <h2>name: {this.state.user.name}</h2>
        <h2>surname: {this.state.user.surname}</h2>
        <h2>sport: {this.state.user.sport}</h2>
        <h2>gender: {this.state.user.gender}</h2>
        <h2>country: {this.state.user.country}</h2>
        <h2>city: {this.state.user.city}</h2>
        <Button onClick={()=>{this.changeMode()}}>Edit</Button>
      </div>
    )
  }
}
