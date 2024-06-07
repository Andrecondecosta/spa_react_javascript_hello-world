import React from 'react';
import { Link } from 'react-router-dom';
import FormPhoto from './formphotos';

function PhotosAdmin() {
  return (
    <div className='photos-admin'>
      <h1 className='title-photos'>Photos</h1>
      <FormPhoto />
      <br />
      <Link to="/ImageListPhoto">
        <span className='link'>Click here to view all photos by admin</span>
      </Link>
    </div>
  );
}

export default PhotosAdmin;
