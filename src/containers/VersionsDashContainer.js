import React from 'react';
import VersionCard from '../components/VersionCard'
import { Divider, Card, Transition, Segment, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

class VersionsDashContainer extends React.Component {
  constructor(){
    super()
    this.state = {
      visible: false
    }
  }

  hideVersions = (event) => {
    if (this.state.visible) {
      this.setState({
        visible: false
      })
    }
  }

  componentWillReceiveProps(nextProps){
    console.log("VersionsDashContainer receiving props", nextProps.script.versions.length)
    if (nextProps.script.versions.length > 0){
      this.setState({
        visible: true
      }, console.log(this.state))
    } else {
      this.setState({
        visible: false
      }, console.log(this.state))
    }
  }

  render(){
    const versions = this.props.script.versions.map((version)=>{
      return(
        <div key={version.id}>
          <VersionCard key={version.id} version={version} hideVersions={this.hideVersions} history={this.props.history} />
          <Divider hidden/>
        </div>
      )
    })
    return (
      <div className="hide-scroll">
        <Transition visible={this.state.visible} animation='fade down' >
          <Segment color='teal' textAlign="center">
            <span className="h3">Versions:</span>
            <Button floated="right" basic color={'teal'} onClick={this.hideVersions}>Hide</Button>
          </Segment>
        </Transition>
        <Transition visible={this.state.visible} animation='fade down' >
          <div>
            <Segment className="no-margin no-margin2">
              <h3>{this.props.script.title}</h3>
              {this.props.script.subtitle}
            </Segment>
            <Segment className="no-top-margin">
              <div className="scroll2">
                  <div>
                      <Divider hidden/>
                      {versions}
                  </div>
              </div>
            </Segment>
          </div>
        </Transition>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    script: state.Script
  }
}

export default connect(mapStateToProps)(VersionsDashContainer)
