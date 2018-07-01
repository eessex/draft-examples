import Immutable from 'immutable'
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

/*
  Accepts HTML with bold, italic, underline and code styles
  Converts editorState to HTML on change
  HTML blocks types are limited to paragraph
*/
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
    const { editorState, html } = this.state

    return (
      <div>
      <EditorContainer onClick={this.focus}>
        <Editor
          blockRenderMap={blockRenderMap}
          editorState={editorState}
          handleKeyCommand={this.handleKeyCommand}
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

/*
  blockRenderMap determines which kinds of HTML blocks are
  allowed by the editor. Below, blocks are limited to the
  default 'unstyled', which @editorStateToHtml converts to <p>.

  Blocks are limited below to prevents users from pasting text
  with blocks that the editor's default key commands cannot handle. 

  The element is 'div' because Draft.js nests additional
  <div> tags as children to each block, and <p> tags throw
  a console error if they have <div>'s as children.
*/
const blockRenderMap = Immutable.Map({
  'unstyled': {
    element: 'div'
  }
})
