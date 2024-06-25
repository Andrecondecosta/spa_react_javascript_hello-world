import React, { useState } from 'react';

function UploadWidget() {
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      // Handle the case where the file is not provided. This could be an internal state update, logging, or user notification.
      return;
    }

    const formData = new FormData();
    formData.append('article[image]', file);

    try {
      await fetch(`${process.env.REACT_APP_API_SERVER_URL}/articles`, {
        method: 'POST',
        body: formData,
      });
      setFile(null);
    } catch (error) {

    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
    </form>
  );
}

export default UploadWidget;
