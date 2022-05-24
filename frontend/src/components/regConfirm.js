import React, { Component } from 'react';
import {Form,Button,Row,Col} from 'react-bootstrap';
import axios from 'axios';
import { Navigate } from "react-router-dom";

export default class regConfirm extends Component {
    constructor(props){
        super(props);
        this.state = this.props.befState;
        this.setState({'redirect':false,'failed':false})
    }

    
    handleSecData = (data) =>{
        axios.post('http://127.0.0.1:8000/api/users/update_profile/',data)
                 .then(response => {
                     
                     this.setState({'redirect':true})
                    })
                 .catch(error => {
                     
                     this.setState({'failed':true})
                     axios.post("http://127.0.0.1:8000/api/users/dbu/",{username:this.state.username})
                     
                    })
    }
    handleConfirm = () =>{
        const data1 ={
            username : this.state.username,
            email : this.state.email,
            password1 : this.state.password1,
            password2 : this.state.password2,
        }
        const birthdayo = `${this.state.year}-${this.state.month}-${this.state.day}`
        const data2 = {
            username:this.state.username,
            name : this.state.name,
            surname : this.state.surname,
            gender : this.state.gender,
            country : this.state.country,
            city : this.state.city,
            sport : this.state.sport,
            birthday : birthdayo,
        }
        console.log(data2)
        axios.post("http://127.0.0.1:8000/dj-rest-auth/registration/",data1)
        .then(response=>{
            
            this.handleSecData(data2);
        })
        .catch(error =>{
            console.log(error)})
        
    }

    render() {
        if (this.state.failed){
            return <Navigate to='/wrong'/>
        }
        if (this.state.redirect){
            return <Navigate to='/register_success'/>
        }
        return (
            <div>
                <h1>Confirm</h1>
                <h2>username: {this.state.username}</h2>
                <h2>email: {this.state.email}</h2>
                <h2>name: {this.state.name}</h2>
                <h2>surname: {this.state.surname}</h2>
                <h2>gender: {this.state.gender}</h2>
                <h2>country: {this.state.country}</h2>
                <h2>city: {this.state.city}</h2>
                <h2>sport: {this.state.sport}</h2>
                <Button variant="primary" onClick={this.props.Back} >
                        Back
                </Button>
                <Button variant="primary" onClick={this.handleConfirm}  >
                        Confirm
                </Button>
            </div>
        )
    }
}
