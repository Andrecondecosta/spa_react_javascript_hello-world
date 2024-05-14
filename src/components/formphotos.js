import React, { useState } from 'react';

function FormPhoto() {
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('photo[title]', title);
    images.forEach((image, index) => {
      formData.append(`photo[images][${index}]`, image);
    });

    const response = await fetch('http://127.0.0.1:3000/api/v1/photos', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      console.log('Upload successful');
    } else {
      console.log('Upload failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Images:
        <input type="file" multiple onChange={(e) => setImages([...e.target.files])} />
      </label>
      <button type="submit">Upload</button>
    </form>
  );
}

export default FormPhoto;
