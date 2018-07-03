import React from 'react'
import { mount } from 'enzyme'
import { Editor } from 'draft-js'
import { BasicWithContent } from '../BasicWithContent'

describe('BasicWithContent', () => {
  const content = "Man running from cops stops to pet cats."

  const getWrapper = () => {
    return mount(
      <BasicWithContent content={content} />
    )
  }

  it('Renders the editor', () => {
    const component = getWrapper()
    expect(component.find(Editor)).toHaveLength(1)
  })

  it('Initializes with content', () => {
    const component = getWrapper()
    const currentContent = component.state().editorState.getCurrentContent()

    expect(currentContent.getPlainText()).toBe(content)
  })

  it('Focuses on click', () => {
    const component = getWrapper()
    component.simulate('click')
    const selection = component.state().editorState.getSelection()

    expect(selection.hasFocus).toBe(true)
  })
})
