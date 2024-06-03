import React, { useState } from 'react';

function UploadWidget() {
const [title, setTitle] = useState('');
const [file, setFile] = useState(null);

const handleSubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append('article[title]', title);
  formData.append('article[image]', file);

  const response = await fetch('${process.env.REACT_APP_API_SERVER_URL}/articles', {
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
      Image:
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
    </label>
    <button type="submit">Upload</button>
  </form>
);
}

export default UploadWidget;
