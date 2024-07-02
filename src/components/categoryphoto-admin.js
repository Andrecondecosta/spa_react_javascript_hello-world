import React from 'react';
import { Link } from 'react-router-dom';


function CategoryPhotoAdmin() {
  return (
    <div className="category-photo-admin">
      <h1 className='title-photos'>Category Photo Admin</h1>
      <Link to="/categoryphotoform">
        <span className='link'>Click here to Associate Images to Category</span>
      </Link>
      <br />
      <Link to="/photosbycategory">
        <span className='link'>Click here for edit portfolio</span>
      </Link>
    </div>
  );
}

export default CategoryPhotoAdmin;
