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

// Import and export HTML with bold and italic styles
export class HtmlEditor extends Component {
  static editor
  static propTypes = {
    content: PropTypes.string
  }

  constructor (props) {
    super(props)

    this.state = {
      editorState: this.setEditorState(),
      html: props.content || ''
    }
  }

  setEditorState = () => {
    const { content } = this.props

    if (content) {
      return this.editorStateFromHTML(content)
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

    if (newState) {
      this.onChange(newState)
      return 'handled'
    }
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
