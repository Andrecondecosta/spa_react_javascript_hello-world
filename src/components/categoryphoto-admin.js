import React from 'react'
import { Link } from 'react-router-dom'

function CategoryPhotoAdmin() {
  return (
    <div>
      <h1 className='title-photos'>Category Photo Admin</h1>

    <Link to="/categoryphotoform" > <span className='link'> Associate Images to Category</span></Link>
    </div>
  )
}

export default CategoryPhotoAdmin
