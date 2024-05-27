import React, { useState } from 'react';

const FormPhoto = () => {
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let i = 0; i < images.length; i++) {
      const formData = new FormData();
      formData.append('photo[image]', images[i]);

      const response = await fetch('http://127.0.0.1:3000/api/v1/photos', {
        method: 'POST',
        body: formData,
      });

      // Log the headers
      for (let pair of response.headers.entries()) {
        console.log(pair[0]+ ': '+ pair[1]);
      }

      if (response.ok) {
        console.log(`Upload of image ${i + 1} successful`);
      } else {
        console.log(`Upload of image ${i + 1} failed`);
        const message = await response.text();
        console.log(`Error: ${message}`);
      }
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <label >
        <span style={{fontSize: "23px", marginRight: "5px"}}>Images:</span>
        <input type="file" multiple onChange={(e) => setImages([...e.target.files])} />
      </label>
      <button type="submit">Upload</button>
    </form>
  );
};

export default FormPhoto;
