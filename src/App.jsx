import styled from 'styled-components'
import React, { Component } from 'react'
import { BasicEditor } from './Draft/Basic/BasicEditor'
import { BasicWithContent } from './Draft/Basic/BasicWithContent'
import { HtmlEditor } from './Draft/Html/HtmlEditor'
import { HtmlEditorAllBlocks } from './Draft/Html/HtmlEditorAllBlocks'
import { PlainText } from './Draft/PlainText/PlainText'

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
            <h2>Plain Text</h2>
            <p>Replaces <code>textarea</code> or <code>input</code>,
            accepts a plain-text string as <code>props.content</code>.
            Height changes based on content, linebreaks are disallowed.</p>
            <p><b>⌘</b> <code>undo, redo, copy, paste, select-all</code></p>
            <PlainText
              content="Content editable is so passe."
              onChange={(content) => {}}
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
              html="<p><code>contenteditable</code> is <b><u>so</u></b> <em>passe</em>.</p>"
            />
          </EditorContainer>
          <EditorContainer>
            <h2>HTML Editor with All Blocks</h2>
            <p>Extends HTML Editor to allow Blockquote, H1-H6, UL, OL</p>
            <p><b>⌘</b> <code>bold, italic, underline, code, undo, redo, copy, paste, select-all</code></p>
            <HtmlEditorAllBlocks
              html="<p><code>contenteditable</code> is <strong><u>so</u></strong> <em>passe</em>.</p>
              <blockquote>Blockquote</blockquote>
              <h6>Header 6</h6>
              <h5>Header 5</h5>
              <h4>Header 4</h4>
              <h3>Header 3</h3>
              <h2>Header 2</h2>
              <h1>Header 1</h1>
              <ul><li>Unordered List</li></ul>
              <ol><li>Ordered List</li></ol>
              "
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
  padding-bottom: 60px;
  h2 {
    margin-bottom: 0;
  }
`