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
import { Map } from 'immutable'
import Outline from '../components/Outline'
import { Button, Transition, Grid } from 'semantic-ui-react'
import extendedBlockRenderMap from '../components/BlockRenderMap'

const {hasCommandModifier} = KeyBindingUtil;

function myKeyBindingFn (event) {
  if (event.keyCode === 83 /* `S` kay */ && hasCommandModifier(event)) {
    return 'myeditor-save';
  }
  else if (event.keyCode === 13 && hasCommandModifier(event)) {
    return 'myeditor-return'
  }
  return getDefaultKeyBinding(event)
}

function blockStyler(block) {
  const type = block.getType();
  switch (block.getType()){
    case 'unstyled':
      return 'paragraph';
    case 'act':
      return 'RichEditor-act outliner';
    case 'scene':
      return 'RichEditor-scene outliner';
    case 'character':
      return 'RichEditor-character';
    case 'dialogue':
      return 'RichEditor-dialogue';
    case 'action':
      return 'RichEditor-action';
    case 'parenthetical':
      return 'RichEditor-parenthetical';
    default:
      return null;
  }
} // end blockStyler

class EditorContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      inlineToolbar: { show: false },
      blockType: '',
      displayTypeVisible: false,
      outline: [],
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
        .then(()=>{
          this.getCharacters()
          this.getOutline()
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
    console.log(command)
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
      case 'myeditor-return':
        RichUtils.handleKeyCommand(editorState, 'split-block')
        if (this.state.blockType === 'character') {
          this.toggleBlockType('dialogue')
        }
        console.log("return", editorState, command)
        return 'handled';
    }

    return false;
  }

  stringifyContent = (contentState) => {
    return JSON.stringify(convertToRaw(contentState))
  }

  _toggleBlockType(blockType) {
    this.setState({
      blockType: blockType,
    })
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

  onTab = (event) => {
    event.preventDefault()
    const type = this.state.blockType
    console.log(type)
    if (type === '') {
      this.toggleBlockType('act')
    } else if (type === 'act'){
      this.toggleBlockType('scene')
    } else if (type === 'scene') {
      this.toggleBlockType('action')
    } else if (type === 'action') {
      this.toggleBlockType('character')
    } else if (type === 'character') {
      this.toggleBlockType('parenthetical')
    } else if (type === 'parenthetical') {
      this.toggleBlockType('dialogue')
    } else if (type === 'dialogue') {
      this.toggleBlockType('action')
    }
  }

  getCharacters = () => {
    console.log("getting Characters")
    const charElements = [...document.getElementsByClassName('RichEditor-character')]
    const characters = charElements.map((element) =>{
      return element.firstChild.innerText
    })
    const unique = characters.filter((v, i, a) => a.indexOf(v) === i)
  }

  getOutline = () => {
    console.log("getting Acts")
    const outlineElements = [...document.getElementsByClassName('outliner')]
    outlineElements.forEach((act, index)=> {
      let link = document.createElement('a')
      let name = act.firstChild.firstChild.firstChild.innerText
      link.setAttribute('name', name.concat('-').concat(index))
      act.appendChild(link)
    })
    const outline = outlineElements.map((element) => {
      return element.firstChild.firstChild.firstChild.innerText
    })
    this.setState({
      outline: outline
    })
  }

  filterOutline = () => {
    let inBetween = false;
    const blocks = document.querySelector('.public-DraftEditor-content').firstChild.children
    blocks.forEach(block => {

    })
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

    let displayType = null
    if (this.state.displayTypeVisible) {
      displayType = <div  className="display-type">{this.state.blockType}</div>
    }

    return (
      <div className="editor" id="richEditor" onClick={this.focus}>
        <Grid columns={3}>
          <Grid.Column width={3} id="left-gutter">
            <Outline className="outline" outline={this.state.outline} />
          </Grid.Column>
          <Grid.Column width={10} id="script">
            {selectedBlock
              ? <SideToolbar
                  editorState={editorState}
                  style={{ top: sideToolbarOffsetTop }}
                  onToggle={this.toggleBlockType}
                  onUploadImage={this.handleUploadImage}
                />
              : null
            }
            {this.state.inlineToolbar.show
              ? <InlineToolbar
                  editorState={editorState}
                  onToggle={this.toggleInlineStyle}
                  position={this.state.inlineToolbar.position}
                />
              : null
            }

            <Editor
              blockStyleFn={blockStyler}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={myKeyBindingFn}
              onChange={this.onChange}
              placeholder="At rise..."
              spellCheck={true}
              readOnly={this.state.editingImage}
              ref="editor"
              onTab={this.onTab}
              blockRenderMap={extendedBlockRenderMap}
            />
          </Grid.Column>
          <Grid.Column width={3} id="right-gutter">
            {displayType}
            <div className="display-type">{this.state.blockType}</div>
          </Grid.Column>

        </Grid>
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
