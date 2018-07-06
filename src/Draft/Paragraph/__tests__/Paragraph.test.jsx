import React from 'react'
import { mount } from 'enzyme'
import { Editor, EditorState } from 'draft-js'
import { EditorContainer } from '../../../styles'
import { Paragraph } from '../Paragraph'

describe('Paragraph', () => {
  const html = '<p>Man running stops to pet cats.</p>'

  const getWrapper = props => {
    return mount(
      <Paragraph {...props} />
    )
  }

  const getSelection = editorState => {
    const selection = editorState.getSelection().merge({
      focusOffset: 3,
      hasFocus: true
    })
    return EditorState.acceptSelection(
      editorState,
      selection
    )
  }

  let props
  beforeEach(() => {
    props = {
      html,
      onChange: jest.fn()
    }
  })

  it('Renders the editor', () => {
    const component = getWrapper(props)
    expect(component.find(Editor)).toHaveLength(1)
  })

  it('Initializes with content', () => {
    const component = getWrapper(props)
    const currentContent = component.state().editorState.getCurrentContent()

    expect(currentContent.getPlainText()).toBe('Man running stops to pet cats.')
  })

  it('Focuses on click', () => {
    const component = getWrapper(props)
    component.find(EditorContainer).at(0).simulate('click')
    const selection = component.state().editorState.getSelection()

    expect(selection.hasFocus).toBe(true)
    expect(props.onChange).not.toHaveBeenCalled()
  })

  it('Calls onChange on user input', () => {
    const component = getWrapper(props)
    component.find(EditorContainer).at(0).simulate('click')
    component.find('.public-DraftEditor-content').at(0).simulate(
      'beforeInput',
      {data: "some text! "}
    )

    expect(component.state().html).toBe(
      '<p>some text! Man running stops to pet cats.</p>'
    ) 
    expect(props.onChange).toBeCalledWith(
      '<p>some text! Man running stops to pet cats.</p>'
    )  
  })


  describe('Key commands', () => {
    const paragraph = '<p>Man running stops to pet cats.</p>'

    describe('Styles', () => {
      describe('Bold', () => {
        const boldParagraph = '<p><strong>Man</strong> running stops to pet cats.</p>'

        it('Can toggle on', () => {
          props.html = paragraph
          const component = getWrapper(props)
          const editorState = getSelection(component.state().editorState)
          component.instance().setState({ editorState })
          component.find('.public-DraftEditor-content').at(0).simulate('keyDown', {
            keyCode: 66,
            metaKey: false,
            ctrlKey: true,
            altKey: false,
          })

          expect(props.onChange).toBeCalledWith(boldParagraph)
        })

        it('Can toggle off', () => {
          props.html = boldParagraph
          const component = getWrapper(props)
          const editorState = getSelection(component.state().editorState)
          component.instance().setState({ editorState })
          component.find('.public-DraftEditor-content').at(0).simulate('keyDown', {
            keyCode: 66,
            metaKey: false,
            ctrlKey: true,
            altKey: false,
          })

          expect(props.onChange).toBeCalledWith(paragraph)
        })
      })

      describe('Code', () => {
        const codeParagraph = '<p><code>Man</code> running stops to pet cats.</p>'

        it('Can toggle on', () => {
          props.html = paragraph
          const component = getWrapper(props)
          const editorState = getSelection(component.state().editorState)
          component.instance().setState({ editorState })
          component.find('.public-DraftEditor-content').at(0).simulate('keyDown', {
            keyCode: 74,
            metaKey: false,
            ctrlKey: true,
            altKey: false,
          })

          expect(props.onChange).toBeCalledWith(codeParagraph)
        })

        it('Can toggle off', () => {
          props.html = codeParagraph
          const component = getWrapper(props)
          const editorState = getSelection(component.state().editorState)
          component.instance().setState({ editorState })
          component.find('.public-DraftEditor-content').at(0).simulate('keyDown', {
            keyCode: 74,
            metaKey: false,
            ctrlKey: true,
            altKey: false,
          })

          expect(props.onChange).toBeCalledWith(paragraph)
        })
      })

      describe('Italic', () => {
        const italicParagraph = '<p><em>Man</em> running stops to pet cats.</p>'

        it('Can toggle on', () => {
          props.html = paragraph
          const component = getWrapper(props)
          const editorState = getSelection(component.state().editorState)
          component.instance().setState({ editorState })
          component.find('.public-DraftEditor-content').at(0).simulate('keyDown', {
            keyCode: 73,
            metaKey: false,
            ctrlKey: true,
            altKey: false,
          })

          expect(props.onChange).toBeCalledWith(italicParagraph)
        })

        it('Can toggle off', () => {
          props.html = italicParagraph
          const component = getWrapper(props)
          const editorState = getSelection(component.state().editorState)
          component.instance().setState({ editorState })
          component.find('.public-DraftEditor-content').at(0).simulate('keyDown', {
            keyCode: 73,
            metaKey: false,
            ctrlKey: true,
            altKey: false,
          })

          expect(props.onChange).toBeCalledWith(paragraph)
        })
      })
    })
  })
})
