import React,{useState} from 'react'
import UrlForm from '../components/UrlForm'
import OverlayList from '../components/OverlayList'
import Navbar from '../components/Navbar'
import {Toaster} from 'react-hot-toast'

function App() {
  const [open, setOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [refresh, setRefresh] = useState(0)
  

  return (
    <div>
      <Toaster/>
      <Navbar/>
      <main className='lg:flex justify-between'>
        <UrlForm open={open} refresh={refresh} modalOpen={modalOpen}/>
        <div className='w-full flex justify-center'>
          <OverlayList open={open} setOpen={setOpen} modalOpen={modalOpen} setModalOpen={setModalOpen} refresh={refresh} setRefresh={setRefresh}/>
        </div>
      </main>
    </div>
  )
}

export default App
