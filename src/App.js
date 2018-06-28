import styled from 'styled-components'
import React, { Component } from 'react'
import { BasicEditor } from './Draft/BasicEditor'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Draft Examples</h1>
        </header>
        <EditorContainer>
          <BasicEditor />
        </EditorContainer>
      </div>
    )
  }
}

export default App

const EditorContainer = styled.div`
  padding: 40px;
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
`