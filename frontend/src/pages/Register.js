import React, { Component } from 'react'
import {Form,Button,Row,Col} from 'react-bootstrap';
import axios from 'axios';
//pages
import RegStep1 from '../components/regStep1';
import RegStep2 from '../components/regStep2';
import RegConfirm from '../components/regConfirm';

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            step:1,
            username:'',
            email:'',
            password1:'',
            password2:'',
            birthday:'',
            name:'',
            surname:'',
            gender:'',
            country:'',
            city:'',
            sport:'',
        }
    }

    formVal1 = () => {
        if(!this.state.username){
            alert("no username");
            return false;
        }
        if(!this.state.email){
            alert("no email");
            return false;
        }
        if(!this.state.password1){
            alert("no password");
            return false;
        }
        if(!this.state.password2){
            alert("no check password");
            return false;
        }

        return true;
    }

    formVal2 = () => {  
        
        if(!this.state.name){
            alert("no name");
            return false;
        }
        if(!this.state.surname){
            alert("no surname");
            return false;
        }
        if(!this.state.gender){
            alert("no gender");
            return false;
        }
        if(!this.state.country){
            alert("no country");
            return false;
        }
        if(!this.state.city){
            alert("no city");
            return false;
        }
        if(!this.state.sport){
            alert("no sport");
            return false;
        }

        return true;
    }

    handleChange = (event) =>{
        const name = event.target.name;
        let val = event.target.value;
        let data = {};
        data[name]=val;
        this.setState(data);
    }

    Continue = (event) => {
        event.preventDefault();
        let current = this.state.step;
        if (current === 1 && this.formVal1()){
            this.setState({step:current+1});    
        }
        if (current === 2 && this.formVal2()){
            this.setState({step:current+1});    
        }
        
    }

    Back = () => {
        let current = this.state.step;
        this.setState({step:current-1});
    }

    render() {
        if (this.state.step ===1){
            return <RegStep1 handleChange={this.handleChange} Continue={this.Continue} Back={this.Back} token={this.props.token}  />
        }else if(this.state.step === 2){
            return <RegStep2 handleChange={this.handleChange} Continue={this.Continue} Back={this.Back} token={this.state.token} />
            
        }else{
            return <RegConfirm handleChange={this.handleChange} Continue={this.Continue} Back={this.Back} befState={this.state} token={this.state.token} setToken={this.props.setCookieToken} />
        }
        
    }
}
