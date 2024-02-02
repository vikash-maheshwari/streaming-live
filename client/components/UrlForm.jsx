import React from 'react'
import { useState } from 'react'
import LiveVideo from './LiveVideo'

const UrlForm = ({open,refresh,modalOpen}) => {
  const [videoUrl, setVideoUrl] = useState('https://rtsp.me/embed/k9SQ9rFN/')
  const [input, setInput] = useState('')

  const handleClick = () => {
    setVideoUrl(input)
    setInput('')

  }
  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex justify-center'>
        <LiveVideo videoUrl={videoUrl} open={open} modalOpen={modalOpen} refresh={refresh}/>
      </div>
      <div className='lg:flex'>
        <div className='max-w-xs space-y-3'>
          <label className='flex flex-col text-white gap-y-2' htmlFor="videoUrl">
            Change Url
            <div className='space-x-2 space-y-2'>
              <input type="text" id='videoUrl' placeholder='url' value={input} className='input input-bordered text-black border-black border-2 bg-white' onChange={(e) => setInput(e.target.value)} />
              <button className='btn btn-primary' onClick={handleClick}>Change</button>
            </div>
          </label>
          <button onClick={() => setVideoUrl('https://rtsp.me/embed/k9SQ9rFN/')} className='btn btn-secondary w-full'>
            Reset to default
          </button>
        </div>
        <div className='italic text-md ml-3 mt-7'>try: https://rtsp.me/embed/EDfdG27D/</div>
      </div>
    </div>
  )
}

export default UrlForm