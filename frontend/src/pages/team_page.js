import React,{useState,useEffect} from 'react';
import {Form,Button,Row,Col} from 'react-bootstrap';
import {
    useParams,
  } from "react-router-dom";
import axios from 'axios';

export default function TeamPage(props) {
    let { id } = useParams(); /*because of this,this need to be function component */

    const [team,updateTeam] = useState({})
    const [players,updatePlayers] = useState([])

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

    const kickFromTeam = (user_id) => {
        axios.post(`http://127.0.0.1:8000/api/teams/kick_from_team/`,{"current_user":props.user_id,"user_id":user_id,"team_id":id})
        .then(Response=>{console.log(Response)})
        .catch(error=>{console.log(error)})
    }


    useEffect(() => {
        getTeam(id)
        
        
        },[])
    
    let admin = {}
    for(const user of players){
        if(user.user===team.admin){
            admin = user
        }
    }

    return <div>
        <h1>team</h1>
        {id}
        <h2>name: {team.name}</h2>
        <h2>sport: {team.sport}</h2>
        <h3>country: {team.country}</h3>
        <h3>city: {team.city}</h3>
        <h3>admin: {admin.name}{admin.surname}</h3>
        <br></br>
        <h3>Players:</h3>
        {players.map(user=>(
            <div key={user.user}>
                <h4>{user.name} {user.surname}</h4><Button onClick={()=>{kickFromTeam(user.user)}}>kick</Button>
            </div>
        ))}
    </div>;
    }

