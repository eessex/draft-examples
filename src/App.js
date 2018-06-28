import styled from 'styled-components'
import React, { Component } from 'react'
import { BasicEditor } from './Draft/BasicEditor'
import { BasicWithContent } from './Draft/BasicWithContent'

class App extends Component {
  render() {
    return (
      <div>
        <HeaderContainer>
          <h1>Draft Examples</h1>
        </HeaderContainer>

        <ContentContainer>
          <EditorContainer>
            <h2>Basic Editor</h2>
            <p>Has linebreaks and spellcheck, no styles.</p>
            <p><b>⌘</b> <code>undo, redo, copy, paste, select-all</code></p>
            <BasicEditor />
          </EditorContainer>

          <EditorContainer>
            <h2>Basic Editor with Content</h2>
            <p>Extends basic editor to initialize with existing content, passed as <code>props.content</code>.</p>
            <p><b>⌘</b> <code>undo, redo, copy, paste, select-all</code></p>
            <BasicWithContent
              content="Content editable is so passe."
            />
          </EditorContainer>
        </ContentContainer>
      </div>
    )
  }
}

export default App

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