import React from 'react'
import { CompositeDecorator } from 'draft-js'

export const decorators = () => {
  return new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    }
  ])
}

export const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity()
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      )
    },
    callback
  )
}

const Link = props => {
  const { children, contentState, entityKey } = props
  const { url } = contentState.getEntity(entityKey).getData()
  
  return (
    <a href={url}>
      {children}
    </a>
  )
}

export const getSelectionLinkData = editorState => {
  const contentState = editorState.getCurrentContent()
  const selection = editorState.getSelection()
  const startKey = selection.getStartKey()
  const startOffset = selection.getStartOffset()
  const blockWithLink = contentState.getBlockForKey(startKey)
  const linkKey = blockWithLink.getEntityAt(startOffset)

  if (linkKey) {
    const entity = contentState.getEntity(linkKey)
    return entity.getData().url
  }
}
