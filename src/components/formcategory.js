import React, { useState } from 'react';

function FormCategory() {
  const [name, setName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validação básica de campo
    if (!name) {
      return;
    }

    const formData = new FormData();
    formData.append('category[name]', name);


    try {
      const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/categories`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {

        setName('');
      }else {

      }
    } catch (error) {

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
      <button type="submit">Upload</button>

    </form>
  );
}

export default FormCategory;
