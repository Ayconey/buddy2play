import React,{useState,useEffect} from 'react';
import {
    useParams,
  } from "react-router-dom";
import axios from 'axios';
import { Button } from 'react-bootstrap';

export default function UserProfile(props) {
    let { id } = useParams();
    const [user,updateUser] = useState({})
    const [added,updateAdd] = useState(false)
    const [teams,updateTeams] = useState([])

    const getUser = (id) => {
        axios.get(`http://127.0.0.1:8000/api/users/${id}/profile`)
        .then(Response => {
            console.log(Response)
            updateUser(Response.data)
        })
    }

    const getTeams = () => {
        axios.post(`http://127.0.0.1:8000/api/teams/of_this_user_admin/`,{"user_id":props.user_id})
        .then(Response=>{
            console.log(Response.data)
            updateTeams(Response.data)
        })
        .catch(error=>{console.log(error)})
    }

    const addToTeam = (team_id,user_to_add) => {
        axios.post(`http://127.0.0.1:8000/api/teams/add_to_team/`,{"current_user":props.user_id,"user_to_add":user_to_add,"team_id":team_id})
        .then(Response=>{console.log(Response)})
        .catch(error=>{console.log(error)})
    }

    const addFriend = (id) =>{
        axios.post(`http://127.0.0.1:8000/api/users/add_buddy/`,{headers:{"Authorization":`Token ${props.token}`},"user_id":props.user_id,"added_user_pk":id})
        .then(Response =>{
            console.log(Response)
        })
        .catch(error =>{console.log(error)})
    }

    const check_if_added = (id) =>{
        axios.post(`http://127.0.0.1:8000/api/users/check_if_added/`,{headers:{"Authorization":`Token ${props.token}`},"user_id":props.user_id,"other_id":id})
        .then(Response =>{
            console.log(Response)
            updateAdd(Response.data.added);
        })
        .catch(error =>{console.log(error)})
    }
    const delete_friend = (id) =>{
        axios.post(`http://127.0.0.1:8000/api/users/unfriend_buddy/`,{headers:{"Authorization":`Token ${props.token}`},"user_id":props.user_id,"unfriended_id":id})
        .then(Response =>{
            console.log(Response)
        })
        .catch(error =>{console.log(error)})
    }
    
    useEffect(() => {
        getUser(id);
        check_if_added(id);
        getTeams();
        },[])

    if(added){
        return <div>
        <h1>profile</h1>
        {id}
        <h2>name: {user.name}</h2>
        <h2>surname: {user.surname}</h2>
        <h2>sport: {user.sport}</h2>
        <h3>gender: {user.gender}</h3>
        <h3>country: {user.country}</h3>
        <h3>city: {user.city}</h3>
        <h4>User is already added as your friend</h4>
        <Button onClick={()=>{delete_friend(id)}}>Unfriend</Button>
        <Button onClick={()=>{addFriend(id)}}>add friend</Button>
        <br></br>
        <h2>Add this user to your team</h2>
        <h3>Choose team:</h3>
        {teams.map(team=>(
            <div key={team.id}>
                <h4>{team.name}</h4><Button onClick={()=>{addToTeam(team.id,id)}}>Add</Button>
            </div>
        ))}
        
    </div>;
    }else{
        return <div>
        <h1>profile</h1>
        {id}
        <h2>name: {user.name}</h2>
        <h2>surname: {user.surname}</h2>
        <h2>sport: {user.sport}</h2>
        <h3>gender: {user.gender}</h3>
        <h3>country: {user.country}</h3>
        <h3>city: {user.city}</h3>
        <Button onClick={()=>{addFriend(id)}}>add friend</Button>
        <br></br>
        <h2>Add to team</h2>
        <h3>Choose team:</h3>
        {teams.map(team=>(
            <div key={team.id}>
                <h4>{team.name}</h4><Button onClick={()=>{addToTeam(team.id,id)}}>Add</Button>
            </div>
        ))}
    </div>;
    }
    
}

