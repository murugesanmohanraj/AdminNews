import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { Button } from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
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
  table: {
    minWidth: 650,
  },
}))

export default function CategoryTable() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [modals, setmodals] = useState('')
  const [id, setid] = useState(null)
  const [rowid, setrowid] = useState(null)
  const [values, setvalues] = useState([])
  const [name, setname] = useState('')

  const handleOpen = (x) => {
    setid(x)
    setOpen(true)
    setmodals('delete')
  }
  const handleOpen1 = (x, y) => {
    setrowid(x)
    setname(y)
    setOpen(true)
    setmodals('edit')
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleClose2 = () => {
    authAxios.delete(`deleteCategory/${id}`).then((res) => {
      // alert(res.data)
      setOpen(false)
    })
  }

  const handleClose3 = () => {
    authAxios.put(`updateCategory/${rowid}`, { name }).then((res) => {
      alert(res.data)
      setOpen(false)
    })
  }

  useEffect(() => {
    const fetch = async () => {
      await authAxios
        .get('allCategory')
        .then((res) => {
          setvalues(res.data)
        })
        .catch((err) => {
          console.error(err.message)
        })
    }
    fetch()
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {values
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center" style={{ textTransform: 'capitalize' }}>
                  {row.name}
                </TableCell>
                <TableCell align="center">
                  <div className="action">
                    <div>
                      <EditIcon onClick={() => handleOpen1(row.id, row.name)} color="primary" />
                    </div>
                    <div>
                      <DeleteIcon onClick={() => handleOpen(row.id)} color="secondary" />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="modals">
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
            {modals === 'delete' ? (
              <div className={classes.paper}>
                <h2 id="transition-modal-title">Are you sure ?</h2>
                <p id="transition-modal-description">You want be able to revert this!</p>
                <div className="deletess">
                  <div>
                    <Button
                      style={{ backgroundColor: 'red' }}
                      onClick={handleClose2}
                      variant="contained"
                      color="primary"
                    >
                      Yes delete it?
                    </Button>
                  </div>
                  <div>
                    <Button onClick={handleClose} variant="contained" color="primary">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            ) : modals === 'edit' ? (
              <div className={classes.paper}>
                <h2 id="transition-modal-title">Edit Category</h2>
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
                  <Button onClick={handleClose3} variant="contained" color="primary">
                    Save
                  </Button>
                </div>
              </div>
            ) : null}
          </Fade>
        </Modal>
      </div>
    </TableContainer>
  )
}
