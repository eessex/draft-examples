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
