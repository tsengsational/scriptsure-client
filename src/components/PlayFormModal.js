import React from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class PlayFormModal extends React.Component {
  constructor(){
    super()
    this.state = {
      title: '',
      subtitle: ''
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
    const scriptParams = {
      script: {
        title: this.state.title,
        subtitle: this.state.subtitle
      }
    }
    this.props.submit(scriptParams)
  }

  render() {
    return (
      <div>
      <Modal open={this.props.open}>
        <Modal.Header>Create a New Play</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field onChange={this.handleChange}>
              <label>Title</label>
              <input type="text" name="title"/>
            </Form.Field>
            <Form.Field onChange={this.handleChange}>
              <label>Subtitle</label>
              <input type="text" name="subtitle"/>
            </Form.Field>
            <Form.Group>
              <Form.Button onClick={this.handleSubmit}>Save</Form.Button>
              <Button onClick={this.props.click}>Cancel</Button>
            </Form.Group>
          </Form>
        </Modal.Content>
      </Modal>
      </div>
    )
  }
}



export default connect(null, actions)(PlayFormModal)
