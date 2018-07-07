import styled from 'styled-components'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

export class LinkInput extends Component {
  static propTypes = {
    confirmLink: PropTypes.func,
    onClickOff: PropTypes.func,
    removeLink: PropTypes.func,
    selectionTarget: PropTypes.object,
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
    const { confirmLink } = this.props
    const { url } = this.state

    return (
      <LinkInputContainer>
        <Arrow />
        <input
          defaultValue={url || ''}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          placeholder='Paste or type a link'
          autoFocus
        />
        <button onMouseDown={() => confirmLink(url)}>
          Apply
        </button>
      </LinkInputContainer>
    )
  }
}

const LinkInputContainer = styled.div`
  padding: 8px;
  position: absolute;
  z-index: 10;
  background: #eee;
`

const Arrow = styled.div`
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #eee;
  position: absolute;
  top: -10px;
  left: calc(50% - 15px);
`
