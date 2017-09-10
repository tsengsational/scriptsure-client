import React from 'react';
import { Card, Icon, Button, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import * as actions from '../actions'
import { connect } from 'react-redux'

class ScriptCard extends React.Component {

  handleClick = (event) => {
    const id = this.props.script.id
    this.props.redux.actions.deleteScript(id)
      .then(()=>{console.log('Script deleted')})

  }

  handleCardClick = (event) => {
    console.log('card clicked')
    const id = this.props.script.id
    console.log('script id:', id)
    this.props.redux.actions.getVersions(id)
  }

  handleEditClick = (event) => {
    event.preventDefault()
    console.log('edit script clicked')
    const id = this.props.script.id
    this.props.redux.actions.getVersions(id)
      .then((data)=>{
        console.log('got versions' ,this.props)
        if (this.props.redux.state.script.versions.length > 0){
          const version = this.props.redux.state.script.versions.slice(-1)[0]
          console.log(this.props)
          this.props.redux.actions.setCurrentVersion(version)
          console.log(this.props)

          this.props.history.push(`/scripts/${this.props.script.id}`)
        } else {
          this.props.history.push(`/scripts/${this.props.script.id}`)
        }
      })
  }

  render () {
    return (
      <div>
          <Card className="width width2 width3" link centered onClick={this.handleCardClick}>
            <Card.Content>
              <Image src='/theater_masks.svg' floated='left' size='mini' />
              <Card.Header>
                {this.props.script.title}
              </Card.Header>
              <Card.Meta>
                {this.props.script.subtitle}
              </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <Button size={'tiny'} basic color={'teal'} onClick={this.handleEditClick}><Icon name='edit' />
                Edit</Button>
                <Button onClick={this.handleClick} size={"tiny"} basic color={'teal'}><Icon name='delete'/>Delete</Button>

            </Card.Content>
          </Card>
      </div>
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

export default connect(mapStateToProps, actions, mergeProps)(ScriptCard)
