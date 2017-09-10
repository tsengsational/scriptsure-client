import React from 'react';
import ScriptCard from './ScriptCard'
import { Divider } from 'semantic-ui-react'

const ScriptList = (props) => {
  const scripts = props.scripts.map((script)=>{
    return(
            <div>
              <ScriptCard key={script.id} script={script} history={props.history}/>
              <Divider hidden/>
            </div>
         )
  })
  return (
    <div className="scroll">
      <Divider hidden/>
      {scripts}
    </div>

  )
}

export default ScriptList
