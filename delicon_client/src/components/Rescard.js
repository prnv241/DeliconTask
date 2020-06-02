import React from 'react'
import { withStyles, Typography, Card, CardContent } from '@material-ui/core'

const styles = {
  bodycard: {
    margin: 30,
    paddingLeft: 30,
    paddingRight: 30
  },
  fr: {
    float: 'right',
  },
  breaker: {
    marginTop: 5,
    marginBottom: 5
  }
}

function Rescard(props) {
  const { classes } = props
  return (
    <Card className={classes.bodycard}>
      <CardContent>
        <Typography>Name - {props.res.name} <span className={classes.fr}>Mobile No - {props.res.mobno}</span> </Typography>
        <br className={classes.breaker}/>
        <Typography>Email - {props.res.email} <span className={classes.fr}>Address - {props.res.address}</span></Typography>
      </CardContent>
    </Card>
  )
}

export default withStyles(styles)(Rescard);
