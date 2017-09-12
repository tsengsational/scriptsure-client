import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
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
        {
          !localStorage.getItem('jwt') && <Menu.Item name='sign up' active={activeItem === 'sign up'} onClick={this.handleItemClick}>
            <NavLink to="/signup">Sign Up</NavLink>
          </Menu.Item>
        }
        {
          !localStorage.getItem('jwt') && <Menu.Item name='login' active={activeItem === 'login'} onClick={this.handleItemClick}>
            <NavLink to="/login">Login</NavLink>
          </Menu.Item>
        }
        {
          localStorage.getItem('jwt') && <Menu.Item name='dashboard' active={activeItem === 'dashboard'} onClick={this.handleItemClick}>
            <NavLink to="/dashboard"><Icon name="dashboard"/>Dashboard</NavLink>
          </Menu.Item>
        }
        {
          localStorage.getItem('jwt') && <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick}>
            <NavLink to="/" onClick={this.handleClick}><Icon name="log out"/>Logout</NavLink>
          </Menu.Item>
        }

      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.Auth
  }
}

export default connect(mapStateToProps, actions)(Navbar)
