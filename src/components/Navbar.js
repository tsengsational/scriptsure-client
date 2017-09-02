import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

class Navbar extends Component {

  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu color={'teal'} id="navbar" inverted widths={4}>
        <Menu.Item className="big-text" name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
          <NavLink to="/" >Home</NavLink>
        </Menu.Item>
        <Menu.Item className="big-text" name='sign up' active={activeItem === 'sign up'} onClick={this.handleItemClick}>
          <NavLink to="/signup">Sign Up</NavLink>
        </Menu.Item>
        <Menu.Item className="big-text" name='login' active={activeItem === 'login'} onClick={this.handleItemClick}>
          <NavLink to="/login">Login</NavLink>
        </Menu.Item>
        <Menu.Item className="big-text" name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick}>
          <NavLink to="/logout">Logout</NavLink>
        </Menu.Item>
      </Menu>
    )
  }
}

export default Navbar
