import React from 'react';
import { Link } from 'react-router-dom';

const LinkButton = ({ to, label }) => (
  <Link to={to} className="link-button">
    <span>{label}</span>
  </Link>
);

function CategoryPhotoAdmin() {
  return (
    <div className="category-photo-admin">
      <h1 className='title-photos'>Category Photo Admin</h1>
      <LinkButton to="/categoryphotoform" label="Associate Images to Category" />
    </div>
  );
}

export default CategoryPhotoAdmin;
