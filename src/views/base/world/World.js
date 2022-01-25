import { CButton } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import Add from './add'
import List from './list'

const World = () => {
  const [select, setSelect] = useState(false)
  const [button, setButton] = useState('Add News')
  const submit = () => {
    setSelect(!select)
  }
  useEffect(() => {
    if (select) {
      setButton('View All Contents')
    } else {
      setButton('Add News')
    }
  }, [select])
  return (
    <div>
      <CButton
        color="primary"
        onClick={submit}
        style={{ letterSpacing: '1px', backgroundColor: '#304e7e', border: 'none' }}
      >
        {button}
      </CButton>
      {select ? <Add /> : <List />}
    </div>
  )
}

export default World
