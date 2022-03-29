import React, { Component } from 'react'
import { MDBInput, MDBCol } from "mdbreact";
import { Container,Col,Row,Nav,ListGroup,Button } from 'react-bootstrap'
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../css/Home.css'
import {BsFillArrowRightCircleFill} from 'react-icons/bs'
import {BiGroup} from 'react-icons/bi'


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
            if (this.props.token){
                this.GetUserTeams();
                this.GetUserFriends();
            }
        }.bind(this), 100)
        }

    GetUserTeams = () => {
        axios.post('http://127.0.0.1:8000/api/teams/of_this_user/',{headers:{"Authorization":`Token ${this.props.token}`},"user_id":this.props.user_id})
        .then(Response =>{
            console.log(Response)
            this.setState({user_teams:Response.data})
        })
        .catch(error =>{console.log(error)})
    }

    GetUserFriends = () => {
        axios.post('http://127.0.0.1:8000/api/users/getFriends/',{headers:{"Authorization":`Token ${this.props.token}`},'user_id':this.props.user_id})
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
                    <Nav.Link href="/create_team"><Button id='btn-create'><h2>Start new team</h2></Button></Nav.Link>
                    
                    <br></br>
                    <h2>Your Teams</h2>
                    <ListGroup>
                        {this.state.user_teams.map(team=>(
                        <ListGroup.Item as='li'>
                            <div key={team.id}>
                            <h2>{team.name}</h2>
                            <p>from {team.city}</p>
                            <Link to ={`/teams/${team.id}`} >
                                <Button>
                                <BsFillArrowRightCircleFill/>
                                </Button>
                            </Link>
                            <br></br>
                            </div>
                        </ListGroup.Item>
                        ))
                        }
                    </ListGroup>
                    
                    

                    </Col>

                    <Col xs={9}> {/*2nd column, main section*/}
                        <Container id='cont1'>
                            main section
                        </Container>
                    </Col>

                    <Col> {/*3rd column*/}
                    <h2>Your Friends</h2><BiGroup size={32} style={{color:'purple'}}></BiGroup>
                    
                    <ListGroup>
                        {this.state.user_friends.map(friend=>(
                            <ListGroup.Item >
                                <div key={friend.user} >
                                <Link id='friendlist-item'  to={`/profile/${friend.user}`}><h3 >{friend.name} {friend.surname}</h3></Link>
                                </div>
                                <br></br>
                            </ListGroup.Item>
                        
                        ))
                        }
                    </ListGroup>
                    
                    </Col>   
                    </Row>
                    
                </div>
                
            </div>
        )
    }
}
