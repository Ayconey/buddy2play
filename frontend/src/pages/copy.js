import React,{useState,useEffect} from 'react';
import {
    useParams,
  } from "react-router-dom";
import axios from 'axios';

export default function TeamPage(props) {
    let { id } = useParams(); /*because of this,this need to be function component */
    const [team,updateTeam] = useState({})
    const getTeam = (id) => {
        axios.get(`http://127.0.0.1:8000/api/teams/${id}/`)
        .then(Response => {
            console.log(Response)
            updateTeam(Response.data)
        })
    }

    const getUsers = () => {
    }

    useEffect(() => {
        getTeam(id)
        },[])
    
  return <div>
      <h1>team</h1>
      {id}
      <h2>name: {team.name}</h2>
      <h2>sport: {team.sport}</h2>
      <h3>country: {team.country}</h3>
      <h3>city: {team.city}</h3>
  </div>;
}

