import { Map } from 'immutable'
import { DefaultDraftBlockRenderMap } from 'draft-js'

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
    element: 'div'
  }
})
)

export default extendedBlockRenderMap
