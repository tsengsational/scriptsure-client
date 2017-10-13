import React from 'react'
import { Menu, Icon } from 'semantic-ui-react'

const Outline = (props) => {
  const outline = props.outline.map((entry, index) => {
    return <div><a href={'#'.concat(entry).concat('-').concat(index)}>{entry}</a> <input type="checkbox" className="checks" onChange={handleCheck} /><br/></div>
  })


  function handleSelectAll (event) {
    console.log(event.target.checked)
    const blocks = [...document.querySelector('.public-DraftEditor-content').firstChild.children];
    const checks = [...document.querySelectorAll('.checks')]
    if (event.target.checked){
      checks.forEach(check => check.checked = true)
      blocks.forEach(block => block.classList.remove('hide'))
    } else {
      checks.forEach(check => check.checked = false)
      blocks.forEach(block => block.classList.add('hide'))
    }
  }

  function handleCheck (event) {
    const blocks = [...document.querySelector('.public-DraftEditor-content').firstChild.children];
    const sceneName = event.target.parentElement.firstChild.innerText.replace(/\r?\n|\r/g, '');
    let flag = false;
    if(event.target.checked){
      blocks.forEach(block => {
        const blockName = block.innerText.replace(/\r?\n|\r/g, '')
        if(blockName === sceneName){
          flag = !flag;
        } else if (flag && block.classList.value.includes('RichEditor-scene') || block.classList.value.includes('RichEditor-act ')){
          flag = false
        }
        if(flag){
          block.classList.remove('hide')
        } else if (!flag) {
          block.classList.add('hide')
        }
            })
    } else {
      blocks.forEach(block => {
        const blockName = block.innerText.replace(/\r?\n|\r/g, '')
        if(blockName === sceneName){
          flag = !flag;
        } else if (flag  && block.classList.value.includes('RichEditor-scene') || block.classList.value.includes('RichEditor-act ')){
          flag = false
        }
        if (!flag){
          block.classList.remove('hide')
        }
      })
    }

  }

  return (
    <div className='outline'>
      <div>
        <Icon name='save'/> ctl-S
      </div>
      <div>
        <Icon name='exchange'/> tab
      </div>
      <br/>
        Jump to:<br/>
        <span className="small-text">Select all</span> <input type="checkbox" className="select-all" onChange={handleSelectAll} />
        {outline}
      </div>
  )
}

export default Outline
