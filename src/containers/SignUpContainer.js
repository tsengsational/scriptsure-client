import React from 'react';
import { Form, Grid, Divider } from 'semantic-ui-react'
import UsersAdapter from '../adapters/UsersAdapter'

export default class SignUpContainer extends React.Component {
  constructor(){
    super()
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: '',
      email: ''
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
    const userParams = {
      user: {
        username: this.state.username,
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        password: this.state.password,
        password_confirmation: this.state.passwordConfirmation,
        email: this.state.email
      }
    }
    UsersAdapter.create(userParams)
      .then(()=>{
        history.push('/login')
      })
      .catch(error => {console.log(error)})
  }

  render(){
    return(
      <div>
        <Divider hidden section />
        <Grid centered container>
          <Form className="cousine" onSubmit={this.handleSubmit}>
            <Form.Field onChange={this.handleChange}>
              <label>Username</label>
              <input type='text' name='username'/>
            </Form.Field>
            <Form.Group>
              <Form.Field onChange={this.handleChange}>
                <label>First Name</label>
                <input type='text' name='firstName'/>
              </Form.Field>
              <Form.Field onChange={this.handleChange}>
                <label>Last Name</label>
                <input type='text' name='lastName'/>
              </Form.Field>
            </Form.Group>
            <Form.Field onChange={this.handleChange}>
              <label>Password</label>
              <input type='password' name='password'/>
            </Form.Field>
            <Form.Field onChange={this.handleChange}>
              <label>Confirm Password</label>
              <input type='password' name='passwordConfirmation'/>
            </Form.Field >
            <Form.Button id="updated-button">Sign Up</Form.Button>
          </Form>
        </Grid>
      </div>
    )
  }
}
