import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  convertFromHTML,
  convertToHTML
} from 'draft-convert'
import {
  Editor,
  EditorState,
  RichUtils
} from 'draft-js'
import { EditorContainer } from '../styles'

// Accepts HTML with bold, italic, underline and code styles,
// Converts editorState to HTML on change
export class HtmlEditor extends Component {
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
    const html = this.editorStateToHtml(editorState)
    this.setState({ editorState, html })
  }

  focus = () => {
    this.editor.focus()
  }

  handleKeyCommand = command => {
    const { editorState } = this.state
    const newState = RichUtils.handleKeyCommand(editorState, command)
    // If an updated state is returned, the command is handled
    if (newState) {
      this.onChange(newState)
      return 'handled'
    }
    // Otherwise let the browser handle it
    return 'not-handled'
  }

  render() {
    const { editorState } = this.state

    return (
      <EditorContainer onClick={this.focus}>
        <Editor
          ref={(ref) => { this.editor = ref }}
          editorState={editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          placeholder="Click to start typing..."
          spellCheck
         />
      </EditorContainer>
    )
  }
}
