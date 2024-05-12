import React, { useState } from 'react';

function FormPhoto() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('photo[title]', title);
    formData.append('photo[image]', image);

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
        Image:
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </label>
      <button type="submit">Upload</button>
    </form>
  );
}

export default FormPhoto;
