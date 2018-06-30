import React, { Component } from 'react'
import { Editor, EditorState } from 'draft-js'
import { EditorContainer } from '../styles'

/*
  A plain-text editor that initializes empty
  Allows linebreaks but no styles
  Spellcheck enabled
*/
export class BasicEditor extends Component {
  static editor
  state = {
    editorState: EditorState.createEmpty()
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
          editorState={editorState}
          onChange={this.onChange}
          placeholder="Click to start typing..."
          ref={(ref) => { this.editor = ref }}
          spellCheck
         />
      </EditorContainer>
    )
  }
}