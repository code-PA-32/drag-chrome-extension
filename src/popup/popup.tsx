import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import '../index.css'
import { motion } from 'framer-motion'
import { SquareX } from 'lucide-react'

const appContainer = document.getElementById('my-app-div')

const closePopup = () => {
  const appContainer = document.getElementById('my-app-div')
  if (appContainer) {
    appContainer.remove()
  }
}
const openNotification = () => {
  void chrome.runtime.sendMessage({ action: 'showNotification' })
}

const getPopupSize = async () => {
  try {
    const result = await chrome.storage.local.get(['popupSize'])
    console.log('Retrieved position:', result.popupSize)
    return result.popupSize || { height: 400, width: 400 }
  } catch (error) {
    console.error('Error retrieving position:', error)
  }
}
const getPosition = async () => {
  try {
    const result = await chrome.storage.local.get(['popupPosition'])
    console.log('Retrieved position:', result.popupPosition)
    return result.popupPosition || { top: 100, left: 200 }
  } catch (error) {
    console.error('Error retrieving position:', error)
  }
}

const Draggable = () => {
  const [position, setPosition] = useState({ top: 100, left: 200 })
  const [size, setSize] = useState({ height: 400, width: 400 })
  const ref = useRef(null)
  const handleDragEnd = (event: any, info: any) => {
    console.log('Drag End:', event)
    console.log('Drag Info:', info)

    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      void chrome.storage.local.set({
        popupPosition: {
          top: rect.y.toFixed(0),
          left: rect.x.toFixed(0),
        },
      })
      console.log('Element position:', rect)
    }
  }


  const setSmallPopup = async () => {
    const newSize = { height: 400, width: 400 };
    await chrome.storage.local.set({ popupSize: newSize });
    setSize(newSize);
  };

  const setMediumPopup = async () => {
    const newSize = { height: 600, width: 500 };
    await chrome.storage.local.set({ popupSize: newSize });
    setSize(newSize);
  };

  const setLargePopup = async () => {
    const newSize = { height: 800, width: 600 };
    await chrome.storage.local.set({ popupSize: newSize });
    setSize(newSize);
  };


  useEffect(() => {
    const fetchSettings = async () => {
      const storedPosition = await getPosition();
      const storedSize = await getPopupSize();
      setPosition({
        top: parseFloat(storedPosition.top),
        left: parseFloat(storedPosition.left),
      });
      setSize(storedSize);
    };
    void fetchSettings();
  }, []);

  return (
    <motion.div
      drag
      dragMomentum={false}
      ref={ref}
      onDragEnd={handleDragEnd}
      style={{
        position: 'fixed',
        top: position.top + 'px',
        left: position.left + 'px',
        height: size.height + 'px',
        width: size.width + 'px',
        zIndex: 500,
      }}
      whileDrag={{ opacity: 0.8 }}
      whileHover={{ opacity: 1 }}
      initial={{ opacity: 0.8 }}
      className="!bg-orange-400 !p-4 !rounded-lg !shadow-lg !z-50 !relative !overflow-scroll"
    >
      <div>
        Drag me around!
      </div>
      <div>
        <h1>Popup</h1>
        <div className="flex gap-2">
          <button onClick={setSmallPopup}>SM</button>
          <button onClick={setMediumPopup}>MD</button>
          <button onClick={setLargePopup}>LG</button>
        </div>

      </div>
      <button onClick={closePopup}
              style={{ top: '8px', right: '8px', position: 'absolute' }}
              className="!absolute !top-2 !right-2 !size-6 !rounded-none !border-none !bg-transparent !p-0">
        <SquareX className="!text-white"/></button>
      <button onClick={openNotification}>notification</button>
    </motion.div>
  )
}


ReactDOM.createRoot(appContainer).render(<Draggable/>)
