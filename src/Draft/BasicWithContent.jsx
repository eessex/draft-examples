import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  ContentState,
  Editor,
  EditorState
} from 'draft-js'
import { EditorContainer } from '../styles'

// Extends BasicEditor to accept props.content
export class BasicWithContent extends Component {
  static editor
  static propTypes = {
    content: PropTypes.string
  }

  constructor (props) {
    super(props)

    this.state = {
      editorState: this.setEditorState()
    }
  }

  setEditorState = () => {
    const { content } = this.props

    if (content) {
      return this.setStateWithContent()
    } else {
      return EditorState.createEmpty()
    }
  }

  setStateWithContent = () => {
    const { content } = this.props
    const contentState = ContentState.createFromText(content)

    return EditorState.createWithContent(contentState)
  }

  onChange = editorState => {
    this.setState({ editorState })
  }

  focus = () => {
    this.editor.focus()
  }

  render() {
    const { editorState } = this.state

    return (
      <EditorContainer onClick={this.focus}>
        <Editor
          ref={(ref) => { this.editor = ref }}
          editorState={editorState}
          onChange={this.onChange}
          placeholder="Click to start typing..."
          spellCheck
         />
      </EditorContainer>
    )
  }
}