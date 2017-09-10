import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'


class Navbar extends Component {

  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleClick = (event) => {
    this.props.logout(this.props.history)
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu color={'teal'} id="navbar" inverted>
        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
          <NavLink to="/" >Home</NavLink>
        </Menu.Item>
        <Menu.Item name='sign up' active={activeItem === 'sign up'} onClick={this.handleItemClick}>
          <NavLink to="/signup">Sign Up</NavLink>
        </Menu.Item>
        <Menu.Item name='login' active={activeItem === 'login'} onClick={this.handleItemClick}>
          <NavLink to="/login">Login</NavLink>
        </Menu.Item>
        <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick}>
          <NavLink to="/" onClick={this.handleClick}>Logout</NavLink>
        </Menu.Item>
      </Menu>
    )
  }
}

export default connect(null, actions)(Navbar)
