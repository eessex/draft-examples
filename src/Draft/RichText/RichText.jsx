import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  convertFromHTML,
  convertToHTML
} from 'draft-convert'
import {
  getDefaultKeyBinding,
  Editor,
  EditorState,
  KeyBindingUtil,
  RichUtils
} from 'draft-js'
import { EditorContainer } from '../../styles'

const allowedStyles = [
  'bold',
  'code',
  'italic',
  'underline'
]

const allowedBlocks = [
  'blockquote',
  'header-one',
  'header-two',
  'header-three',
  'header-four',
  'header-five',
  'header-six',
  'ordered-list-item',
  'unordered-list-item'
]

/*
  Accepts HTML with bold, italic, underline and code styles
  as well as H1-H6, UL, OL, and blockquote elements.
  Converts editorState to HTML on change.
*/
export class RichText extends Component {
  static editor
  static propTypes = {
    html: PropTypes.string
  }

  constructor (props) {
    super(props)

    this.state = {
      editorState: this.setEditorState(),
      html: props.html || ''
    }
  }

  setEditorState = () => {
    const { html } = this.props

    if (html) {
      return this.editorStateFromHTML(html)
    } else {
      return EditorState.createEmpty()
    }
  }

  editorStateToHtml = editorState => {
    const currentContent = editorState.getCurrentContent()
    return convertToHTML({})(currentContent)
  }

  editorStateFromHTML = html => {
    const contentBlocks = convertFromHTML({})(html)
    return EditorState.createWithContent(contentBlocks)
  }

  onChange = editorState => {
    const { onChange } = this.props
    const html = this.editorStateToHtml(editorState)

    this.setState({ editorState, html })
    if (html !== this.state.html) {
      onChange(html)
    }
  }

  focus = () => {
    this.editor.focus()
  }

  handleKeyCommand = command => {
    const { editorState } = this.state
    let newState

    if (allowedStyles.includes(command)) {
      newState = RichUtils.toggleInlineStyle(editorState, command.toUpperCase())
    } else if (allowedBlocks.includes(command)) {
      newState = RichUtils.toggleBlockType(editorState, command)
    }

    // If an updated state is returned, the command is handled
    if (newState) {
      this.onChange(newState)
      return 'handled'
    }
    // Otherwise let the browser handle it
    return 'not-handled'
  }

  render() {
    const { editorState, html } = this.state

    return (
      <div>
        <EditorContainer onClick={this.focus}>
          <Editor
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={keyBindingFn}
            onChange={this.onChange}
            placeholder="Click to start typing..."
            ref={(ref) => { this.editor = ref }}
            spellCheck
          />
        </EditorContainer>
        <div>
          <p><code>state.html</code>:</p>
          <p>{html}</p>
        </div>
      </div>
    )
  }
}

const keyBindingFn = e => {
  // Set key commands available in your editor
  // Can also override browser command defaults
  if (KeyBindingUtil.hasCommandModifier(e)) {
    switch (e.keyCode) {
      case 49:
      // command + 1
        return 'header-one'
      case 50:
        // command + 2
        return 'header-two'
      case 51:
        // command + 3
        return 'header-three'
      case 52:
        // command + 4
        return 'header-four'
      case 53:
        // command + 5
        return 'header-five'
      case 54:
        // command + 6
        return 'header-six'
      case 55:
        // command + 7
        return 'ordered-list-item'
      case 56:
        // command + 8
        return 'unordered-list-item'
      case 219:
        // command + [
        return 'blockquote'
      default:
        // Allows existing commands to return default,
        // you can stop them by returning 'not handled'
        return getDefaultKeyBinding(e)
    }
  }
  // still return default if no modifier
  // so users can type content
  return getDefaultKeyBinding(e)
}
