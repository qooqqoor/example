import React,{useState} from 'react'
import '../css/notification.css'
import { link } from '../com/tool'
import img from "../static/img/notification/2.jpg"
const Notification = ()=>{

  const [text,setText] = useState("")
  const [onLoad,setonLoad] = useState(false)
  const [title,setTitle] = useState("來測試看看吧！")
  const [second,setSecond] = useState("")
  const [requestPermission,setRequestPermission] = useState(false)

  const sendNotification = ()=>{
    if (!('Notification' in window)) {
      setTitle('你的瀏覽器不支援呦！');
      return
    }
    if (Notification.permission === 'default' || Notification.permission === undefined) {
      window.Notification.requestPermission((permission)=>{
        switch (permission) {
          case "granted":
            setSecond("你已開啟新世界的大門!")
            const notifyConfig = {
              body : text,
              icon : img
            }
            const notification = new window.Notification('我在這兒~', notifyConfig);
            notification.onclick=(e)=>{
              e.preventDefault()
              window.open('https://cythilya.github.io/2017/07/09/notification/')
            }
            setTimeout(()=>{notification.close()},5000)
            break
          case "denied":
            setSecond("你拒絕了我，我好傷心吶 ～")
            return
            break
        }
      })
    }


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
        <h3>{title}</h3>
        <h4>{second}</h4>
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
