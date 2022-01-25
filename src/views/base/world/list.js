import React, { useEffect, useState } from 'react'
import '../../../assets/css/list.css'
// import axios from 'axios'
import { CButton } from '@coreui/react'
import YouTube from 'react-youtube'
import { cilDelete, cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import authAxios from 'src/interceptors/interceptor'
import baseURL from 'src/interceptors/baseurl'
var getYouTubeID = require('get-youtube-id')

// http://localhost:8080/

const List = () => {
  const [data, setData] = useState([])
  const fetch = () => {
    authAxios
      .post('getAllNation')
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.error(err.message)
      })
  }
  useEffect(() => {
    fetch()
  }, [])
  const remove = (x) => {
    authAxios
      .post(`removeNation/${x}`)
      .then((res) => {
        alert(res.data)
      })
      .catch((err) => {
        console.error(err.message)
      })
  }
  const edit = () => {}
  const opts = {
    height: '120',
    width: '140',
    playerVars: {
      autoplay: false,
    },
  }
  return (
    <div>
      {data.map((itm) => (
        <ul key={itm.id} className="list-unstyled">
          <li>
            <div className="row ss">
              <div className="col-lg-12 cl-md-12 col-xs-12">
                <CButton
                  color="danger"
                  onClick={() => remove(itm.id)}
                  style={{
                    letterSpacing: '1px',
                    float: 'right',
                    color: 'white',
                    marginRight: 5,
                    backgroundColor: '#304e7e',
                    border: 'none',
                  }}
                >
                  <CIcon icon={cilDelete} />
                </CButton>
                <CButton
                  color="danger"
                  onClick={() => edit()}
                  style={{
                    letterSpacing: '1px',
                    float: 'right',
                    color: 'white',
                    marginRight: 5,
                    backgroundColor: '#304e7e',
                    border: 'none',
                  }}
                >
                  <CIcon icon={cilPencil} />
                </CButton>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                <p>Media</p>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-6 col-xs-6">
                    <img src={`${baseURL}${itm.image}`} alt="mh" className="img img-responsive" />
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-6 col-xs-6">
                    <YouTube videoId={getYouTubeID(itm.video)} opts={opts} />
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 one">
                    <p>Headings</p>
                    <span>{itm.heading}</span>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 one">
                    <p>Author</p>
                    <span>{itm.author}</span>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <p>Description</p>
                    <span>{itm.description}</span>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <p>Content</p>
                    <span>{itm.content}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      ))}
    </div>
  )
}

export default List
