import React,{useState,useEffect} from 'react'
import '../css/notification.css'
import { link } from '../com/tool'

const Notification = ()=>{

  const [text,setText] = useState("")
  const [onLoad,setonLoad] = useState(false)

  const sendNotification = ()=>{
    console.log(text)

  }



  return (
    <div className="notification">
      {onLoad&&(
        <div className="load">
          <p>Loading</p>
        </div>
      )}
      <div className="backBtn" onClick={()=>link('/')}>
        homepage
      </div>

      <div className='text_box'>
        <h3>來測試看看吧！</h3>
        <textarea type="text"
                  onChange={(e)=>setText(e.target.value)}
                  rows={5}
                  maxLength={100}
                  readOnly={onLoad}
        />
        <div
          className={`print_btn  ${onLoad && 'onLoad'}`}
          onClick={()=>!onLoad && sendNotification()}
        >
          傳送~~
        </div>
      </div>



    </div>
  )

}

export default Notification
