import React, { Component } from 'react'
import { Editor, EditorState } from 'draft-js'
import { EditorContainer } from '../styles'

// A plain-text editor that initializes as empty
// Allows linebreaks to create paragraphs without styles
// Spell check enabled

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
          placeholder="Click to start typing..."
          spellCheck
         />
      </EditorContainer>
    )
  }
}