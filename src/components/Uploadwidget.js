import React, { useState } from 'react';

const UploadWidget = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('No file selected');
      return;
    }
    setUploading(true);
    setMessage('');
    setProgress(0);

    const formData = new FormData();
    formData.append('article[image]', file);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/articles`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setMessage('Upload successful');
        setFile(null);
      } else {
        setMessage('Upload failed');
      }
    } catch (error) {
      setMessage(`Upload error: ${error.message}`);
    } finally {
      setUploading(false);
      setProgress(100); // Assuming the upload is done at this point~
      window.location.reload();
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
      <button type="submit" disabled={uploading}>Upload</button>
      {uploading && <p>Uploading {progress.toFixed(0)}%...</p>}
      {message && <p>{message}</p>}
    </form>
  );
};

export default UploadWidget;
