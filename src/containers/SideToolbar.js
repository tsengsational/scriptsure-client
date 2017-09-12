import React, { Component, PropTypes } from 'react';
import ToolbarIcon from '../components/ToolbarIcon';

const BLOCK_TYPES = [
  { label: 'Act', style: 'act' },
  { label: 'Scene', style: 'scene'},
  { label: 'Action', style: 'action'},
  { label: 'Char', style: 'character'},
  { icon: 'a-quote', style: 'dialogue'}
];

const SideToolbarExtras = ({ editorState, onToggle }) => {
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent()
                               .getBlockForKey(selection.getStartKey())
                               .getType();
  return (
    <div className="toolbar side">
      <ul className="toolbar-icons">
        {BLOCK_TYPES.map(type =>
          <ToolbarIcon
            key={type.label || type.icon}
            active={type.style === blockType}
            label={type.label}
            icon={type.icon}
            onToggle={onToggle}
            style={type.style}
          />
        )}
      </ul>
    </div>
  );
}

class SideToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
  }
  render() {
    const { isExpanded } = this.state;
    const { editorState, onUploadImage, onToggle } = this.props;
    return (
      <div style={this.props.style} className="side-toolbar">
        <i className="a-menu"
           onMouseEnter={() => this.setState({ isExpanded: true })}
           onMouseDown={(e) => e.preventDefault()}
           onMouseLeave={() => this.setState({ isExpanded: false })}
        >
          {isExpanded
           ? <SideToolbarExtras editorState={editorState} onToggle={onToggle} />
           : null
          }
        </i>
      </div>
    )
  }
}

export default SideToolbar;
