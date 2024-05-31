import React from 'react';
import { Link } from 'react-router-dom';
import FormPhoto from './formphotos';

function PhotosAdmim() {
  return (
    <div className='photosadmin'>

      <h1 className='title-photos'>Photos</h1>
      <FormPhoto />
      <br />
      <Link to="/ImageListPhoto"><span className='link'> Click for view all photos by admin</span></Link>
    </div>
  )
}

export default PhotosAdmim
