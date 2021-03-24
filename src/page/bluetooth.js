import React,{ useState } from 'react'
import '../css/bluetooth.css'
import { link } from '../com/tool'



const Bluetooth =  () => {
  const [ status , setStatus ] = useState( '嘿')
  const [ bluetooth , setBluetooth ] = useState()
  const [ text , setText ] = useState()
  const [ characteristic , setCharacteristic] = useState()
  const [ onLoad , setOnLoad ] = useState(false)
  const toggleStatus = async()=>{
    switch  (status) {
      case '嘿' :{
        setStatus('點我一下啦')
        break
      }
      case '點我一下啦' :{
        setStatus('再點我一下，帶你通往新世界')
        break
      }
      case '再點我一下，帶你通往新世界' :{
        try{
          const device = await navigator.bluetooth.requestDevice({
            filters: [
              { services: [0x18F0] }
            ],
          })
          try{
            const server = await device.gatt.connect()
            const service = await server.getPrimaryService(0x18F0)
            const characteristic = await service.getCharacteristic(0x2AF1);
            console.log(server)
            console.log(service)
            console.log(characteristic)
            console.log('%cya','color:green;border: solid 1px green;padding: 1px 10px;border-radius: 15px;')
            server && setStatus('藍芽連接成功!')
            server && setBluetooth(device)
            server && service && setCharacteristic(characteristic)
          }
          catch(error) { console.error(error)};
        }
        catch(error){ console.error(error); };
        break
      }
    }
  }
  const disconnect = async ()=>{
    try{
      await bluetooth.gatt.connect()
      try{
        await bluetooth.gatt.disconnect();
        setBluetooth()
        setStatus('再點我一下，帶你通往新世界')
        alert('斷開一切的牽連！')
      }
      catch (err) {
        setBluetooth()
        setStatus('再點我一下，帶你通往新世界')
        alert('賣甲，你根本沒有連接阿!')
      }
    }catch (err) {
      setBluetooth()
      setStatus('再點我一下，帶你通往新世界')
      alert('賣甲，你根本沒有連接阿!')
    }
  }
  const str2ab = (str) => {
    const buf = new ArrayBuffer(str.length*2); // 每個字符占用2個字節
    let bufView = new Uint8Array(buf);
    for (let i=0;  i<str.length; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return bufView;
  }
  const print = async ()=>{
    try {
      await bluetooth.gatt.connect()
      let text8 = str2ab(text)
      const unit8Arr = Buffer.from(text8, 'base64')
      const len = Math.ceil(unit8Arr.length/48)
      console.log(len)
      for (let i = 0; i < len; i++) {
        const value = unit8Arr.slice(i * 48, (i + 1) * 48)
        console.log(value)
        await characteristic.writeValue(value)
      }
      alert('傳送成功！')


    }catch (err) {
      console.log(err)
      setBluetooth()
      setStatus('再點我一下，帶你通往新世界')
    }
  }

  return (
    <div className="bluetooth">
      {onLoad&&(
        <div className="load">
          <p>Loading</p>
        </div>
      )}
      <div className="backBtn" onClick={()=>link('/')}>
        homepage
      </div>
      <div>
        <h2>{bluetooth ? (` 藍芽設備名稱 =  ${bluetooth.name}`) : ( `啥都沒有 !` )}</h2>

        <div className="action_btn" onClick={()=>toggleStatus()}> {status} </div>
          {bluetooth && (
            <div className="cut_btn"  onClick={()=>{disconnect()}}>斷開鎖練!斷開連結！</div>
            )
          }
      </div>
      {
        bluetooth && (
          <div className='text_box'>
            <h3>來測試看看吧！</h3>
            <textarea type="text" onChange={(e)=>setText(e.target.value)} rows={5} maxLength={100} readOnly={onLoad}/>
            <div className={`print_btn  ${onLoad && 'onLoad'}`} onClick={()=>!onLoad && print()}>傳送~~</div>
          </div>
        )
      }
    </div>
  )

}

export default Bluetooth
