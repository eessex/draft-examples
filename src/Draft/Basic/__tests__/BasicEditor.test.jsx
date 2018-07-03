import React from 'react'
import { mount } from 'enzyme'
import { Editor } from 'draft-js'
import { BasicEditor } from '../BasicEditor'

describe('BasicEditor', () => {
  it('Renders the editor', () => {
    const component = mount(<BasicEditor />)
    expect(component.find(Editor)).toHaveLength(1)
  })

  it('Focuses on click', () => {
    const component = mount(<BasicEditor />)
    component.simulate('click')
    const selection = component.state().editorState.getSelection()

    expect(selection.hasFocus).toBe(true)
  })
})
