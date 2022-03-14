import React, { Component } from 'react'
import { MDBInput, MDBCol } from "mdbreact";
import { Container,Col,Row,Nav } from 'react-bootstrap'
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../css/Home.css'


export default class Home extends Component {
    constructor(props){
        super(props);
        this.state ={
            user_teams : [],
            user_friends: [],
        }
    }
    componentDidMount(){
        setTimeout(function() { //Start the timer
            this.GetUserTeams();
            this.GetUserFriends();
        }.bind(this), 100)
        }

    GetUserTeams = () => {
        axios.post('http://127.0.0.1:8000/api/teams/of_this_user/',{"user_id":this.props.user_id})
        .then(Response =>{
            console.log(Response)
            this.setState({user_teams:Response.data})
        })
        .catch(error =>{console.log(error)})
    }

    GetUserFriends = () => {
        axios.post('http://127.0.0.1:8000/api/users/getFriends/',{'user_id':this.props.user_id})
        .then(Response=>{
            console.log(Response)
            this.setState({user_friends:Response.data})
        })
        .catch(error=>{console.log(error)})
    }

    handleChange = (event) => {
        console.log(event.target.value)
        console.log(event.target.name)
    }

    render() {
        if(this.props.not_logged){
            return (
                <div>
                    <h1>Home Page</h1>
                </div>
            )
        }
        return (
            <div>
                <h1>Home Page</h1>
                <div>
                    <Row>

                    <Col > {/*first column*/}
                    Teams
                    <button><Nav.Link href="/create_team">start new team</Nav.Link></button>
                    <MDBCol md="10">
                        <MDBInput hint="Search" type="text" onChange={this.handleChange} containerClass="mt-0" name="team_input" />
                    </MDBCol>
                    {this.state.user_teams.map(team=>(
                    <div key={team.id}>
                        <h2>{team.name} {team.city}</h2>
                        <Link to ={`/teams/${team.id}`} >team page</Link>
                        <br></br>
                    </div>
                    ))
                    }
                    </Col>

                    <Col xs={9}> {/*2nd column, main section*/}
                        <Container id='cont1'>
                            main section
                        </Container>
                    </Col>

                    <Col> {/*3rd column*/}
                    Buddies
                    <MDBCol md="10">
                        <MDBInput hint="Search" type="text" onChange={this.handleChange} containerClass="mt-0" name="friend_input" />
                    </MDBCol>

                    {this.state.user_friends.map(friend=>(
                    <div key={friend.user}>
                        <Link to={`/profile/${friend.user}`}><h3>{friend.name} {friend.surname[0]}</h3></Link>
                        <br></br>
                    </div>
                    ))
                    }
                    </Col>   
                    </Row>
                    
                </div>
                
            </div>
        )
    }
}
