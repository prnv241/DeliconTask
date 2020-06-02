import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

const styles = {
  form: {
    textAlign: 'center',
    marginTop: '15vh'
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
export class signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      mobno: '',
      address: '',
      name: '',
      btnload: false
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ btnload: true });
    axios.post('/reservations', {
      email: this.state.email,
      mobno: this.state.mobno,
      address: this.state.address,
      name: this.state.name
    })
      .then(res => {
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
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField id="email" name="email" type="email" label="Email" className={classes.TextField} value={this.state.email} onChange={this.handleChange} fullWidth />
            <TextField id="mobno" name="mobno" type="mobno" label="Mobile No" className={classes.TextField} value={this.state.mobno} onChange={this.handleChange} fullWidth />
            <TextField id="address" name="address" type="mobno" label="Address" className={classes.TextField} value={this.state.address} onChange={this.handleChange} fullWidth />
            <TextField id="name" name="name" type="name" label="Name" className={classes.TextField} value={this.state.name} onChange={this.handleChange} fullWidth />
            <Button type="submit" variant="contained" color="primary" disabled={this.state.btnload} className={classes.button}>Add Reservation{this.state.btnload && (<CircularProgress size={30} className={classes.progress} />)}</Button>
            <br />
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    )
  }
}

export default withRouter(withStyles(styles)(signup));
