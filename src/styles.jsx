import styled from 'styled-components'

const colors = {
  gray: '#ccc'
}

export const EditorContainer = styled.div`
  border: 1px solid ${colors.gray};
  min-height: 5em;
  padding: 10px;
  position: relative;

  .public-DraftEditorPlaceholder-root {
    color: ${colors.gray};
    position: absolute;
  }

  .public-DraftStyleDefault-block {
    margin-bottom: 1em;
  }
`

export const InputContainer = EditorContainer.extend`
  border-color: #fff;
  border-bottom: 1px solid ${colors.gray};
  min-height: inherit;
  padding: 1em 0 0 0;

  .public-DraftStyleDefault-block {
    margin-bottom: 5px;
  }
`
