import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  ContentState,
  Editor,
  EditorState
} from 'draft-js'
import { InputContainer } from '../../styles'

/*
  A flexible replacement for a text input,
  accepts props.content and returns a plain-text
  string on change. No linebreaks allowed.
*/
export class PlainText extends Component {
  static editor
  static propTypes = {
    content: PropTypes.string,
    onChange: PropTypes.func
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
    const { onChange } = this.props
    const content = editorState.getCurrentContent().getPlainText()

    this.setState({ editorState })
    if (content !== this.props.content) {
      // Return plain-text string if content has changed
      onChange(content)
    }
  }

  focus = () => {
    this.editor.focus()
  }

  render() {
    const { editorState } = this.state

    return (
      <InputContainer onClick={this.focus}>
        <Editor
          editorState={editorState}
          handleReturn={() => 'handled'}
          onChange={this.onChange}
          placeholder="Click to start typing..."
          ref={(ref) => { this.editor = ref }}
          spellCheck
         />
      </InputContainer>
    )
  }
}