import styled from 'styled-components'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

export class LinkInput extends Component {
  static propTypes = {
    confirmLink: PropTypes.func,
    onClickOff: PropTypes.func,
    removeLink: PropTypes.func,
    position: PropTypes.object,
    urlValue: PropTypes.string
  }

  state = {
    url: this.props.urlValue || ''
  }

  onChange = e => {
    this.setState({ url: e.target.value })
  }

  onKeyDown = e => {
    const { confirmLink, onClickOff } = this.props
    const { key, target: { value } } = e

    if (key === 'Enter') {
      confirmLink(value)
    } else if (key === 'Escape') {
      onClickOff()
    }
  }

  render() {
    const { confirmLink, position, onClickOff } = this.props
    const { url } = this.state

    return (
      <div>
        <OverlayBackground onClick={onClickOff} />
        <LinkInputContainer position={position}>
          <Arrow />
          <input
            defaultValue={url || ''}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            placeholder='Paste or type a link'
            autoFocus
          />
          <button onMouseDown={() => confirmLink(url)}>
            Save
          </button>
        </LinkInputContainer>
      </div>
    )
  }
}

const OverlayBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
`

const LinkInputContainer = styled.div`
  padding: 8px;
  position: absolute;
  z-index: 10;
  background: #eee;
  width: 200px;
  display: flex;
  top: calc(${({position}) => position.top}px + 10px);
  left: calc(${({position}) => position.left}px - 100px);

  input {
    flex: 1;
    padding: 5px 3px;
    &:focus{
      outline: none;
    }
  }
`

const Arrow = styled.div`
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #eee;
  position: absolute;
  top: -10px;
  left: calc(50% - 15px);
`
