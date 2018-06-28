import styled from 'styled-components'
import React, { Component } from 'react'
import { BasicEditor } from './Draft/BasicEditor'

class App extends Component {
  render() {
    return (
      <div>
        <HeaderContainer>
          <h1>Draft Examples</h1>
        </HeaderContainer>

        <EditorContainer>
          <h3>Basic Editor</h3>
          <p>Has linebreaks and spellcheck, no styles.</p>
          <BasicEditor />
        </EditorContainer>
      </div>
    )
  }
}

export default App

const HeaderContainer = styled.div`
  background-color: #222;
  padding: 20px;
  color: white;
  text-align: center;
`

const EditorContainer = styled.div`
  padding: 40px;
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
`