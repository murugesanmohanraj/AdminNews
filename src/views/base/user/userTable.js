import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
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

export default function UserTable() {
  const classes = useStyles()
  const [values, setvalues] = useState([])

  useEffect(() => {
    const fetch = async () => {
      await authAxios
        .get('allUsers')
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
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Plan</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {values.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center" style={{ textTransform: 'capitalize' }}>
                {row.name}
              </TableCell>
              <TableCell align="center" style={{ textTransform: 'capitalize' }}>
                {row.email}
              </TableCell>
              <TableCell align="center" style={{ textTransform: 'capitalize' }}>
                {row.phoneNumber}
              </TableCell>
              <TableCell align="center" style={{ textTransform: 'capitalize' }}>
                {row.plan}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
