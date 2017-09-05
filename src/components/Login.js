import React from 'react';
import { Form, Grid, Divider } from 'semantic-ui-react'

export default class Login extends React.Component {
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
    }

    render(){
      return(
        <div>
          <Divider hidden section/>
          <Grid centered columns={2}>
            <Grid.Column width={4}>
              <div>
                <Form className="big-text cousine" onSubmit={this.handleSubmit}>
                  <Form.Field name="username" type="text" onChange={this.handleChange}>
                    <label>Username</label>
                    <input type='text' name="username"/>
                  </Form.Field>
                  <Form.Field name="password" type="password" onChange={this.handleChange}>
                    <label>Password</label>
                    <input type='password' name="password"/>
                  </Form.Field>
                  <Form.Button className="big-text cousine">Login</Form.Button>
                </Form>
              </div>
            </Grid.Column>
          </Grid>
        </div>
      )
    }
}
