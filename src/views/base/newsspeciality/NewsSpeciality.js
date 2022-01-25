import React from 'react'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import '../../../assets/css/speciality.css'
import SpecialityTable from './SpecialityTable'

function handleClick(event) {
  event.preventDefault()
  console.info('You clicked a breadcrumb.')
}

export default function NewsSpeciality() {
  return (
    <div>
      <div className="top">
        <div>
          <h3>News Speciality</h3>
        </div>
        <div>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
              News Manage
            </Link>
            <Typography color="textPrimary">News Speciality</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <div className="entire">
        <div className="top1">
          <div>
            <h5>Speciality List</h5>
          </div>
          <div></div>
        </div>
        <SpecialityTable />
      </div>
    </div>
  )
}
