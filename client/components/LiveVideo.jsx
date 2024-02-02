import axios from 'axios'
import React, { useEffect, useState } from 'react'

const LiveVideo = ({videoUrl,open,modalOpen,refresh}) => {

  const [textOverlays,setTextOverlays] = useState([])
  const [imageOverlays,setImageOverlays] = useState([])

  useEffect(()=>{
    const getOverlays = async ()=>{
      const text = await axios.get('http://192.168.29.84:5000/text')
      setTextOverlays(text.data)
      const image = await axios.get('http://192.168.29.84:5000/image')
      setImageOverlays(image.data)
    }
    getOverlays()
  },[open,modalOpen,refresh])

  return (
    <div className='relative '>
        {textOverlays.map((text)=>(
          <div key={text.name} className='absolute z-10 text-white' style={{bottom:`${text.position_y}%`,left:`${text.position_x}%`,width:`${text.width}%`,height:`${text.height}%`}}>
              {text.value}
          </div>
        ))}
        {imageOverlays.map((image)=>(
          <div key={image.name} className='absolute z-10 text-white ' style={{bottom:`${image.position_y}%`,left:`${image.position_x}%`,width:`${image.width}%`,height:`${image.height}%`}}>
              <img src={image.value} alt={image.name}/>
          </div>
        ))}
        <iframe className='z-0 md:w-[640px] md:h-[480px] rounded-3xl p-1 bg-white'  src={videoUrl}  allowFullScreen >
        </iframe>
      </div>
  )
}

export default LiveVideo