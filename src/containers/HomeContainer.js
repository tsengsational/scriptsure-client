import React from 'react';
import { Grid, Divider, Image, Button } from 'semantic-ui-react'
import VideoBackground from '../components/VideoBackground'
import { Link } from 'react-router-dom'

export default class Home extends React.Component {

  render(){
    return(
    <div className="centered" >
      <div id="mask"></div>
      <VideoBackground />
      <Divider hidden section />
      <Divider hidden section />
      <Divider hidden section />
      <Divider hidden section />
      <Grid>
        <Grid.Row centered={true} container >
          <Grid.Column computer={8} mobile={14}>
            <Image style={{width: '50vw'}} src="/scriptsure_logo_white.svg"/>
            <Divider hidden section />
            <p className="cover-text" >Writing a play is hard enough without painful UX. With ScriptSure, write your next masterpiece, masterfully.</p>
            <br/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid centered={true}>
        <Grid.Row>
        <Grid.Column width={4} textAlign="center" >
        <Link to="/signup"><Button id="updated-button" inverted color="teal" size="massive" >Get started</Button ></Link>
        </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
    )
  }
}
