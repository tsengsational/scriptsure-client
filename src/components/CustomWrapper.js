export class SceneBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("inside SceneBlock test", this.props, this.state)
    return (
      <button className='RichEditor-scene'>
        {this.props.children}
      </button>
    );
  }
}

export class ActBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("inside SceneBlock", this.props, this.state)
    return (
      <div className='RichEditor-act test'>
        {this.props.children}
      </div>
    );
  }
}
