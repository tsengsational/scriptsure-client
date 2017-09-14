import React from 'react'
import { Menu, Icon } from 'semantic-ui-react'

const Outline = (props) => {
  const outline = props.outline.map((entry, index) => {
    return <div><a href={'#'.concat(entry).concat('-').concat(index)}>{entry}</a><br/></div>
  })


  console.log('inside Outline')
  return (
    <div className='outline'>
      <div>
        <Icon name='save'/> ctl-S
      </div>
      <div>
        <Icon name='exchange'/> tab
      </div>
      <br/>
        Jump to:
        {outline}
      </div>
  )
}

export default Outline
