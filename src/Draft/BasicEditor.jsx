import React, { Component } from 'react'
import { Editor, EditorState } from 'draft-js'
import { EditorContainer } from './styles'

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
          ref={(ref) => { this.editor = ref }}
          editorState={editorState}
          onChange={this.onChange}
          spellCheck
         />
      </EditorContainer>
    )
  }
}