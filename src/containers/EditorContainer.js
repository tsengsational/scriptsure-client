import React, { Component } from 'react';
import { Editor, EditorState, Entity, RichUtils, ContentState, CompositeDecorator, AtomicBlockUtils, getDefaultKeyBinding, KeyBindingUtil, convertToRaw, convertFromRaw } from 'draft-js';
import { getSelectionRange, getSelectedBlockElement, getSelectionCoords } from '../utils/selection';
import SideToolbar from './SideToolbar';
import InlineToolbar from '../components/InlineToolbar';
import { connect } from 'react-redux'
import * as actions from '../actions'
import '../stylesheets/Draft.css'
import '../stylesheets/Editor.css'
import '../stylesheets/styles.css'
const {hasCommandModifier} = KeyBindingUtil;

function myKeyBindingFn (event) {
  if (event.keyCode === 83 /* `S` kay */ && hasCommandModifier(event)) {
    return 'myeditor-save';
  } else if (event.keyCode === 9) {
    return 'myeditor-changeStyle'
  }
  return getDefaultKeyBinding(event)
}

class EditorContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      inlineToolbar: { show: false },
      version: {}
    };

    this.onChange = (editorState) => {
      if (!editorState.getSelection().isCollapsed()) {
        const selectionRange = getSelectionRange();
        const selectionCoords = getSelectionCoords(selectionRange);
        this.setState({
          inlineToolbar: {
            show: true,
            position: {
              top: selectionCoords.offsetTop,
              left: selectionCoords.offsetLeft
            }
          }
        });
      } else {
        this.setState({ inlineToolbar: { show: false } });
      }

      this.setState({ editorState });
      setTimeout(this.updateSelection, 0);
    }
    this.focus = () => this.refs.editor.focus();
    this.updateSelection = () => this._updateSelection();
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.handleFileInput = (e) => this._handleFileInput(e);
    this.handleUploadImage = () => this._handleUploadImage();
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.insertImage = (file) => this._insertImage(file);
    // this.blockRenderer = (block) => {
    //   if (block.getType() === 'atomic') {
    //     return {
    //       component: ImageComponent
    //     };
    //   }
    //   return null;
    // }
    this.blockStyler = (block) => {
      switch (block.getType()){
        case 'unstyled':
          return 'paragraph';
        case 'act':
          return 'RichEditor-act';
        case 'scene':
          return 'RichEditor-scene';
        case 'character':
          return 'RichEditor-character';
        case 'dialogue':
          return 'RichEditor-dialogue';
        default:
          return null;
      }
    } // end blockStyler
  } // end constructor


  componentDidMount(){
    console.log('componentDidMount')

    const script_id = this.props.match.params.id
    this.props.getVersions(script_id)
      .then(()=>{
        console.log('setting most recent version')
        if(this.props.script.versions.length > 0) {
          const version = this.props.script.versions.slice(-1)[0]
          const contentState = convertFromRaw(JSON.parse(version.contentState))
          const editorState = EditorState.createWithContent(contentState)
          this.setState({
            editorState: editorState,
            version: version
          }, ()=> {console.log('set editorState:', this.state)})
        }
      }) //end then
        .then(()=>{
          if (Object.keys(this.props.version.currentVersion).length > 0){
            const currentVersion = this.props.version.currentVersion
            console.log('loading selected version', currentVersion)
            const editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(currentVersion.contentState)))
            this.setState({
              editorState: editorState,
              version: currentVersion
            }, () => {console.log('set editorState:', this.state)})
          }
        })
  }

  componentWillUnmount(){
    console.log('EditorContainer Unmounting')
  }

  _updateSelection() {
    const selectionRange = getSelectionRange();
    let selectedBlock;
    if (selectionRange) {
      selectedBlock = getSelectedBlockElement(selectionRange);
    }
    this.setState({
      selectedBlock,
      selectionRange
    });
  }

  _handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    switch (command){
      case 'myeditor-save':
        console.log(this.state)
        const script_id = this.props.match.params.id
        const contentState = this.state.editorState.getCurrentContent()
        const stringify = this.stringifyContent(contentState)
        let versionParams = { version: {
          script_id: script_id,
          contentState: stringify
        }
        }
        this.props.saveVersion(versionParams)
          .then(console.log(this.props.versions))
        return 'handled';
      case 'myeditor-changeStyle':
        console.log("Tabbing")
        return 'handled';
    }

    return false;
  }

  stringifyContent = (contentState) => {
    return JSON.stringify(convertToRaw(contentState))
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  _insertImage(file) {
    const entityKey = Entity.create('atomic', 'IMMUTABLE', {src: URL.createObjectURL(file)});
		this.onChange(AtomicBlockUtils.insertAtomicBlock(
        this.state.editorState,
        entityKey,
        ' '
      ));
  }

  _handleFileInput(e) {
    const fileList = e.target.files;
    const file = fileList[0];
    this.insertImage(file);
  }

  _handleUploadImage() {
    this.refs.fileInput.click();
  }

  onTab = (event) => {
    console.log("tab!")
    event.preventDefault()
  }


  render() {
    const { editorState, selectedBlock, selectionRange } = this.state;
    let sideToolbarOffsetTop = 0;

    if (selectedBlock) {
      const editor = document.getElementById('richEditor');
      const editorBounds = editor.getBoundingClientRect();
      const blockBounds = selectedBlock.getBoundingClientRect();

      sideToolbarOffsetTop = (blockBounds.bottom - editorBounds.top)
                           - 31; // height of side toolbar
    }

    return (
      <div className="editor" id="richEditor" onClick={this.focus}>
        {selectedBlock
          ? <SideToolbar
              editorState={editorState}
              style={{ top: sideToolbarOffsetTop }}
              onToggle={this.toggleBlockType}
              onUploadImage={this.handleUploadImage}
            />
          : null
        }
        {console.log(this.props)}
        {this.state.inlineToolbar.show
          ? <InlineToolbar
              editorState={editorState}
              onToggle={this.toggleInlineStyle}
              position={this.state.inlineToolbar.position}
            />
          : null
        }
        <Editor
          blockRendererFn={this.blockRenderer}
          blockStyleFn={this.blockStyler}
          editorState={editorState}
          handleKeyCommand={this.handleKeyCommand}
          keyBindingFn={myKeyBindingFn}
          onChange={this.onChange}
          placeholder="At rise..."
          spellCheck={true}
          readOnly={this.state.editingImage}
          ref="editor"
          onTab={this.onTab}
        />
        <input type="file" ref="fileInput" style={{display: 'none'}}
          onChange={this.handleFileInput} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    script: state.Script,
    version: state.Version,
    auth: state.Auth
  }
}

export default connect(mapStateToProps, actions)(EditorContainer);
