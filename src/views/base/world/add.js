import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormTextarea,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
// import axios from 'axios'
import '../../../assets/css/editor.css'
import authAxios from 'src/interceptors/interceptor'

// http://localhost:4000/

const Add = () => {
  const [image, setImage] = useState('')
  const [heading, setHeading] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [video, setVideo] = useState('')
  const [content, setContent] = useState()

  const submit = () => {
    const formData = new FormData()
    formData.append('image', image)
    formData.append('heading', heading)
    formData.append('author', author)
    formData.append('description', description)
    formData.append('video', video)
    formData.append('content', content)

    authAxios
      .post('addNation', formData)
      .then((res) => {
        alert(res.data)
        setImage('')
        setHeading('')
        setAuthor('')
        setDescription('')
        setVideo('')
        setContent('')
      })
      .catch((err) => {
        console.error(err.message)
      })
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center top">
      <CRow className="justify-content-center">
        <CCol>
          <CCard className="mx-6">
            <CCardBody className="p-4">
              <CForm autoComplete="off">
                <h1>About Nation</h1>
                <p className="text-medium-emphasis">Create your own content</p>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput
                    type="file"
                    placeholder="Upload image..."
                    onChange={(e) => setImage(e.target.files[0])}
                    name="image"
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput
                    type="text"
                    placeholder="Heading"
                    onChange={(e) => setHeading(e.target.value)}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput
                    type="text"
                    placeholder="Author Name"
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                  <CFormTextarea
                    rows="3"
                    placeholder="Descripition"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                  <CFormTextarea
                    rows="3"
                    placeholder="Youtube Link"
                    onChange={(e) => setVideo(e.target.value)}
                  />
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                  <CFormTextarea
                    rows="3"
                    placeholder="Content"
                    onChange={(e) => setContent(e.target.value)}
                  />
                </CInputGroup>
                <div className="d-grid">
                  <CButton color="primary" onClick={submit}>
                    Upload
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default Add
