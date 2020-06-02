import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

const styles = {
  form: {
    textAlign: 'center',
    marginTop: '20vh'
  },
  image: {
    margin: '20px auto 0px auto',
    width: '60px',
    height: '60px',
  },
  pageTitle: {
    margin: '20px auto 20px auto',
  },
  TextField: {
    margin: '15px auto 15px auto',
  },
  button: {
    marginTop: 40,
    marginBottom: 20,
    position: 'relative'
  },
  progress: {
    position: 'absolute'
  }
}

export class login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      btnload: false
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ btnload: true });
    axios.post('/login', {
      email: this.state.email,
      password: this.state.password
    })
      .then(res => {
        const AuthToken = `Bearer ${res.data.token}`;
        localStorage.setItem("AuthToken", AuthToken);
        axios.defaults.headers.common["Authorization"] = AuthToken;
        this.props.setAuth();
        this.setState({ btnload: false });
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <Typography variant="h3" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField id="email" name="email" type="email" label="Email" className={classes.TextField} value={this.state.email} onChange={this.handleChange} fullWidth />
            <TextField id="password" name="password" type="password" label="Password" className={classes.TextField} value={this.state.password} onChange={this.handleChange} fullWidth />
            <Button type="submit" variant="contained" color="primary" disabled={this.state.btnload} className={classes.button}>Login {this.state.btnload && (<CircularProgress size={30} className={classes.progress} />)}</Button>
            <br />
            <small>Dont have an account? Signup <Link to="/signup">here</Link></small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    )
  }
}

export default withStyles(styles)(login);
