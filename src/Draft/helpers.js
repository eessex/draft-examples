// https://github.com/draft-js-plugins/draft-js-plugins/blob/master/draft-js-plugins-editor/src/Editor/moveSelectionToEnd.js

import {
  EditorState,
  SelectionState,
} from 'draft-js'

export const moveSelectionToEnd = editorState => {
  const content = editorState.getCurrentContent()
  const blockMap = content.getBlockMap()

  const key = blockMap.last().getKey()
  const length = blockMap.last().getLength()

  const selection = new SelectionState({
    anchorKey: key,
    anchorOffset: length,
    focusKey: key,
    focusOffset: length,
  })

  return EditorState.acceptSelection(editorState, selection)
}
