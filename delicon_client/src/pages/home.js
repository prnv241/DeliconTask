import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography, Button } from '@material-ui/core';
import Rescard from '../components/Rescard';


const styles = {
  homebox: {
    marginTop: '15vh',
  },
  welcome: {
    textAlign: 'center',
    marginTop: '30%'
  },
  newbut: {
    float: 'right',
  }
}

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      pageload: false
    }
  }
  
  componentDidMount() {
    if(this.props.authenticated) {
      this.setState({ pageload: true });
      axios.get('/reservations')
        .then(res => {
          this.setState({
            reservations: res.data,
            pageload: false
          })
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
  render() {
    const { classes } = this.props;
    var homemarkup = !this.props.authenticated ? (
      <div className={classes.welcome}>
        <Typography variant="h3" color="textPrimary">Welcome to reservations app</Typography>
        <Typography variant="body1" color="textPrimary">Please Login or Signup to continue...</Typography>
      </div>
    ) : (
      this.state.pageload ? ( <Loading/> ) : (
        <>
          <Typography variant="h5" className={classes.heading}>Your Reservations <Button variant="contained" className={classes.newbut} color="primary" component={Link} to="/newres">Add New</Button></Typography>
          <div className="container">
            {this.state.reservations.map(res => <Rescard res={res} key={res.resId}/>)}
          </div>
        </>
      )
    );
    return (
      <div className="container">
        <div className={classes.homebox}>
          {homemarkup}
        </div>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(home));