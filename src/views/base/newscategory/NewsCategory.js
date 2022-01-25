import React from 'react'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import '../../../assets/css/category.css'
import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CategoryTable from './CategoryTable'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import '../../../assets/css/category.css'
import authAxios from 'src/interceptors/interceptor'

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

function handleClick(event) {
  event.preventDefault()
  console.info('You clicked a breadcrumb.')
}

export default function AllNews() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [name, setname] = React.useState('')

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const submit = async () => {
    await authAxios
      .post('/addCategory', { name })
      .then((res) => {
        alert(res.data)
        setOpen(false)
      })
      .catch((err) => console.error(err.message))
  }
  return (
    <div>
      <div className="top">
        <div>
          <h3>News Category</h3>
        </div>
        <div>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
              News Manage
            </Link>
            <Typography color="textPrimary">News Category</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <div className="entire">
        <div className="top1">
          <div>
            <h5>Category List</h5>
          </div>
          <div>
            <Button
              onClick={handleOpen}
              style={{ backgroundColor: 'green' }}
              variant="contained"
              color="primary"
            >
              <AddIcon />
              Add Category
            </Button>
          </div>
        </div>
        <CategoryTable />
      </div>
      <div>
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
          <Fade style={{ width: '40%' }} in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">New Category</h2>
              <div className="middle">
                <p>Name</p>
                <input
                  type={'text'}
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  placeholder="Enter name"
                />
              </div>
              <div className="deletess">
                <Button variant="contained" onClick={handleClose}>
                  Close
                </Button>
                <Button onClick={submit} variant="contained" color="primary">
                  Save
                </Button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  )
}
