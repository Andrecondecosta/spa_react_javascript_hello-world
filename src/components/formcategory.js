import React, { useState } from 'react';

function FormCategory() {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('category[name]', name);
    if (image) {
      formData.append('category[image]', image);
    }

    const response = await fetch('http://127.0.0.1:3000/api/v1/categories', {
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
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value.toUpperCase())} />
      </label>
      <button type="submit">Upload</button>
    </form>
  );
}

export default FormCategory;
