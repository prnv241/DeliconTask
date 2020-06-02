import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Grid from '@material-ui/core/Grid';

import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Newres from './pages/newres';

import Navbar from './components/Navbar';

axios.defaults.baseURL = 'https://us-central1-delicontask.cloudfunctions.net/api';

class App extends React.Component {
  state = {
    authenticated: false
  }
  
  setAuth = () => {
    this.setState({
      authenticated: true
    })
  }

  setUnauth = () => {
    this.setState({
      authenticated: false
    })
  }

  UNSAFE_componentWillMount() {
    const token = localStorage.AuthToken;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('AuthToken');
        this.context.history.push('/login')
      } else {
        this.setState({
          authenticated: true
        });
        axios.defaults.headers.common["Authorization"] = token;
      }
    }
  }

  render() {
    return  (
      <BrowserRouter>
        <Navbar authenticated={this.state.authenticated} setUnauth={this.setUnauth} />
        <Grid container>
          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} authenticated={this.state.authenticated} />} />
            <Route exact path="/newres" render={(props) => <Newres {...props} authenticated={this.state.authenticated} />} />
            <Route exact path="/login" render={(props) => <Login {...props} setAuth={this.setAuth} />} />
            <Route exact path="/signup" render={(props) => <Signup {...props} setAuth={this.setAuth} />} />
          </Switch>
        </Grid>
      </BrowserRouter>
    )
  }
}

export default App;