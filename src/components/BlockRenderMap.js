import { Map } from 'immutable'
import { SceneBlock, ActBlock } from './CustomWrapper.js'

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(Map({
  act: {
    element: 'div',
    wrapper: ActBlock
  },
  scene: {
    element: 'div',
    wrapper: SceneBlock
  },
  character: {
    element: 'div'
  },
  dialogue: {
    element: 'div'
  },
  action: {
    element: 'div'
  }
})
)
