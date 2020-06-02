import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

export class Navbar extends Component {

  handlelogout = () => {
    localStorage.removeItem(`AuthToken`);
    delete axios.defaults.headers.common["Authorization"];
    this.props.setUnauth();
  }
  render() {
    return (
      <AppBar>
        <Toolbar>
          <Typography variant="h6">
            Reservations
          </Typography>
          { this.props.authenticated ? (
            <div className="ml-auto">
              <Button className="btn" color="inherit" component={NavLink} to="/">
                Home  
              </Button>
              <Button className="btn" color="inherit" component={NavLink} to="/">
                About Us
              </Button>
              <Button className="btn" color="inherit" onClick={this.handlelogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="ml-auto">
              <Button className="btn" color="inherit" component={NavLink} to="/">
                Home  
              </Button>
              <Button className="btn" color="inherit" component={NavLink} to="/login">
                Login
              </Button>
              <Button className="btn" color="inherit" component={NavLink} to="/signup">
                Signup
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
