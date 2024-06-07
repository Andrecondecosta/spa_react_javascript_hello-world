import React, { useState } from 'react';

function UploadWidget() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !file) {
      setMessage('Please fill out all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('article[title]', title);
    formData.append('article[image]', file);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/articles`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('Upload successful');
        setTitle('');
        setFile(null);
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
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
        Image:
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </label>
      <br />
      <button type="submit">Upload</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default UploadWidget;
