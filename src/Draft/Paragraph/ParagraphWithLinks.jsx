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
import { decorators, getSelectionLinkData } from '../decorators'
import { EditorContainer } from '../../styles'
import { LinkInput } from '../LinkInput'

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
      html: props.html || '',
      showLinkInput: false
    }
  }

  setEditorState = () => {
    const { html } = this.props

    if (html) {
      return this.editorStateFromHTML(html)
    } else {
      // Initialize editor with link support
      return EditorState.createEmpty(decorators())
    }
  }

  editorStateToHtml = editorState => {
    const currentContent = editorState.getCurrentContent()
    // Tell convertToHTML how to handle links
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
    // Tell convertFromHTML how to handle links
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
    // Create with decorators to support links
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

  checkSelection = () => {
    const { editorState } = this.state
    const selection = editorState.getSelection()

    if (!selection.isCollapsed()) {
      const urlValue = getSelectionLinkData(editorState)
      if (urlValue) {
        this.setState({
          showLinkInput: true,
          urlValue
        })
      } else {
        // show menu
      }
    }
  }

  render() {
    const { editorState, html, showLinkInput, urlValue } = this.state

    return (
      <div>
        {showLinkInput &&
          <LinkInput
            urlValue={urlValue}
            confirmLink={(url) => console.log(url)}
            onClickOff={() => this.setState({showLinkInput: false})}
          />
        }
        <EditorContainer
          onKeyUp={this.checkSelection}
          onMouseUp={this.checkSelection}
        >
          <div onClick={this.focus}>
            <Editor
              blockRenderMap={blockRenderMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              placeholder="Click to start typing..."
              ref={(ref) => { this.editor = ref }}
              spellCheck
            />
          </div>
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
