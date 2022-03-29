import React,{useState,useEffect} from 'react';
import {Form,Button,Row,Col,Modal} from 'react-bootstrap';
import {
    useParams,
  } from "react-router-dom";
import axios from 'axios';

export default function TeamPage(props) {
    let { id } = useParams(); /*because of this,this need to be function component */

    const [team,updateTeam] = useState({})
    const [players,updatePlayers] = useState([])
    const [potential_admin,updatePotAdmin] = useState([])
    const [popup,updatePopUp] = useState(false)

    const getTeam = (id) => {
        axios.get(`http://127.0.0.1:8000/api/teams/${id}/`)
        .then(Response => {
            console.log(Response)
            updateTeam(Response.data)

            axios.post(`http://127.0.0.1:8000/api/users/specific_list/`,{"users":Response.data.users})
            .then(Response=>{
                console.log(Response)
                updatePlayers(Response.data)
            })
        })
        
    }

    const giveAdmin = (new_admin) =>{
        axios.post(`http://127.0.0.1:8000/api/teams/change_admin/`,{"current_user":props.user_id,"new_admin":new_admin,"team_id":team.id})
        .then(Response=>{console.log(Response)})
        .catch(error=>{console.log(error)})
    }   

    const kickFromTeam = (user_id) => {
        axios.post(`http://127.0.0.1:8000/api/teams/kick_from_team/`,{"current_user":props.user_id,"user_id":user_id,"team_id":id})
        .then(Response=>{console.log(Response)})
        .catch(error=>{console.log(error)})
    }

    useEffect(() => {
        getTeam(id)
        
        
        },[])
    
    let admin = {}
    let in_team = false

    for(const user of players){
        if(user.user===team.admin){
            admin = user
        }
        if(user.user===props.user_id){
            in_team = true
        }
    }

    const View_Post = ()=>{
        if(!in_team){return}
        return (
            <div>
                    
            </div>
        )
    }
    const Players_list = ()=>{
        if(props.user_id ===admin.user){
            return (
                <div>
                    {players.map(user=>(
                    <div key={user.user}>
                        <h4>{user.name} {user.surname}</h4>
                        <Button onClick={()=>{kickFromTeam(user.user)}}>kick</Button>
                        <Button onClick={()=>{
                            updatePopUp(true)
                            updatePotAdmin(user.user)
                        }}>make admin</Button>
                    </div>
                ))}
                </div>
            )
        }else{
            return (
                <div>
                    {players.map(user=>(
                    <div key={user.user}>
                        <h4>{user.name} {user.surname}</h4>
                    </div>
                ))}
                </div>
            )
        }
    }

    return <div>
        <Modal show={popup} onHide={()=>{updatePopUp(false)}}>
        <Modal.Header closeButton>
            <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <p>Are you sure you want to give admin to someone else?</p>
            <p>you won't be able to invite other users to your team and to kick out users from your team</p>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" onClick={()=>{updatePopUp(false)}}>Cancel</Button>
            <Button variant="primary" onClick={()=>{
                giveAdmin(potential_admin)
                updatePopUp(false)
            }
                }>Yes</Button>
        </Modal.Footer>
        </Modal>
        <Row>
            <Col></Col>
            <Col>
                <h1>team {team.name}</h1>
                <br></br>
                <h2>sport: {team.sport}</h2>
                <h3>country: {team.country}</h3>
                <h3>city: {team.city}</h3>
                <h3>admin: {admin.name}{admin.surname}</h3>
                <br></br>
                <h3>Players:</h3>
                <Players_list/>
            </Col>
            <Col></Col>
        </Row>
        
    </div>;
    }

