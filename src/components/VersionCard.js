import React from 'react';
import { Card, Icon, Button, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import * as actions from '../actions'
import { connect } from 'react-redux'

class VersionCard extends React.Component {

  handleCardClick = (event) => {
    console.log('card clicked')
    const id = this.props.version.id
    this.props.redux.actions.deleteVersion(id)
      .then(console.log('Version successfully deleted'))
  }

  handleEditClick = (event) => {
    console.log('edit version clicked')
    const version = this.props.version
    this.props.redux.actions.setCurrentVersion(version)
    console.log(this.props)
    this.props.history.push(`/scripts/${this.props.redux.state.script.id}`)
  }

  render () {
    return (
          <Card className="width width2 width3" centered link>
            <Card.Content>
              <Card.Header>
              <Icon name='copy'/>
                {this.props.version.created_at}
              </Card.Header>
            </Card.Content>
            <Card.Content extra>
                <Button size={'tiny'} basic color={'teal'} onClick={this.handleEditClick}><Icon name='edit'/>
                Edit</Button>
                <Button onClick={this.handleCardClick} size={"tiny"} basic color={'teal'}><Icon name='delete'/>Delete</Button>
            </Card.Content>
          </Card>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.Auth,
    script: state.Script,
    version: state.Version
  }
}

const mergeProps = (stateProps, actions, ownProps) => {
  return {
    ...ownProps,
    redux: {
      state: stateProps,
      actions: actions
    }
  }
}

export default connect(mapStateToProps, actions, mergeProps)(VersionCard)
