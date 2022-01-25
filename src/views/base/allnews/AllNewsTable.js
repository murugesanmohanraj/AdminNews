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
import { withStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import authAxios from 'src/interceptors/interceptor'
import baseURL from 'src/interceptors/baseurl'
import ReactPaginate from 'react-paginate'
import FastForwardIcon from '@material-ui/icons/FastForward'
import FastRewindIcon from '@material-ui/icons/FastRewind'

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

export default function AllNewsTable({ setDirect, setnewsId }) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [data, setData] = useState([])
  const [deleteId, setdeleteId] = useState(null)
  const [pageNumber, setPageNumber] = useState(0)

  const userPerPage = 5
  const pagesVisited = pageNumber * userPerPage

  const pageCount = Math.ceil(data.length / userPerPage)

  const handleOpen = (x) => {
    setdeleteId(x)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange1 = async (x, y) => {
    await authAxios
      .put(`updateAllNewsPublish/${x}`, { publish: !y })
      .then((res) => {})
      .catch((err) => console.error(err.message))
  }

  const handleChange = async (x, y) => {
    await authAxios
      .put(`updateAllNewsBreaking/${x}`, { breaking: !y })
      .then((res) => {})
      .catch((err) => console.error(err.message))
  }

  useEffect(() => {
    authAxios
      .get('getAllNews')
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => console.error(err.message))
  }, [data])

  const deleted = () => {
    authAxios
      .delete(`deleteAllNews/${deleteId}`)
      .then((res) => {
        setOpen(false)
      })
      .catch((err) => console.error(err.message))
  }

  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Summary</TableCell>
            <TableCell align="center">Publish Status</TableCell>
            <TableCell align="center">Breaking News</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .sort((a, b) => b.id - a.id)
            .slice(pagesVisited, pagesVisited + userPerPage)
            .map((row, index) => (
              <TableRow key={row.name}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">
                  <img src={`${baseURL}${row.image}`} alt="mn" style={{ width: '100%' }} />
                </TableCell>
                <TableCell align="center">
                  <p
                    style={{
                      height: '100px',
                      overflow: 'hidden',
                      justifyContent: 'center',
                      display: 'contents',
                    }}
                  >
                    {row.title}
                  </p>
                </TableCell>
                <TableCell align="center">
                  <p
                    style={{
                      height: '100px',
                      overflow: 'hidden',
                      justifyContent: 'center',
                      display: 'contents',
                    }}
                  >
                    {row.summary}
                  </p>
                </TableCell>
                <TableCell align="center">
                  <Typography component="div">
                    <Grid component="label" container alignItems="center" spacing={1}>
                      <Grid style={{ margin: 'auto' }} item>
                        <AntSwitch
                          checked={row.publish}
                          onClick={() => handleChange1(row.id, row.publish)}
                          name="checkedC"
                        />
                      </Grid>
                    </Grid>
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography component="div">
                    <Grid component="label" container alignItems="center" spacing={1}>
                      <Grid style={{ margin: 'auto' }} item>
                        <AntSwitch
                          checked={row.breaking}
                          onClick={() => handleChange(row.id, row.breaking)}
                          name="checkedC"
                        />
                      </Grid>
                    </Grid>
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <div className="action">
                    <div>
                      <EditIcon
                        onClick={() => {
                          setnewsId(row.id)
                          setDirect('edit')
                        }}
                        color="primary"
                      />
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
      <div className="number">
        <ReactPaginate
          previousLabel={<FastRewindIcon style={{ color: '#2f3c54d4' }} />}
          nextLabel={<FastForwardIcon style={{ color: '#2f3c54d4' }} />}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={'paginationBttns'}
          previousLinkClassName={'previousBttn'}
          nextLinkClassName={'nextBttn'}
          disabledClassName={'paginationDisabled'}
          activeClassName={'paginationActive'}
        />
      </div>
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
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Are you sure ?</h2>
              <p id="transition-modal-description">You want be able to revert this!</p>
              <div className="deletess">
                <div>
                  <Button
                    style={{ backgroundColor: 'red' }}
                    variant="contained"
                    color="primary"
                    onClick={deleted}
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
          </Fade>
        </Modal>
      </div>
    </TableContainer>
  )
}

AllNewsTable.propTypes = {
  setDirect: PropTypes.node.isRequired,
  setnewsId: PropTypes.node.isRequired,
}
