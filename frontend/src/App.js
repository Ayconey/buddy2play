import React,{Component} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router,Route,Routes,Navigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
//pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RegistrationSuccess from './pages/RegistrationSuccess';
import Search from './pages/search';
import Searcht from './pages/searcht';
import UserProfile from './pages/userprofile';
import CreateTeam from './pages/create_team';
import TeamPage from './pages/team_page';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      token:'',
      id:0,
    }
  }

  componentDidMount(){
    this.readToken();
    this.getCurrentUserId();
    if(this.state.token){
      this.getCurrentUserId();
    }
    
  }

  setCookieToken = (token) =>{
    Cookies.set('token',token);
    window.location.reload(false);
  };
  
  readToken = () =>{
    this.setState({token:Cookies.get('token')})
  };

  removeToken = () =>{
    if(this.state.token){
      Cookies.remove('token')
    }
    window.location.reload(false);
  };

  getCurrentUserId = () => {
    const tokeno = Cookies.get("token");
    axios.get('http://127.0.0.1:8000/api/users/999999999/',{headers:{"Authorization":`Token ${tokeno}`}})
    .then(response =>{
      this.setState({id:response.data.id});
    })
    .catch(error => {console.log(error)});
  }
  
  render(){
    return (
      <div className="App">
        <Router>
          <Navbar token={this.state.token} removeToken={this.removeToken} />
          <Routes>
            <Route path='/' element={<Home token={this.state.token} user_id={this.state.id} />}></Route>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path='/create_team' element={<CreateTeam token={this.state.token} user_id={this.state.id} />}></Route>
            <Route path='/teams/:id' element={<TeamPage token={this.state.token} user_id={this.state.id} />}></Route>
            <Route path='/login' element={<Login setToken={this.setCookieToken} token={this.state.token} />}></Route>
            <Route path='/register' element={<Register setToken={this.setCookieToken} token={this.state.token} />}></Route>
            <Route path='/register_success' element={<RegistrationSuccess />}></Route>
            <Route path='/search' element={<Search/>}></Route>
            <Route path='/searcht' element={<Searcht/>}></Route>
            <Route path='/profile/:id' element={<UserProfile token={this.state.token} user_id={this.state.id} />}></Route>
          </Routes>
        </Router>
      </div>
    );
  }
  
}

export default App;
