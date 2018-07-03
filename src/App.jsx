import styled from 'styled-components'
import React, { Component } from 'react'
import { BasicEditor } from './Draft/Basic/BasicEditor'
import { Paragraph } from './Draft/Paragraph/Paragraph'
import { RichText } from './Draft/RichText/RichText'
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
            <p>Minimum requirements for a functional Draft.js editor. No styles included, line breaks are allowed, spellcheck is visible when focused.</p>
            <p><b>⌘</b> <code>undo, redo, copy, paste, select-all</code></p>
            <BasicEditor />
          </EditorContainer>

          <EditorContainer>
            <h2>Plain Text</h2>
            <p>A suitable replacement for a <code>textarea</code> or <code>input</code>, this editor
            accepts a plain-text string as <code>props.content</code>.
            A new string is returned to the function <code>props.onChange</code> if the content has changed.
            Height adjusts to text length, linebreaks are disallowed.</p>
            <p><b>⌘</b> <code>undo, redo, copy, paste, select-all</code></p>
            <PlainText
              content="Content editable is so passe."
              onChange={(content) => {}}
            />
          </EditorContainer>

          <EditorContainer>
            <h2>Paragraph</h2>
            <p>
              Accepts input as HTML strings, and stores converted editorState as <code>state.html</code>.
              Supports bold, italic, underline, and code rich-text styles nested inside paragraphs.
            </p>
            <p><b>⌘</b> <code>bold, italic, underline, code, undo, redo, copy, paste, select-all</code></p>
            <Paragraph
              html="<p><code>contenteditable</code> is <b><u>so</u></b> <em>passe</em>.</p>"
              onChange={(content) => {}}
            />
          </EditorContainer>

          <EditorContainer>
            <h2>Rich Text</h2>
            <p>HTML Editor with a range of elements including blockquote, H1-H6, UL, OL</p>
            <p><b>⌘</b> <code>H1-H6, blockquote, ul, ol, bold, italic, underline, code, undo, redo, copy, paste, select-all</code></p>
            <RichText
              onChange={(content) => {}}
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