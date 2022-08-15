import React from 'react'
import Trustheader from './Trustheader'
import Feed from './Feed'
import "./css/trustise.css"

function Trustise() {
  return (
    <div className='trustise'>
       <Trustheader/>
       {/* <div className='trust_contents'> */}
          <div className='trust_content'>
            <Feed />
          </div>
       </div>
    // </div>
  )
}

export default Trustise