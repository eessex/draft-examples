import Immutable from 'immutable'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  convertFromHTML,
  convertToHTML
} from 'draft-convert'
import {
  Editor,
  EditorState,
  RichUtils
} from 'draft-js'
import { decorators } from '../decorators'
import { EditorContainer } from '../../styles'

// Extends Paragraph editor to use links
export class ParagraphWithLinks extends Component {
  static editor
  static propTypes = {
    html: PropTypes.string,
    onChange: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.state = {
      editorState: this.setEditorState(),
      html: props.html || ''
    }
  }

  setEditorState = () => {
    const { html } = this.props

    if (html) {
      return this.editorStateFromHTML(html, decorators())
    } else {
      return EditorState.createEmpty(decorators())
    }
  }

  editorStateToHtml = editorState => {
    const currentContent = editorState.getCurrentContent()
    return convertToHTML({
      entityToHTML: (entity, originalText) => {
        if (entity.type === 'LINK') {
          const innerText = originalText
            return <a href={entity.data.url}>{innerText}</a>
        }
        return originalText
      },
    })(currentContent)
  }

  editorStateFromHTML = html => {
    const contentBlocks = convertFromHTML({
      htmlToEntity: (nodeName, node, createEntity) => {
        let data
        if (nodeName === 'a') {
          data = { url: node.href }
          return createEntity(
            'LINK',
            'MUTABLE',
            data
          )
        }
      }
    })(html)
    return EditorState.createWithContent(contentBlocks, decorators())
  }

  onChange = editorState => {
    const { onChange } = this.props
    const html = this.editorStateToHtml(editorState)

    this.setState({ editorState, html })
    if (html !== this.props.html) {
      // Return html if changed
      onChange(html)
    }
  }

  focus = () => {
    this.editor.focus()
  }

  handleKeyCommand = command => {
    const { editorState } = this.state
    const newState = RichUtils.handleKeyCommand(editorState, command)
    // If an updated state is returned, the command is handled

    if (newState) {
      this.onChange(newState)
      return 'handled'
    }
    // Otherwise let the browser handle it
    return 'not-handled'
  }

  render() {
    const { editorState, html } = this.state

    return (
      <div>
      <EditorContainer onClick={this.focus}>
        <Editor
          blockRenderMap={blockRenderMap}
          editorState={editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          placeholder="Click to start typing..."
          ref={(ref) => { this.editor = ref }}
          spellCheck
         />
      </EditorContainer>
      <div>
        <p><code>state.html</code>:</p>
        <p>{html}</p>
      </div>
      </div>
    )
  }
}

/*
  blockRenderMap determines which kinds of HTML blocks are
  allowed by the editor. Below, blocks are limited to the
  default 'unstyled', which @editorStateToHtml converts to <p>.

  Blocks are limited below to prevents users from pasting text
  with blocks that the editor's default key commands cannot handle. 

  The element is 'div' because Draft.js nests additional
  <div> tags as children to each block, and <p> tags throw
  a console error if they have <div>'s as children.
*/
const blockRenderMap = Immutable.Map({
  'unstyled': {
    element: 'div'
  }
})
