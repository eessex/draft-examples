import React from 'react'
import { mount } from 'enzyme'
import { Editor, EditorState } from 'draft-js'
import { EditorContainer } from '../../../styles'
import { moveSelectionToEnd } from '../../helpers'
import { RichText } from '../RichText'

describe('RichText', () => {
  const html = '<p>Man running stops to pet cats.</p><h1>Sleep in the bathroom sink.</h1>'

  const getWrapper = props => {
    return mount(
      <RichText {...props} />
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

    expect(component.state().html).toMatch(
      '<h1>Sleep in the bathroom sink.</h1>'
    )
    expect(currentContent.getPlainText()).toMatch(
      'Man running stops to pet cats.'
    )
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
      '<p>some text! Man running stops to pet cats.</p><h1>Sleep in the bathroom sink.</h1>'
    ) 
    expect(props.onChange).toBeCalledWith(
      '<p>some text! Man running stops to pet cats.</p><h1>Sleep in the bathroom sink.</h1>'
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

    describe('Blocks', () => {
      describe('H1', () => {
        const h1 = '<h1>Man running stops to pet cats.</h1>'

        it('Can toggle on', () => {
          props.html = paragraph
          const component = getWrapper(props)
          component.find('.public-DraftEditor-content').at(0).simulate('keyDown', {
            keyCode: 49,
            metaKey: false,
            ctrlKey: true,
            altKey: false,
          })

          expect(component.state().html).toBe(h1)
          expect(props.onChange).toBeCalledWith(h1)
        })

        it('Can toggle off', () => {
          props.html = h1
          const component = getWrapper(props)
          component.find('.public-DraftEditor-content').at(0).simulate('keyDown', {
            keyCode: 49,
            metaKey: false,
            ctrlKey: true,
            altKey: false,
          })

          expect(component.state().html).toBe(paragraph)
          expect(props.onChange).toBeCalledWith(paragraph)
        })
      })

      describe('H2', () => {
        const h2 = '<h2>Man running stops to pet cats.</h2>'

        it('Can toggle on', () => {
          props.html = paragraph
          const component = getWrapper(props)
          component.find('.public-DraftEditor-content').at(0).simulate('keyDown', {
            keyCode: 50,
            metaKey: false,
            ctrlKey: true,
            altKey: false,
          })

          expect(component.state().html).toBe(h2)
          expect(props.onChange).toBeCalledWith(h2)
        })

        it('Can toggle off', () => {
          props.html = h2
          const component = getWrapper(props)
          component.find('.public-DraftEditor-content').at(0).simulate('keyDown', {
            keyCode: 50,
            metaKey: false,
            ctrlKey: true,
            altKey: false,
          })

          expect(component.state().html).toBe(paragraph)
          expect(props.onChange).toBeCalledWith(paragraph)
        })
      })

      describe('H3', () => {
        const h3 = '<h3>Man running stops to pet cats.</h3>'

        it('Can toggle on', () => {
          props.html = paragraph
          const component = getWrapper(props)
          component.find('.public-DraftEditor-content').at(0).simulate('keyDown', {
            keyCode: 51,
            metaKey: false,
            ctrlKey: true,
            altKey: false,
          })

          expect(component.state().html).toBe(h3)
          expect(props.onChange).toBeCalledWith(h3)
        })

        it('Can toggle off', () => {
          props.html = h3
          const component = getWrapper(props)
          component.find('.public-DraftEditor-content').at(0).simulate('keyDown', {
            keyCode: 51,
            metaKey: false,
            ctrlKey: true,
            altKey: false,
          })

          expect(component.state().html).toBe(paragraph)
          expect(props.onChange).toBeCalledWith(paragraph)
        })
      })

      describe('H4', () => {
        const h4 = '<h4>Man running stops to pet cats.</h4>'

        it('Can toggle on', () => {
          props.html = paragraph
          const component = getWrapper(props)
          component.find('.public-DraftEditor-content').at(0).simulate('keyDown', {
            keyCode: 52,
            metaKey: false,
            ctrlKey: true,
            altKey: false,
          })

          expect(component.state().html).toBe(h4)
          expect(props.onChange).toBeCalledWith(h4)
        })

        it('Can toggle off', () => {
          props.html = h4
          const component = getWrapper(props)
          component.find('.public-DraftEditor-content').at(0).simulate('keyDown', {
            keyCode: 52,
            metaKey: false,
            ctrlKey: true,
            altKey: false,
          })

          expect(component.state().html).toBe(paragraph)
          expect(props.onChange).toBeCalledWith(paragraph)
        })
      })

      describe('H5', () => {
        const h5 = '<h5>Man running stops to pet cats.</h5>'

        it('Can toggle on', () => {
          props.html = paragraph
          const component = getWrapper(props)
          component.find('.public-DraftEditor-content').at(0).simulate('keyDown', {
            keyCode: 53,
            metaKey: false,
            ctrlKey: true,
            altKey: false,
          })

          expect(component.state().html).toBe(h5)
          expect(props.onChange).toBeCalledWith(h5)
        })

        it('Can toggle off', () => {
          props.html = h5
          const component = getWrapper(props)
          component.find('.public-DraftEditor-content').at(0).simulate('keyDown', {
            keyCode: 53,
            metaKey: false,
            ctrlKey: true,
            altKey: false,
          })

          expect(component.state().html).toBe(paragraph)
          expect(props.onChange).toBeCalledWith(paragraph)
        })
      })

      describe('H6', () => {
        const h6 = '<h6>Man running stops to pet cats.</h6>'

        it('Can toggle on', () => {
          props.html = paragraph
          const component = getWrapper(props)
          component.find('.public-DraftEditor-content').at(0).simulate('keyDown', {
            keyCode: 54,
            metaKey: false,
            ctrlKey: true,
            altKey: false,
          })

          expect(component.state().html).toBe(h6)
          expect(props.onChange).toBeCalledWith(h6)
        })

        it('Can toggle off', () => {
          props.html = h6
          const component = getWrapper(props)
          component.find('.public-DraftEditor-content').at(0).simulate('keyDown', {
            keyCode: 54,
            metaKey: false,
            ctrlKey: true,
            altKey: false,
          })

          expect(component.state().html).toBe(paragraph)
          expect(props.onChange).toBeCalledWith(paragraph)
        })
      })

      describe('OL', () => {
        const ol = '<ol><li>Man running stops to pet cats.</li></ol>'

        it('Can toggle on', () => {
          props.html = paragraph
          const component = getWrapper(props)
          component.find('.public-DraftEditor-content').at(0).simulate('keyDown', {
            keyCode: 55,
            metaKey: false,
            ctrlKey: true,
            altKey: false,
          })

          expect(component.state().html).toBe(ol)
          expect(props.onChange).toBeCalledWith(ol)
        })

        it('Can toggle off', () => {
          props.html = ol
          const component = getWrapper(props)
          component.find('.public-DraftEditor-content').at(0).simulate('keyDown', {
            keyCode: 55,
            metaKey: false,
            ctrlKey: true,
            altKey: false,
          })

          expect(component.state().html).toBe(paragraph)
          expect(props.onChange).toBeCalledWith(paragraph)
        })
      })

      describe('UL', () => {
        const ul = '<ul><li>Man running stops to pet cats.</li></ul>'

        it('Can toggle on', () => {
          props.html = paragraph
          const component = getWrapper(props)
          component.find('.public-DraftEditor-content').at(0).simulate('keyDown', {
            keyCode: 56,
            metaKey: false,
            ctrlKey: true,
            altKey: false,
          })

          expect(component.state().html).toBe(ul)
          expect(props.onChange).toBeCalledWith(ul)
        })

        it('Can toggle off', () => {
          props.html = ul
          const component = getWrapper(props)
          component.find('.public-DraftEditor-content').at(0).simulate('keyDown', {
            keyCode: 56,
            metaKey: false,
            ctrlKey: true,
            altKey: false,
          })

          expect(component.state().html).toBe(paragraph)
          expect(props.onChange).toBeCalledWith(paragraph)
        })
      })

      describe('Blockquote', () => {
        const blockquote = '<blockquote>Man running stops to pet cats.</blockquote>'

        it('Can toggle on', () => {
          props.html = paragraph
          const component = getWrapper(props)
          component.find('.public-DraftEditor-content').at(0).simulate('keyDown', {
            keyCode: 219,
            metaKey: false,
            ctrlKey: true,
            altKey: false,
          })

          expect(component.state().html).toBe(blockquote)
          expect(props.onChange).toBeCalledWith(blockquote)
        })

        it('Can toggle off', () => {
          props.html = blockquote
          const component = getWrapper(props)
          component.find('.public-DraftEditor-content').at(0).simulate('keyDown', {
            keyCode: 219,
            metaKey: false,
            ctrlKey: true,
            altKey: false,
          })

          expect(component.state().html).toBe(paragraph)
          expect(props.onChange).toBeCalledWith(paragraph)
        })
      })
    })
  })
})
