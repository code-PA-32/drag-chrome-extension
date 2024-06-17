import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import '../index.css'
import { motion } from 'framer-motion'
import {
  Close,
  LaptopWindows,
  Settings,
  NotificationsActive,
  Info,
  DeleteForever,
} from '@mui/icons-material'
import { TabContext, TabPanel, TabList } from '@mui/lab'
import {
  Checkbox,
  TextField,
  ToggleButtonGroup,
  Button,
  Box,
  Tab,
  ToggleButton,
} from '@mui/material'

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

const getOpacity = async () => {
  try {
    const result = await chrome.storage.local.get(['popupOpacity'])
    console.log('Retrieved opacity:', result.popupOpacity)
    return result.popupOpacity || 0.8
  } catch (error) {
    console.error('Error retrieving opacity:', error)
  }
}

const getNotes = async () => {
  try {
    const result = await chrome.storage.local.get(['notes'])
    console.log('Retrieved notes:', result.notes)
    return result.notes || []
  } catch (error) {
    console.error('Error retrieving notes:', error)
  }
}

const Draggable = () => {
  const [value, setValue] = React.useState('1')
  const [position, setPosition] = useState<null | { top: number, left: number }>(null)
  const [size, setSize] = useState<null | { height: string, width: string }>(null)
  const [view, setView] = React.useState<'sm' | 'md' | 'lg'>('sm')
  const ref = useRef(null)
  const [opacity, setOpacity] = useState('0.8')
  const [notes, setNotes] = useState('')
  const [currentNotes, setCurrentNotes] = useState<{
    title: string,
    id: number,
    link?: string
  }[]>([])
  const [checked, setChecked] = useState(false)
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  const handleDragEnd = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      void chrome.storage.local.set({
        popupPosition: {
          top: rect.y.toFixed(0) ?? 100,
          left: rect.x.toFixed(0) ?? 100,
        },
      })
    }
  }

  const setSmallPopup = async () => {
    const newSize = { height: '400px', width: '400px' }
    await chrome.storage.local.set({ popupSize: newSize })
    setSize(newSize)
  }

  const setMediumPopup = async () => {
    const newSize = { height: '600px', width: '500px' }
    await chrome.storage.local.set({ popupSize: newSize })
    setSize(newSize)
  }

  const setLargePopup = async () => {
    const newSize = { height: '100vh', width: '600px' }
    await chrome.storage.local.set({ popupSize: newSize })
    await chrome.storage.local.set({
      popupPosition: {
        top: 0,
        left: position.left,
      },
    })
    setPosition({ top: 0, left: position.left })
    setSize(newSize)
  }
  const handleChangeSize = (_, nextView: 'sm' | 'md' | 'lg') => {
    nextView === 'sm' && setSmallPopup() || nextView === 'md' && setMediumPopup() || nextView === 'lg' && setLargePopup()
    setView(nextView)
  }


  const addOpacity = () => {
    const currentOpacity = parseFloat(opacity)
    if (currentOpacity < 1) {
      const newOpacity = ( currentOpacity + 0.1 ).toFixed(1)
      setOpacity(newOpacity)
      void chrome.storage.local.set({ popupOpacity: newOpacity })
    }
  }
  const removeOpacity = () => {
    const currentOpacity = parseFloat(opacity)
    if (currentOpacity > 0.1) {
      const newOpacity = ( currentOpacity - 0.1 ).toFixed(1)
      setOpacity(newOpacity)
      void chrome.storage.local.set({ popupOpacity: newOpacity })
    }
  }


  const addNotes = () => {
    const newNote = {
      title: notes,
      id: new Date().getTime(),
      link: checked ? window.location.href : undefined,
    }

    setCurrentNotes([...currentNotes, newNote])
    void chrome.storage.local.get('notes', (result) => {
      const currentNotes = result.notes || []
      currentNotes.push(newNote)
      void chrome.storage.local.set({ notes: currentNotes })
    })
    setNotes('')
  }

  const deleteNote = async (noteToDelete: number) => {
    try {
      const result = await chrome.storage.local.get(['notes'])
      const currentNotes = result.notes || []

      const newList = currentNotes.filter((it: { id: number }) => it.id !== noteToDelete)

      await chrome.storage.local.set({ notes: newList })
      setCurrentNotes(newList)
      console.log('Updated notes:', newList)
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }

  useEffect(() => {
    const fetchSettings = async () => {
      const storedPosition = await getPosition()
      const storedSize = await getPopupSize()
      const storedOpacity = await getOpacity()
      const storedNotes = await getNotes()
      setPosition({
        top: parseFloat(storedPosition.top),
        left: parseFloat(storedPosition.left),
      })
      setSize(storedSize)
      setView(storedSize.width === '400px' ? 'sm' : storedSize.width === '500px' ? 'md' : 'lg')
      setOpacity(storedOpacity)
      setCurrentNotes(storedNotes)
    }
    void fetchSettings()
  }, [])

  return (
    <>
      {position && (
        <motion.div
          drag
          dragMomentum={false}
          ref={ref}
          onDragEnd={handleDragEnd}
          style={{
            position: 'relative',
            top: position.top + 'px',
            left: position.left + 'px',
            height: size.height,
            width: size.width,
            zIndex: 214748364,
            overflow: 'scroll',
            borderRadius: '8px',
            background: 'rgb(210, 135, 57)',
          }}
          whileDrag={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
          initial={{ opacity: opacity }}

        >
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab value="1" icon={<Settings fontSize="small"/>} sx={{ padding: 0 }}/>
                  <Tab value="2" icon={<NotificationsActive fontSize="small"/>}/>
                  <Tab value="3" icon={<Info fontSize="small"/>}/>
                </TabList>
              </Box>
              <TabPanel value="1">
                <div>
                  <ToggleButtonGroup
                    orientation="horizontal"
                    value={view}
                    exclusive
                    onChange={handleChangeSize}
                  >
                    <ToggleButton value="sm" aria-label="sm" sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyItems: 'center',
                      gap: '5px',
                    }}>
                      SM
                      <LaptopWindows/>
                    </ToggleButton>
                    <ToggleButton value="md" aria-label="md" sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyItems: 'center',
                      gap: '5px',
                    }}>
                      MD
                      <LaptopWindows/>
                    </ToggleButton>
                    <ToggleButton value="lg" aria-label="lg" sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyItems: 'center',
                      gap: '5px',
                    }}>
                      LG
                      <LaptopWindows/>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <div>
                  Set opacity when is no active window
                  <Box sx={{
                    display: 'flex',
                    gap: '5px',
                    alignItems: 'center',
                    justifyItems: 'center',
                  }}>
                    <Button variant="contained" onClick={removeOpacity}>-</Button>
                    <p>{opacity}</p>
                    <Button onClick={addOpacity} variant="contained">+</Button>
                  </Box>

                </div>
              </TabPanel>
              <TabPanel value="2">
                SOME DATA
              </TabPanel>
              <TabPanel value="3">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                    <div>
                      <TextField className="some" value={notes} sx={{ bg: 'transparent' }}
                                 size="small"
                                 variant="standard" label="Note text"
                                 onChange={e => setNotes(e.target.value)}/>
                      <Button variant="contained" size="small" onClick={addNotes}>Add</Button>
                    </div>
                    <label htmlFor="check" style={{
                      display: 'flex',
                      gap: '5px',
                      justifyItems: 'center',
                      alignItems: 'center',
                      font: '16px',
                      fontWeight: 'normal',
                    }}>
                      <Checkbox value={checked} id="check" onChange={() => setChecked(!checked)}/>
                      Do you want to attach a link?
                    </label>
                  </div>
                  <ul style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    listStyle: 'none',
                  }}>
                    {currentNotes.map((it) => (
                      <li key={it.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        justifyItems: 'center',
                        borderBottom: '1px solid black',
                        paddingBottom: '5px',
                        paddingTop: '5px',
                      }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          {it.title}
                          {it.link && <a href={it.link} target="_blank" style={{
                            textDecoration: 'none',
                            font: '16px',
                            fontWeight: 'normal',
                            color: 'blue',
                          }}>Attached link</a>}
                        </div>
                        <span
                          style={{
                            cursor: 'pointer',
                            height: 'max-content',
                            padding: '2px',
                            background: 'rgba(255,0,0,0.69)',
                            borderRadius: '2px',
                          }}
                          onClick={() => deleteNote(it.id)}
                        ><DeleteForever fontSize="small"/></span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabPanel>
            </TabContext>
          </Box>
          <Button variant="contained" onClick={closePopup}
                  style={{ top: '8px', right: '8px', position: 'absolute' }}>
            <Close/>
          </Button>
          <Button variant="contained" onClick={openNotification}>Notification</Button>
        </motion.div>
      )
      }
    </>
  )
}


ReactDOM.createRoot(appContainer).render(<Draggable/>)
