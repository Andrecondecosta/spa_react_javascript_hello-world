import React, { useState } from 'react';

const FormPhoto = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setProgress(0);

    let successCount = 0;

    for (let i = 0; i < images.length; i++) {
      const formData = new FormData();
      formData.append('photo[image]', images[i]);

      try {
        const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/photos`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          successCount++;
          console.log(`Upload of image ${i + 1} successful`);
        } else {
          console.log(`Upload of image ${i + 1} failed`);
          const message = await response.text();
          console.log(`Error: ${message}`);
        }
      } catch (error) {
        console.error(`Error uploading image ${i + 1}:`, error);
      } finally {
        setProgress(((i + 1) / images.length) * 100);
      }
    }

    setUploading(false);
    setMessage(`${successCount} out of ${images.length} images uploaded successfully.`);
    setImages([]);
  };

  return (
    <form onSubmit={handleSubmit} className="form-photo">
      <label htmlFor="upload">
        <span style={{ fontSize: '23px', marginRight: '5px' }}>Images:</span>
        <input
          type="file"
          id="upload"
          multiple
          onChange={(e) => setImages([...e.target.files])}
          aria-label="Select images to upload"
        />
      </label>
      <button type="submit" disabled={uploading} aria-label="Upload selected images">
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {uploading && <p>Uploading {progress.toFixed(0)}%...</p>}
      {message && <p>{message}</p>}
    </form>
  );
};

export default FormPhoto;
