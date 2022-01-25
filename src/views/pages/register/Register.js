import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import authAxios from 'src/interceptors/interceptor'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const submit = () => {
    handleOpen()
  }
  const dataSubmit = () => {
    const collect = {}
    collect.name = name
    collect.email = email
    collect.password = password
    if (name !== '' && email !== '' && password !== '') {
      authAxios
        .post('registers', collect)
        .then((res) => {
          if (res.data !== 'User already exist') {
            console.log(res.data)
            history.push('/login')
          } else {
            alert('User already exist')
          }
        })
        .catch((err) => {
          console.error(err.message)
        })
    } else {
      alert('Please fill all field')
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      value={name}
                      onChange={(txt) => setName(txt.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(txt) => setEmail(txt.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(txt) => setPassword(txt.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={submit}>
                      Create Account
                    </CButton>
                  </div>
                  <p style={{ paddingTop: '25px' }}>
                    I already have an account ?{' '}
                    <span
                      onClick={() => history.push('/login')}
                      style={{ color: 'rgb(22 81 122)', cursor: 'pointer' }}
                    >
                      Login
                    </span>
                  </p>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Do you want to register this details</h2>
            <div id="transition-modal-description">
              <div style={{ justifyContent: 'space-between', display: 'flex', paddingTop: '25px' }}>
                <div>
                  <Button variant="contained" onClick={handleClose}>
                    Edit Details
                  </Button>
                </div>
                <div>
                  <Button
                    variant="contained"
                    style={{ color: 'white', backgroundColor: 'green' }}
                    onClick={dataSubmit}
                  >
                    Register
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default Register
