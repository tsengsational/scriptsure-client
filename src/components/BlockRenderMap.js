import { Map } from 'immutable'
import { DefaultDraftBlockRenderMap } from 'draft-js'
import React from 'react'

class parenthesisWrapper extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className="parenthetical">
        {this.props.children}
      </div>
    )
  }
}

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(Map({
  act: {
    element: 'div',
  },
  scene: {
    element: 'div',
  },
  character: {
    element: 'div'
  },
  dialogue: {
    element: 'div'
  },
  action: {
    element: 'div'
  },
  parenthetical: {
    element: 'span',
    wrapper: parenthesisWrapper
  }
})
)

export default extendedBlockRenderMap
