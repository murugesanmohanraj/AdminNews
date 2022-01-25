import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import '../../../assets/css/allnews.css'
import AllNewsTable from './AllNewsTable'
import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import EditNews from './EditNews'
import CreateNews from './CreateNews'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

function handleClick(event) {
  event.preventDefault()
  console.info('You clicked a breadcrumb.')
}

export default function AllNews() {
  const [direct, setDirect] = useState('')
  const [newsId, setnewsId] = useState(null)
  return (
    <div>
      <div className="top">
        <div>
          <h3>News</h3>
        </div>
        <div>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
              News Manage
            </Link>
            <Typography color="textPrimary">News</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <div className="entire">
        <div className="top1">
          <div>
            {direct === '' ? (
              <h5>Category List</h5>
            ) : direct === 'edit' ? (
              <h5>Edit News</h5>
            ) : direct === 'add' ? (
              <h5>Add News</h5>
            ) : null}
          </div>
          <div>
            {direct === '' ? (
              <Button
                onClick={() => setDirect('add')}
                style={{ backgroundColor: 'green' }}
                variant="contained"
                color="primary"
              >
                <AddIcon />
                Add
              </Button>
            ) : (
              <Button onClick={() => setDirect('')} variant="contained">
                <ArrowBackIcon />
                Back
              </Button>
            )}
          </div>
        </div>
        {direct === '' ? (
          <AllNewsTable
            direct={direct}
            setDirect={setDirect}
            setnewsId={setnewsId}
            newsId={newsId}
          />
        ) : direct === 'add' ? (
          <CreateNews direct={direct} setDirect={setDirect} />
        ) : direct === 'edit' ? (
          <EditNews direct={direct} setDirect={setDirect} setnewsId={setnewsId} newsId={newsId} />
        ) : null}
      </div>
    </div>
  )
}
