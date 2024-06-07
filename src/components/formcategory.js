import React, { useState } from 'react';

function FormCategory() {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validação básica de campo
    if (!name) {
      setMessage('Please provide a category name.');
      return;
    }

    const formData = new FormData();
    formData.append('category[name]', name);
    if (image) {
      formData.append('category[image]', image);
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/categories`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('Upload successful');
        setName('');
        setImage(null);
      } else {
        const errorText = await response.text();
        setMessage(`Upload failed: ${errorText}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span style={{ fontSize: '23px', marginRight: '5px' }}>Name:</span>
      </label>
      <br />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value.toUpperCase())}
      />
      <br />
      <label>
        Image:
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </label>
      <br />
      <button type="submit">Upload</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default FormCategory;
