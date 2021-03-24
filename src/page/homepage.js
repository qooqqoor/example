import React from 'react'
import '../css/homepage.css'
import { link } from '../com/tool'

const homepage = ()=>{



  return (
    <div className="homepage">
      <div className="btn" onClick={()=>link('/bluetooth')}>
        bluetooth
      </div>
      <div className="btn" onClick={()=>link('/notification')}>
        notification
      </div>
    </div>
  )

}

export default homepage
