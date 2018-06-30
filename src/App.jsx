import styled from 'styled-components'
import React, { Component } from 'react'
import { BasicEditor } from './Draft/BasicEditor'
import { BasicWithContent } from './Draft/BasicWithContent'
import { HtmlEditor } from './Draft/HtmlEditor'

export class App extends Component {
  render() {
    return (
      <AppContainer>
        <HeaderContainer>
          <h1>Draft Examples</h1>
        </HeaderContainer>

        <ContentContainer>
          <EditorContainer>
            <h2>Basic Editor</h2>
            <p>Has line-breaks and spellcheck, no styles.</p>
            <p><b>⌘</b> <code>undo, redo, copy, paste, select-all</code></p>
            <BasicEditor />
          </EditorContainer>

          <EditorContainer>
            <h2>Basic Editor with Content</h2>
            <p>Extends Basic Editor to accept plain text strings as <code>props.content</code>.</p>
            <p><b>⌘</b> <code>undo, redo, copy, paste, select-all</code></p>
            <BasicWithContent
              content="Content editable is so passe."
            />
          </EditorContainer>

          <EditorContainer>
            <h2>HTML Editor</h2>
            <p>
              Accepts input as HTML strings, stores converted editorState as <code>state.html</code>.
              Supports bold, italic, underline, and code rich-text styles.
            </p>
            <p><b>⌘</b> <code>bold, italic, underline, code, undo, redo, copy, paste, select-all</code></p>
            <HtmlEditor
              content="<p><code>contenteditable</code> is <b><u>so</u></b> <em>passe</em>.</p>"
            />
          </EditorContainer>
        </ContentContainer>
      </AppContainer>
    )
  }
}

const AppContainer = styled.div`
  font-family: sans-serif;
`

const HeaderContainer = styled.div`
  padding: 20px;
  h1 {
    margin: 0;
    border-bottom: 2px solid;
    display: initial;
  }
`
const ContentContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`

const EditorContainer = styled.div`
  padding-bottom: 40px;
  h2 {
    margin-bottom: 0;
  }
`