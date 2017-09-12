import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Grid, Divider, Icon, Button, Segment } from 'semantic-ui-react'
import PlayFormModal from '../components/PlayFormModal'
import ScriptList from '../components/ScriptList'
import VersionsDashContainer from './VersionsDashContainer'

class DashboardContainer extends React.Component {
  constructor(){
    super()
    this.state = {
      playModalOpen: false
    }
  }

  componentDidMount = () => {
    if(!localStorage.getItem('jwt')) {
      this.props.history.push('/login')
    }
    console.log('Dashboard mounted', this.props)
    this.props.currentUser()
    console.log('getting current user')
    // if(localStorage.getItem('jwt') && this.props.auth.isLoggedin === false) {
    // }
  }

  componentWillUpdate = () => {
    if(!localStorage.getItem('jwt')) {
      this.props.history.push('/login')
    }

  }

  handlePlayClick = (event) => {
    this.setState({
      playModalOpen: true
    })
  }

  handleModalClick = (event) => {
    console.log('clicked')
    this.setState({
      playModalOpen: false
    })
  }

  handlePlaySubmit = (scriptParams) => {
    this.props.newScript(scriptParams)
      .then(()=>{console.log('Submitted script successfully')})
    this.setState({
      playModalOpen: false
    })
  }

  render(){
    const username = this.props.auth.user.username
    const firstName = this.props.auth.user.first_name
    const lastName = this.props.auth.user.lastName
    const scripts = this.props.auth.user.scripts

    return(
      <div>
        <Divider section hidden />
        <Grid container stackable columns={2} >
          <Grid.Column width={8}>
            <Segment>
            <h1>Welcome, {firstName}!</h1>
            <h3><Icon name='user circle'/> Username: {username}</h3>
            </Segment>
            <PlayFormModal open={this.state.playModalOpen} submit={this.handlePlaySubmit} click={this.handleModalClick} />
            <Segment className="no-bottom-radius" color="teal" >
              <span className="h3">Your Plays</span>   <Button floated="right" id="updated-button" basic color={"teal"} onClick={this.handlePlayClick}>
                <Icon name='add circle' /> New Play
              </Button>
            </Segment>
            <Segment className="no-top-margin no-top-radius">
              <ScriptList script={this.props.script} scripts={this.props.auth.scripts} history={this.props.history}/>
            </Segment>
          </Grid.Column>
          <Grid.Column width={8}>
            <VersionsDashContainer history={this.props.history}/>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.Auth,
    script: state.Script
  }
}

export default connect(mapStateToProps, actions)(DashboardContainer)
