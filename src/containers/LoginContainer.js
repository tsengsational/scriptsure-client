import React from 'react';
import { Form, Grid, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class LoginContainer extends React.Component {
  constructor(){
    super()
    this.state={
      username: "",
      password: ""
    }
  }

    handleChange = (event) => {
      this.setState({
        ...this.state,
        [event.target.name]: event.target.value
    }, ()=>{console.log(this.state)})
    }

    handleSubmit = (event) => {
      event.preventDefault()
      this.props.login(this.state, this.props.history)
        // .then(()=>{this.props.history.push('/')})
    }

    render(){
      return(
        <div>
          <Divider hidden section/>
          <Grid centered columns={2}>
            <Grid.Column width={4}>
              <div>
                <Form className="big-text cousine" onSubmit={this.handleSubmit}>
                  <Form.Field name="username" onChange={this.handleChange}>
                    <label>Username</label>
                    <input type='text' name="username"/>
                  </Form.Field>
                  <Form.Field name="password" onChange={this.handleChange}>
                    <label>Password</label>
                    <input type='password' name="password"/>
                  </Form.Field>
                  <Form.Button id="updated-button">Login</Form.Button>
                </Form>
              </div>
            </Grid.Column>
          </Grid>
        </div>
      )
    }
}


export default connect(null, actions)(LoginContainer)
