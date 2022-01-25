import React, { useEffect, useState } from 'react'
import '../../../assets/css/allnews.css'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Button } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import PropTypes from 'prop-types'
import authAxios from 'src/interceptors/interceptor'
import { withStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import Grid from '@material-ui/core/Grid'
import { useForm } from 'react-hook-form'
import { Controller } from 'react-hook-form'

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch)

export default function EditNews({ setDirect, newsId }) {
  const [category, setCategory] = useState([])
  const [editor, seteditor] = useState([])
  const [speciality, setspeciality] = useState([])
  const [state, setState] = useState(null)
  const [state1, setState1] = useState(null)

  const { register, control, handleSubmit } = useForm()

  const [title, settitle] = useState(null)
  const [summary, setsummary] = useState(null)
  const [description, setdescription] = useState(null)
  const [video, setvideo] = useState(null)
  const [image, setimage] = useState()
  // const [category1, setcategory1] = useState(null)
  // const [speciality1, setspeciality1] = useState(null)
  // const [editor1, seteditor1] = useState(null)

  useEffect(() => {
    const fetch1 = async () => {
      await authAxios
        .get(`getAllNewsById/${newsId}`)
        .then((res) => {
          settitle(res.data.title)
          setsummary(res.data.summary)
          setdescription(res.data.description)
          setvideo(res.data.video)
          // setimage(res.data.image)
          setState1(res.data.publish)
          setState(res.data.breaking)
          // setcategory1(res.data.category1)
          // setspeciality1(res.data.speciality1)
          // seteditor1(res.data.editor1)
        })
        .catch((err) => {
          console.error(err.message)
        })
    }
    fetch1()
  }, [newsId])

  useEffect(() => {
    const fetch = async () => {
      await authAxios
        .get('allCategory')
        .then((res) => {
          setCategory(res.data)
        })
        .catch((err) => {
          console.error(err.message)
        })

      await authAxios
        .get('getAllEditor')
        .then((res) => {
          seteditor(res.data)
        })
        .catch((err) => {
          console.error(err.message)
        })

      await authAxios
        .get('allSpeciality')
        .then((res) => {
          setspeciality(res.data)
        })
        .catch((err) => {
          console.error(err.message)
        })
    }
    fetch()
  }, [])

  const handleChange = (event) => {
    setState(!state)
  }

  const handleChange1 = (event) => {
    setState1(!state1)
  }

  const onFileChange = (event) => {
    setimage(event.target.files[0])
  }

  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('summary', summary)
    formData.append('description', description)
    formData.append('category', data.category)
    formData.append('speciality', data.speciality)
    formData.append('reporter', data.reporter)
    formData.append('image', image)
    formData.append('video', video)
    formData.append('publish', state1)
    formData.append('breaking', state)

    authAxios
      .put(`updateAllNews/${newsId}`, formData)
      .then((res) => {
        alert(res.data)
        setDirect('')
      })
      .catch((err) => {
        console.error(err.message)
      })
  }

  return (
    <div className="create">
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="label">Title</label>
            <br />
            <input
              placeholder="Enter title"
              className="inputs"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Summary</label>
            <br />
            <textarea
              rows="4"
              className="inputsText"
              value={summary}
              onChange={(e) => setsummary(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label className="label">Description</label>
            <br />
            <textarea
              rows="4"
              className="inputsText"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label className="label">News Category</label>
            <br />
            <Controller
              control={control}
              name="category"
              defaultValue="false"
              inputRef={register()}
              render={({ field: { onChange } }) => (
                <Autocomplete
                  id="custom-input-demo"
                  options={category.map((itm) => itm.name)}
                  onChange={(event, newValue) => onChange(newValue)}
                  renderInput={(params) => (
                    <div
                      ref={params.InputProps.ref}
                      style={{
                        width: '100%',
                        borderRadius: '4px',
                        border: '1px solid darkgray',
                      }}
                    >
                      <input
                        placeholder="Select"
                        {...params.inputProps}
                        className="autoCompletes"
                      />
                      <KeyboardArrowDownIcon />
                    </div>
                  )}
                />
              )}
            />
          </div>
          <div>
            <label className="label">News Speciality</label>
            <br />
            <Controller
              control={control}
              name="speciality"
              defaultValue="false"
              inputRef={register()}
              render={({ field: { onChange } }) => (
                <Autocomplete
                  id="custom-input-demo"
                  options={speciality.map((itm) => itm.name)}
                  onChange={(event, newValue) => onChange(newValue)}
                  renderInput={(params) => (
                    <div
                      ref={params.InputProps.ref}
                      style={{
                        width: '100%',
                        borderRadius: '4px',
                        border: '1px solid darkgray',
                      }}
                    >
                      <input
                        placeholder="Select"
                        {...params.inputProps}
                        className="autoCompletes"
                      />
                      <KeyboardArrowDownIcon />
                    </div>
                  )}
                />
              )}
            />
          </div>
          <div>
            <label className="label">News Reporter</label>
            <br />
            <Controller
              control={control}
              name="reporter"
              defaultValue="false"
              inputRef={register()}
              render={({ field: { onChange } }) => (
                <Autocomplete
                  id="custom-input-demo"
                  options={editor.map((itm) => itm.username)}
                  onChange={(event, newValue) => onChange(newValue)}
                  renderInput={(params) => (
                    <div
                      ref={params.InputProps.ref}
                      style={{
                        width: '100%',
                        borderRadius: '4px',
                        border: '1px solid darkgray',
                      }}
                    >
                      <input
                        placeholder="Select"
                        {...params.inputProps}
                        className="autoCompletes"
                      />
                      <KeyboardArrowDownIcon />
                    </div>
                  )}
                />
              )}
            />
          </div>
          <div>
            <label className="label">Video Link</label>
            <br />
            <input
              placeholder="Paste here"
              className="inputs"
              value={video}
              onChange={(e) => setvideo(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Images</label>
            <br />
            <input type="file" onChange={onFileChange} />
          </div>
          <div className="switch">
            <div>
              <label className="label2">Publish/Unpublish</label>
            </div>
            <div style={{ marginTop: '23px' }}>
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>
                  <AntSwitch name="publish" checked={state1} onChange={handleChange1} />
                </Grid>
              </Grid>
            </div>
          </div>
          <div className="switch">
            <div>
              <label className="label2">Breaking News</label>
            </div>
            <div style={{ marginTop: '23px' }}>
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>
                  <AntSwitch name="breaking" checked={state} onChange={handleChange} />
                </Grid>
              </Grid>
            </div>
          </div>
          <div>
            <Button
              style={{ marginTop: '25px', backgroundColor: 'green', color: 'white' }}
              variant="contained"
              type="submit"
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

EditNews.propTypes = {
  setDirect: PropTypes.node.isRequired,
  newsId: PropTypes.node.isRequired,
}
