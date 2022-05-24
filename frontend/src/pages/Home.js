import React, { Component } from 'react'
import { MDBInput, MDBCol } from "mdbreact";
import { Container,Col,Row,Nav,ListGroup,Button } from 'react-bootstrap'
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../css/Home.css'
import {BsFillArrowRightCircleFill} from 'react-icons/bs'
import {BiGroup} from 'react-icons/bi'

import yoga from '../static/images/yoga.jpg'
import fb from '../static/images/football.jpg'

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
            
            this.setState({user_teams:Response.data})
        })
        .catch(error =>{console.log(error)})
    }

    GetUserFriends = () => {
        console.log(this.props.token)
        axios.post('http://127.0.0.1:8000/api/users/getFriends/',{headers:{"Authorization":`Token ${this.props.token}`},'user_id':this.props.user_id})
        .then(Response=>{
            
            this.setState({user_friends:Response.data})
        })
        .catch(error=>{console.log(error)})
    }


    render() {
        if(this.props.not_logged){
            return (
                <div>
                    <br></br>
                    <h2>Login or Register now!</h2>
                </div>
            )
        }
        return (
            <div>
                <br></br>
                <h1>News</h1>
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
                                <Row>
                                    <Col>
                                        <h2 id='hyoga'>Is sport really good for your health?</h2>
                                        <br></br>
                                        <p style={{color:'white'}}>
                                        Sports have an immense impact on a person’s daily life and health. They do not just give you an interesting
                                         routine but also a healthy body. Getting indulged in physical activities like sports improves your heart function,
                                          reduces the risks of diabetes, controls blood sugar, and lowers tension and stress levels. It also brings positive
                                           energy, discipline, and other commendable qualities to your life. Playing sports strengthens your body and also
                                            improves your muscle memory and muscle coordination. Primary health care doctors recommend taking part in sports
                                             on a regular basis. There are countless benefits of sports.
                                        </p>
                                    </Col>
                                    <Col><img src={yoga} id='img_yoga'/></Col>
                                </Row>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <Row>
                                    <Col><img src={fb} id='img_yoga'/></Col>
                                    <Col>
                                        <h2 id='hyoga'>Sport is making your mind stronger</h2>
                                        <br></br>
                                        <p style={{color:'white'}}>
                                        ports bring a positive attitude to your life. They make your mind sharper and stronger. Sports are fun to play and they
                                         refresh your mind. Being good at sports makes you feel good and accomplished and boosts your self-esteem. Playing team
                                          sports also boosts your strategy-making ability. Through sports, you learn to make decisions quickly and instinctively.
                                           This quick decision-making ability is of high use in everyday life. Sports also teach you to stay calm and think with a
                                            cool mind. They teach you to make decisions in high-stress situations without panicking or getting hyper.
                                        </p>
                                    </Col>
                                </Row>

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
